// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyC3hzwWFiGhdifOfg0TafdB32ZzmCnXbss",
    authDomain: "chat-app-5c1f8.firebaseapp.com",
    projectId: "chat-app-5c1f8",
    storageBucket: "chat-app-5c1f8.appspot.com",
    messagingSenderId: "909419115241",
    appId: "1:909419115241:web:27d176f32fabad021f7678",
    measurementId: "G-ZD7TDN1B9J"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  export const db = firebaseApp.firestore();
  export const auth = firebase.auth();
  export const provider = new firebase.auth.GoogleAuthProvider();
