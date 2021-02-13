import React, { useContext } from 'react';
import classes from './Profile.module.css';
import { UserContext } from "../../providers/UserProvider";
import Navbar from '../../components/Navbar/Navbar';

export default function Profile() {
  const user = useContext(UserContext);

  return (
    <div>
      <Navbar/>
      <h1>{ user.displayName }</h1>
    </div>
  )
}