import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../services/firebase"
export const UserContext = createContext({user: null})
export default (props) => {
  const [user, setuser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log('THIS IS USER', user);
        const { displayName, email, uid }  = user;
        setuser({
          uid,
          displayName,
          email
        })
      } else {
        setuser(null);
      }
    })
  },[]);

  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}