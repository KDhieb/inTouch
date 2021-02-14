import React, { useState, useEffect, useContext } from 'react';
import classes from './Friends.module.css';
import Navbar from '../../components/Navbar/Navbar';
import { UserContext } from "../../providers/UserProvider";
import { database } from "../../services/firebase";
import { useHistory } from 'react-router-dom';

export default function Friends() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [friend, setFriend] = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const [friendUid, setFriendUid] = useState('');
  const [friendsUid, setFriendsUid] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (user) {
      database.ref(user.uid).child('friends').on('value', (user) => {
        const data = user.val();
        if (data) {
          // console.log('17, DATA', data);
          let uidList = [];
          for (let friend of Object.keys(data)) {
            uidList.push(data[friend]);
          }
          setFriendsUid(uidList);
        }
      })
    }
  }, [user]);

  useEffect(() => {
    if (friendsUid) {
      database.ref('/').get()
      .then((snapshot) => {
        const data = snapshot.val();
        let friendsList = [];
        friendsUid.map((uid) => {
          for (let user of Object.keys(data)) {
            if (user === uid) {
              friendsList.push({
                uid,
                name: data[user].name,
                email: data[user].email
              });
            }
          }
        });
        setFriends(friendsList);
      })
    }
  }, [friendsUid]);

  const onFriendChange = (event) => {
    setFriend(event.target.value);
    console.log(event.target.value);
  }

  const addFriend = () => {
    database.ref('/').get()
    .then((snapshot) => {
      const data = snapshot.val();
      // console.log('DB', data);
      for (let user of Object.keys(data)) {
        if (data[user].email === friend) {
          // console.log('USERRR', user, friend, data[user]);
          // console.log('works!');
          setFriendUid(user);
          setCanAdd(true);
        }
      }
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    if (canAdd && friendUid.length > 0) {
      setCanAdd(false);
      const uid = friendUid;
      setFriend('');
      setFriendUid('');
      // console.log('can add!')
      database.ref(`/${user.uid}`).child('friends').push(uid);
    }
  }, [canAdd, friendUid]);

  return (
    <div>
      <Navbar/>
      <div className={ classes.container }>
        <div className={ classes.left }>
          <div className={ classes.leftTop }>
            <h2 className={ classes.title }>Your Friends</h2>
            {/* <h2 className={ classes.plus }>+</h2> */}
          </div>
          <div className={ classes.addFriendContainer }>
            <input
              className={ classes.input }
              name="friend"
              placeholder="Enter an email"
              type="email"
              value={ friend }
              onChange={ onFriendChange }
            />
            <button onClick={ addFriend } className={ classes.addBtn }>Add Friend</button>
          </div>
          {/* <p>{ JSON.stringify(friendsUid) }</p> */}
          {/* <p>{ JSON.stringify(friends) }</p> */}
          {
            friends.map((friend, index) => {
              return (
                <div className={ classes.friendContainer } styles={ index === 0 || index === friends.length - 1 ? { border: 'none' } : { borderBottom: '2px black', borderColor: 'black' }}>
                  <h4 className={ classes.friendName }>{ friend.name }</h4>
                  <p className={ classes.friendEmail }>{ friend.email }</p>
                </div>
              )
            })
          }
        </div>
        <div className={ classes.right }>
          {/* for the recommendations */}
        </div>
      </div>
    </div>    
  )
}