import React, { useEffect, useContext, useState } from "react";
import classes from './Navbar.module.css';
import { UserContext } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';
import { logOut } from "../../services/firebase";

export default function Navbar() {
  const user = useContext(UserContext);
  const history = useHistory();

  const toSignIn = () => {
    history.push('/sign-in');
  }

  const toHome = () => {
    history.push('/');
  }

  const toDashboard = () => {
    history.push('/dashboard');
  }

  const toFriends = () => {
    history.push('/friends');
  }

  const toProfile = () => {
    history.push('/profile');
  }

  const signOut = () => {
    logOut();
    history.push('/');
  }

  return (
    <div className={ classes.container }>
      <h1 className={ classes.logo } onClick={ toHome }>inTouch</h1>
      <div className={ classes.rightNav }>
        { user && <h3 className={ classes.navDB } onClick={ toDashboard }>Dashboard</h3> }
        { user && <h3 className={ classes.nav } onClick={ toFriends }>Friends</h3> }
        { user && <h3 className={ classes.nav } onClick={ toProfile }>Profile</h3> }
        { user && <h3 className={ classes.user }>Hi, { user.displayName }!</h3> }
        <div className={ classes.buttons }>
          {
            user 
            ? <button onClick={ signOut } className={ classes.logout }>Logout</button>
            : <button onClick= { toSignIn } className={ classes.signIn }>Sign In</button>
          }
        </div>
      </div>
    </div>
  )
}