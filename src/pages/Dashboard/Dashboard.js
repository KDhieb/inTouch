import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../../providers/UserProvider";
import { useHistory } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Calendar from '../../components/Calendar/Calendar';

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
      <Calendar/>
    </div>
  )
}