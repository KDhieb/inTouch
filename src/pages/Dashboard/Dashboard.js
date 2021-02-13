import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

export default function Dashboard() {
  const user = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/sign-in');
    }
  }, [user]);
  
  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
    </div>
  )
}