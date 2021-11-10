import firebase from 'firebase/app';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDjN0FkVZflPgCBidaZ9t7VtyQlhIs80j0",
    authDomain: "cotizadorpetv.firebaseapp.com",
    projectId: "cotizadorpetv",
    storageBucket: "cotizadorpetv.appspot.com",
    messagingSenderId: "695191145155",
    appId: "1:695191145155:web:36631c3c191fce0c02b076",
    measurementId: "G-G3GZZB4G8P"
}; 

export default firebase.initializeApp(firebaseConfig);
/* app = firebase.initializeApp(firebaseConfig)
export default app; */