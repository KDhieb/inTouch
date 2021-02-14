import React, { useState, useContext, useEffect } from "react";
import classes from "./Interests.module.css";
import cancel from "../../static/cancel.svg";
import { UserContext } from "../../providers/UserProvider";
import { useHistory } from "react-router-dom";
import { database } from "../../services/firebase";

export default function Interests() {
  const user = useContext(UserContext);
  const history = useHistory();
  const [interest, setInterest] = useState("");
  const [interests, setInterests] = useState([]);
  const [isHover, setIsHover] = useState(false);
  const [currIndex, setCurrIndex] = useState(null);

  const onInterestChange = (event) => {
    setInterest(event.target.value);
    // console.log(event.target.value);
  };

  const addInterest = () => {
    if (interest.length > 0) {
      const newInterests = [...interests];
      newInterests.push(interest);
      setInterest("");
      setInterests(newInterests);
    }
  };

  const mouseEnter = (index) => {
    setIsHover(true);
    setCurrIndex(index);
  };

  const mouseLeave = () => {
    setIsHover(false);
    setCurrIndex(null);
  };

  const removeInterest = (index) => {
    const newInterests = JSON.parse(JSON.stringify(interests));
    newInterests.splice(index, 1);
    setInterests(newInterests);
  };

  const toDashboard = () => {
    database.ref(`/${user.uid}`).update({
      email: user.email,
      name: user.displayName,
      interests
    });
    history.push("/dashboard");
  };

  return (
    <div className={classes.container}>
      <div>
        <h1 className={classes.title}>What are your interests?</h1>
        <div className={classes.interestsContainer}>
          {interests.map((interest, index) => {
            return (
              <div
                key={index}
                className={classes.interestContainer}
                onMouseEnter={() => mouseEnter(index)}
                onMouseLeave={mouseLeave}
              >
                {isHover && currIndex === index && (
                  <img
                    src={cancel}
                    onClick={() => removeInterest(index)}
                    className={classes.delBtn}
                  />
                )}
                <p className={classes.interest}>{interest}</p>
              </div>
            );
          })}
        </div>
        <div style={{ marginBottom: "5rem" }}>
          <input
            className={classes.input}
            name="interest"
            placeholder="Tell me your interests"
            type="text"
            value={interest}
            onChange={onInterestChange}
          />
          <button onClick={addInterest} className={classes.addBtn}>
            Add
          </button>
        </div>
        <button onClick={toDashboard} className={classes.doneBtn}>
          Done
        </button>
      </div>
    </div>
  );
}
