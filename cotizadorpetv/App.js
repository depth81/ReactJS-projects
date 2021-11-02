import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';
import colors from './src/utils/colors';
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";
import ResultCalculate from "./src/components/ResultCalculate";
/* import { showMessage, hideMessage } from "react-native-flash-message";
import FlashMessage from "react-native-flash-message"; */

const App = () => {
  
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(()=>{
    /* if(capital && interest && months){
      calculate();
    }else{
      reset();
    } */
    if(capital && interest && months) calculate();
    else reset();
  },[capital,interest,months])

  const calculate = () => {
    reset();
    /* hideMessage(); */
    if(!capital){
      setErrorMessage('Ingresa la cantidad solicitada');
      /* showMessage({
        message: "Ingresa la cantidad solicitada",
        type: "info",
      }); */
    }else if(!interest){
      setErrorMessage('Ingresa el interes');
      /* showMessage({
        message: "Ingresa el interes",
        type: "info",
      }); */
    }else if(!months){
      setErrorMessage('Ingresa el plazo');
      /* showMessage({
        message: "Ingresa el plazo",
        type: "info",
      }); */
    }else{
      const int = interest/100;
      const fee = capital/((1-Math.pow(int+1,-months))/int);
      setTotal({
        monthlyFee:fee.toFixed(2).replace('.',','),
        totalPayable:(fee*months).toFixed(2).replace('.',','),
      });
      /* reset(); */
    };
  };

  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  }

  return(
    <>
    <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.background} />
        <Text style={styles.titleApp}>Cotizador de prestamos</Text>    
        <Form 
          setCapital={setCapital}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>

      
      <Footer calculate={calculate}/>
      <ResultCalculate 
        capital={capital}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage} 
      />
      {/* <FlashMessage position="top" /> */}
    </>
  )
};

const styles = StyleSheet.create({
  safeArea:{
    height: 290,
    alignItems:'center',
  },
  background:{
    backgroundColor:colors.PRIMARY_COLOR,
    height:200,
    width:'100%',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    position:'absolute',
    zIndex:-1,
  },
  titleApp:{
    fontSize:25,
    fontWeight:"bold",
    color:"#FFF",
    marginTop:15,
  }
});

export default App;