import React, {useState, useEffect} from "react";
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';
import colors from './src/utils/colors';
import Form from "./src/components/Form";
import Footer from "./src/components/Footer";
import ResultCalculate from "./src/components/ResultCalculate";
/* import firebase from './src/utils/firebase';
import 'firebase/auth'; */
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const App = () => {
  
  const [capital, setCapital] = useState(null);
  const [interest, setInterest] = useState(null);
  const [prestamista, setPrestamista] = useState('');
  const [months, setMonths] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(undefined);

  useEffect(()=>{
    
    if(capital && prestamista && interest && months) calculate();
    else reset();
    
    firebase.auth.onStateChange((res)=>{
      console.log("usuario: " + res);
      setUser(res);
    })

  },[capital,prestamista,interest,months])

  const calculate = () => {
    reset();
    if(!capital){
      setErrorMessage('Ingresa la cantidad solicitada');
    }else if(!prestamista){
      setErrorMessage('Ingresa el nombre del prestamista');
    }else if(!interest){
      setErrorMessage('Ingresa el interes');
    }else if(!months){
      setErrorMessage('Ingresa el plazo');
    }else{
      const int = parseFloat(interest/100);
      const fee = capital/((1-Math.pow(int+1,-months))/int);
      setTotal({
        monthlyFee:fee.toFixed(2).replace('.',','),
        totalPayable:(fee*months).toFixed(2).replace('.',','),
      });
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
          setPrestamista={setPrestamista}
          setInterest={setInterest}
          setMonths={setMonths}
        />
      </SafeAreaView>
      <View>
        {
          user ? <Text>Usuario logueado</Text> : <Text>No hay usuario logueado</Text>
        }
      </View>
      <Footer calculate={calculate}/>
      <ResultCalculate 
        capital={capital}
        prestamista={prestamista}
        interest={interest}
        months={months}
        total={total}
        errorMessage={errorMessage} 
      />
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