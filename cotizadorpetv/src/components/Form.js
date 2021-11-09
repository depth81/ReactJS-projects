import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import colors from "../utils/colors";


export default function Form(props){
    
    const {setCapital, setInterest, setMonths, setPrestamista} = props;

    return(
        <View style={styles.viewForm}> 
            <View style={styles.viewInputs}>
            <TextInput 
                placeholder="Cantidad"
                keyboardType="numeric"
                style={styles.input}
                onChange={e=>setCapital(e.nativeEvent.text)}
            />
            <TextInput 
                placeholder="Prestamista"
                keyboardType="default"
                style={styles.input}
                onChange={e=>setPrestamista(e.nativeEvent.text)}
            />
            
            </View>
            <View  style={styles.viewSelectors}>
            <RNPickerSelect 
                /* placeholder="Interes %" 
                keyboardType="numeric"
                style={[styles.input, styles.inputPercentage]}
                onChange={e=>setInterest(e.nativeEvent.text)} */
                style={pickerSelectStyles}
                onValueChange={(value) => setInterest(value)}
                placeholder={{
                    label:'Selecciona el interés'
                }}
                items={[
                    { label: '0.5%', value: 0.5 },
                    { label: '1%', value: 1 },
                    { label: '1.5%', value: 1.5 },
                    { label: '2%', value: 2 },
                    { label: '2.5%', value: 2.5 },
                    { label: '3%', value: 3 },
                    { label: '3.5%', value: 3.5 },
                    { label: '4.0%', value: 4 },
                    { label: '4.5%', value: 4.5 },
                    { label: '5%', value: 5 },
                ]}
            />
            <RNPickerSelect
                style={pickerSelectStyles}
                onValueChange={(value) => setMonths(value)}
                placeholder={{
                    label:'Selecciona el plazo'
                }}
                items={[
                    { label: '3 meses', value: 3 },
                    { label: '6 meses', value: 6 },
                    { label: '9 meses', value: 9 },
                    { label: '12 meses', value: 12 },
                    { label: '24 meses', value: 24 },
                ]}
            />
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    viewForm:{
        position:'absolute',
        bottom:0,
        width:'95%',
        paddingHorizontal:50,
        backgroundColor: colors.PRIMARY_COLOR_DARK,
        borderRadius:30,
        height:200,
        justifyContent:'center',
    },
    viewInputs:{
        flexDirection:'row',
        width:350,
    },
    viewSelectors:{
        flexDirection:'column',
    },
    input:{
        height:50,
        backgroundColor:'#FFF',
        borderWidth:1,
        borderColor:colors.PRIMARY_COLOR,
        borderRadius:5,
        width:'40%',
        marginRight:5,
        marginLeft:-5,
        marginBottom:10,
        color:'#000',
        paddingHorizontal:20,
    },
    inputPercentage:{
        width:'50%',
        marginLeft:5,
    }
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS:{
        fontSize:16,
        paddingVertical:12,
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:'black',
        paddingRight:30,
        backgroundColor:'#FFF',
        marginLeft:-5,
        marginRight:-5,
    },
    inputAndroid:{
        fontSize:16,
        paddingHorizontal:10,
        paddingVertical:8,
        borderWidth:0.5,
        borderColor:'grey',
        borderRadius:8,
        color:'black',
        paddingRight:150,
        backgroundColor:'#FFF',
        width:'100%',
        margin:1
    },
})