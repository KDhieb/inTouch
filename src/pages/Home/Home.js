import React, { useEffect, useContext, useState } from "react";
import classes from './Home.module.css';
// import { UserContext } from "../../providers/UserProvider";
// import { useHistory } from 'react-router-dom';
// import { logOut } from "../../services/firebase";
import Navbar from '../../components/Navbar/Navbar';

export default function Home() {
  // const user = useContext(UserContext);
  // const history = useHistory();

  // useEffect(() => {
  //   if (!user) {
  //     history.push('/sign-in');
  //   }
  // }, [user]);

  return (
    <div>
      <Navbar/>
      {/* <button onClick={logOut}>logout</button> */}
    </div>    
  )
}