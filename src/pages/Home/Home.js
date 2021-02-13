import React, { useEffect, useContext, useState } from "react";
import classes from './Home.module.css';
import { UserContext } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';
import { logOut } from "../../services/firebase";
// import firebase from "firebase";

export default function Home() {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/sign-in');
    }
  }, [user]);

  return (
    <div>
      This is home
      <button onClick={logOut}>logout</button>
{/*  */}
      {/* <button 
         onClick={() => { 
          const googleAuth = new firebase.auth.GoogleAuthProvider(); 
          firebase.auth().signInWithPopup(googleAuth);
          firebase.auth()
            .getRedirectResult()
            .then((result) => {
              if (result.credential) {
                var credential = result.credential;
                var token = credential.accessToken;
              }
              
              var user = result.user;
            }).catch((error) => {
              console.log(error)
            });
          }} > 
          Sign in with Google 
        </button> */}
    </div>    
  )
}