import React, { useEffect, useContext, useState } from 'react';
import classes from './SignIn.module.css';
import { UserContext } from '../../providers/UserProvider';
import { signInWithGoogle } from "../../services/firebase";
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <div className={ classes.container }>
      <div className={ classes.contents}>
        <h1>Hi, Welcome to inTouch!</h1>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>    
  )
}