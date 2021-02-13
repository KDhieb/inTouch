import React from 'react';
import classes from './Home.module.css';
import firebase from "firebase";

export default function Home() {
  return (
    <div>
      <button 
         onClick={() => { 
          const googleAuth = new firebase.auth.GoogleAuthProvider(); 
          firebase.auth().signInWithPopup(googleAuth);
          firebase.auth()
            .getRedirectResult()
            .then((result) => {
              if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
                var token = credential.accessToken;
              }
              
              var user = result.user;
            }).catch((error) => {
              console.log(error)
            });
          }} > 
          Sign in with Google 
        </button>
    </div>    
  )
}