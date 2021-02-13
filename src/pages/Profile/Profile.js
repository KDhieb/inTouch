import React, { useContext, useEffect, useState } from 'react';
import classes from './Profile.module.css';
import cancel from '../../static/cancel.svg';
import { UserContext } from "../../providers/UserProvider";
import Navbar from '../../components/Navbar/Navbar';
import { database } from '../../services/firebase';

export default function Profile() {
  const user = useContext(UserContext);
  const [interest, setInterest] = useState('');
  const [interests, setInterests] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [currIndex, setCurrIndex] = useState(null);
  const userRef = database.ref(user.uid);

  useEffect(() => {
    userRef.on('value', (user) => {
      const data = user.val();
      setInterests(data.interests);
      // console.log('USER DATA', data);
    })
  }, []);

  const onInterestChange = (event) => {
    setInterest(event.target.value);
    console.log(event.target.value);
  }

  const addInterest = () => {
    if (interest.length > 0) {
      const newInterests = [...interests];
      newInterests.push(interest);
      userRef.child('interests').update(newInterests);
      setInterest('');
      setInterests(newInterests);
    }
  }

  const mouseEnter = (index) => {
    setIsHover(true);
    setCurrIndex(index);
  }

  const mouseLeave = () => {
    setIsHover(false);
    setCurrIndex(null);
  }

  const removeInterest = (index) => {
    const newInterests = JSON.parse(JSON.stringify(interests));
    newInterests.splice(index, 1);
    userRef.child('interests').child(index).remove();
    setInterests(newInterests);
  }
  
  return (
    <div>
      <Navbar/>
      <div className={ classes.container }>
        <h1 className={ classes.displayName }>{ user.displayName }</h1>
        <h3 className={ classes.email }>{ user.email }</h3>
        <h2>Your interests</h2>
        <div className={ classes.interestsContainer }>
          { interests && 
            interests.map((interest, index) => {
              return (
                <div 
                  key={ index } 
                  className={ classes.interestContainer }
                  onMouseEnter={ () => mouseEnter(index) }
                  onMouseLeave={ mouseLeave }
                >
                  { isHover && (currIndex === index) &&
                    <img 
                      src={ cancel } 
                      onClick={ () => removeInterest(index) } 
                      className={ classes.delBtn }
                    />
                  }
                  <p className={ classes.interest }>{ interest }</p>
                </div>
              )
            })
          }
        </div>
        <div style={{ marginBottom: '5rem' }}>
          <input
            className={ classes.input }
            name="interest"
            placeholder="Tell me your interests"
            type="text"
            value={ interest }
            onChange={ onInterestChange }
          />
          <button onClick={ addInterest } className={ classes.addBtn }>Add</button>
        </div>
      </div>
    </div>
  )
}