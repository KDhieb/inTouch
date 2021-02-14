import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
export const UserContext = createContext({ googleEvents: null });
export default (props) => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (events) => {
      if (events) {
        console.log("THIS IS GOOGLE EVENTS", events);
        const { displayName, email, uid } = user;
        setEvents({});
      } else {
        setuser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={events}>{props.children}</UserContext.Provider>
  );
};
