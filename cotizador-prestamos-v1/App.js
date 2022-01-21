import React, {useState, useEffect} from 'react';
import {
StyleSheet,
View,
Text,
SafeAreaView,
StatusBar,
YellowBox,
Button,
} from 'react-native';
import Form from './src/components/Form';
import Footer from './src/components/Footer';
import ResultCalculation from './src/components/ResultCalculation';
import colors from './src/utils/colors';
import firebase from './src/components/firebase';
import Autenticacion from './src/components/auth/Autenticacion';
import 'firebase/auth';

YellowBox.ignoreWarnings(['Picker has been extracted']);

export default function App() {

  const [user, setUser] = useState(undefined);

  useEffect(() => {
    /* firebase.auth().onAuthStateChange((res)=>{
      console.log(res);
      setUser(res);
    }) */
  },[]);

  if(typeof user === 'undefined'){
    return <Text>'WHO ARE YOU?'</Text>;
  }

  return (
  <>
    <StatusBar barStyle="light-content" />
    <SafeAreaView>
      {/* <Text>HELLO PETV!!!</Text> */}
      <View>
        {user ? <Text>Hello {user}</Text> : Autenticacion}
      </View>
    </SafeAreaView>
  </>
  );
}


const styles = StyleSheet.create({

});
