import dotenv from 'dotenv';
import config from './config';
import firebase from "firebase/app";
import "firebase/auth";
dotenv.config();

firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleAuth)
  .then((result) => {
    if (result.credential) {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      var token = credential.accessToken;
    }
    var user = result.user;
    console.log(user);
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
