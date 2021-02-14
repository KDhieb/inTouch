import React, { useState, useEffect, useContext } from "react";
import classes from "./Friends.module.css";
import Navbar from "../../components/Navbar/Navbar";
import { UserContext } from "../../providers/UserProvider";
import { database } from "../../services/firebase";
import { getTimes, overlap } from "../../components/Calendar/algo";
import { createCalendarEvent } from "../../components/Calendar/Calendar";
import { useHistory } from "react-router-dom";
// createCalendarEvent("title", "startTime", "endTime", ['inv1','inv2'])

export default function Friends() {
  const user = useContext(UserContext);
  const [friend, setFriend] = useState("");
  const [touchable, setTouchable] = useState([]);
  const [canAdd, setCanAdd] = useState(false);
  const [friendUid, setFriendUid] = useState("");
  const [friendsUid, setFriendsUid] = useState([]);
  const [friends, setFriends] = useState([]);

  // console.log(overlap(getTimes(["U2h82SJHjas91ASA", "K92jnsA8scjchaus8shf"])));

  useEffect(() => {
    database
      .ref(localStorage.getItem("UID"))
      .child("friends")
      .on("value", (user) => {
        const data = user.val();
        if (data) {
          let uidList = [];
          for (let friend of Object.keys(data)) {
            uidList.push(data[friend]);
          }
          setFriendsUid(uidList);
        }
      });
  }, []);

  useEffect(() => {
    setTouchable([{
      title:"🍽️    Dinner with Jacky ",
      startTime:"2021-02-15T18:00:00+04:00",
      endTime:"2021-02-15T20:00:00+04:00",
      emails:['inv1'],
    },
    {
      title:"🎥   Movie night with Gabriella",
      startTime:"2021-02-15T18:00:00+04:00",
      endTime:"2021-02-15T20:00:00+04:00",
      emails:['inv1'],
    },
    {
      title:"⛸️   Ice skating with Jacky and Gabriella",
      startTime:"2021-02-16T13:00:00+04:00",
      endTime:"2021-02-16T16:00:00+04:00",
      emails:['inv1','inv2'],
    }])
  }, []);

  useEffect(() => {
    if (friendsUid) {
      database
        .ref("/")
        .get()
        .then((snapshot) => {
          const data = snapshot.val();
          let friendsList = [];
          friendsUid.map((uid) => {
            for (let user of Object.keys(data)) {
              if (user === uid) {
                friendsList.push({
                  uid,
                  name: data[user].name,
                  email: data[user].email,
                });
              }
            }
          });
          setFriends(friendsList);
        });
    }
  }, [friendsUid]);

  const onFriendChange = (event) => {
    setFriend(event.target.value);
    console.log(event.target.value);
  };

  const addFriend = () => {
    database
      .ref("/")
      .get()
      .then((snapshot) => {
        const data = snapshot.val();
        console.log("DB", data);
        for (let user of Object.keys(data)) {
          if (data[user].email === friend) {
            // console.log("USERRR", user, friend, data[user]);
            // console.log("works!");
            setFriendUid(user);
            setCanAdd(true);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (canAdd && friendUid.length > 0) {
      setCanAdd(false);
      const uid = friendUid;
      setFriend("");
      setFriendUid("");
      // console.log('can add!')
      database.ref(`/${user.uid}`).child("friends").push(uid);
    }
  }, [canAdd, friendUid]);

  return (
    <div>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.left}>
          <div className={classes.leftTop}>
            <h2 className={classes.title}>Your Friends</h2>
            {/* <h2 className={ classes.plus }>+</h2> */}
          </div>
          <div className={classes.addFriendContainer}>
            <input
              className={classes.input}
              name="friend"
              placeholder="Enter an email"
              type="email"
              value={friend}
              onChange={onFriendChange}
            />
            <button onClick={addFriend} className={classes.addBtn}>
              Add Friend
            </button>

            <div></div>
          </div>
          {/* <p>{ JSON.stringify(friendsUid) }</p> */}
          {/* <p>{ JSON.stringify(friends) }</p> */}
          {friends.map((friend, index) => {
            return (
              <div
                className={classes.friendContainer}
                styles={
                  index === 0 || index === friends.length - 1
                    ? { border: "none" }
                    : { borderBottom: "2px black", borderColor: "black" }
                }
              >
                <h4 className={classes.friendName}>{friend.name}</h4>
                <p className={classes.friendEmail}>{friend.email}</p>
              </div>
            );
          })}
        </div>
        <div className={classes.right}>
          <div className={classes.rightTop}>
            <h2 className={classes.title}>Touchables</h2>
            {/* <div className={classes.addTouchableContainer}>
              <h4 className={classes.friendName}>Basketball with Jacky</h4>
              <h4 className={classes.friendName}>Dec 5 1997</h4>
              <button
                onClick={createCalendarEvent("title", "startTime", "endTime", [
                  "inv1",
                  "inv2",
                ])}
                className={classes.addBtn}
              >
                Send invite
              </button>
              <div></div>
            </div> */}
            <div className={ classes.touchablesWrap }>
              {
                touchable.map((touch, index) => {
                  const startDate = new Date(touch.startTime).toDateString()
                  const startTime = new Date(touch.startTime).toTimeString().slice(0,5);
                  const endTime = new Date(touch.endTime).toTimeString().slice(0,5);
                  return (
                    <div className={classes.addTouchableContainer}>
                      <p className={classes.touchTime}>{startDate}          {startTime}-{endTime}</p>
                      <h4 className={classes.touchTitle}>{touch.title}</h4>
                      <button 
                        onClick={() => createCalendarEvent(touch.title, touch.startTime, touch.endTime, touch.emails)} 
                        className={classes.inviteBtn}
                      >
                        Send invite
                      </button>
                    <div></div>
                  </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
