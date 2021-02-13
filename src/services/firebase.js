import dotenv from 'dotenv';
import config from './config';
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
dotenv.config();

firebase.initializeApp(config.firebaseConfig);

export const auth = firebase.auth();
const googleAuth = new firebase.auth.GoogleAuthProvider()
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleAuth);
  auth.getRedirectResult()
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

// import firebase from "firebase/app";
// import "firebase/database";
// const config = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_DATABASE_URL,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

// firebase.initializeApp(config);
const database = firebase.database();

export { database };
export default firebase;
