import dotenv from 'dotenv';
import config from './config';
import firebase from "firebase/app";
import "firebase/auth";
dotenv.config();

firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    console.log(res.user)
  }).catch((error) => {
    console.log(error.message)
  })
}

export const logOut = () => {
  auth.signOut().then(()=> {
    console.log('logged out')
  }).catch((error) => {
    console.log(error.message)
  })
}

firebase.database().ref('/').set('test');
console.log('DATA SAVED');