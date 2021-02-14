import React, { useEffect, useContext, useState } from 'react';
import classes from './SignIn.module.css';
import { UserContext } from '../../providers/UserProvider';
import { signInWithGoogle } from "../../services/firebase";
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import google from './googlesign.png';
import { database } from '../../services/firebase';

export default function SignUp() {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      const userRef = database.ref(user.uid);
      userRef.get()
      .then((data) => {
        if (!data.val().interests) {
          console.log('USERRRR HERE!', data.val());
          history.push('/interests');
        } else {
          history.push('/dashboard');
        }
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [user]);

  return (
    <div>
      <Navbar/>
      <div className={ classes.container }>
        <div className={ classes.contents}>
          <p className={ classes.title }>Hi, Welcome to inTouch!</p>
          <img onClick={signInWithGoogle} src={ google } width="250px" className={ classes.google }/>
        </div>
      </div>    
    </div>
  )
}