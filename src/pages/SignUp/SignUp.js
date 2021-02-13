import React, { useEffect, useContext, useState } from 'react';
import classes from './SignUp.module.css';
import { UserContext } from '../../providers/UserProvider';
import { signInWithGoogle } from "../../services/firebase";
import { useHistory } from 'react-router-dom';

export default function SignUp() {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push('/');
    }
  }, [user]);

  return (
    <div className={ classes.container }>
      <div className={ classes.contents}>
        <h1>Hi, Welcome to inTouch!</h1>
        <button onClick={signInWithGoogle}>Continue with Google</button>
      </div>
    </div>    
  )
}