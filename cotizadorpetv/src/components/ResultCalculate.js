import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ResultCalculate(props) {
    
    const {capital, prestamista, interest, months, total, errorMessage} = props;
    console.log(errorMessage);

    return (
        <View style={styles.mycontent}>
            {total && (
                <View style={styles.boxResult}>
                    <Text style={styles.title}>RESUMEN</Text>
                    <DataResult title='Cantidad solicitada' myvalue={`${capital} $`} />
                    <DataResult title='Nombre del prestamista' myvalue={`${prestamista}`} />
                    <DataResult title='Interes (%):' myvalue={`${interest} %`} />
                    <DataResult title='Plazos (meses):' myvalue={`${months} meses`} />
                    <DataResult title='Pago mensual ($)' myvalue={`${total.monthlyFee} $`} />
                    <DataResult title='Total a pagar ($):' myvalue={`${total.totalPayable} $`} />
                </View>
            )}
            <View>
                <Text>{errorMessage}</Text>
            </View>
        </View>        
    )
}

function DataResult(props){
    const {title, myvalue} = props;

    return(
        <View style={styles.myvalue}>
            <Text>{title}</Text>
            <Text>{myvalue}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mycontent:{
        marginHorizontal:40,
    },
    boxResult:{
        padding:30,
    },
    title:{
        fontSize:30,
        textAlign:'center',
        fontWeight:'bold',
        marginBottom:30,
    },
    myvalue:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:20,
    },
    myerror:{
        textAlign:'center',
        color:'#f000',
        fontWeight:'bold',
        fontSize:26,
    },
});
