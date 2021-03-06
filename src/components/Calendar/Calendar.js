import React, { useContext, useEffect, useState } from "react";
import firebase, { database } from "../../services/firebase";
import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { slotType, eventType } from "./data.js";
import { UserContext } from "../../providers/UserProvider";
import context from "react-bootstrap/esm/AccordionContext";
// import { getCalendars, createEvent } from "./GoogleCal";

export function createCalendarEvent(title, startTime, endTime, inviteList) {
  console.log(
    "Creating calendar event from token",
    localStorage.getItem("token")
  );
  var request = require("request");
  var options = {
    method: "POST",
    url: `http://localhost:3001/createEvent?access_token=${localStorage.getItem(
      "token"
    )}`,
    json: {
      title: title,
      startTime: startTime,
      endTime: endTime,
      inviteList: inviteList, //I.e ['email1','email2']
    },
    headers: {},
  };
  request(options, function (error, response) {
    if (error) {
      console.log("Failed to create event", error);
    } else {
      console.log("Successfully created event", response.body);
      console.log(response.body);
      console.log(response.body.JSON);
    }
  });
}

function Calendar() {
  const user = useContext(UserContext);

  let userId = "abc123";

  if (user) {
    userId = user.uid;
  }

  const [newSource, setNewSource] = useState([]);

  const [googleCalData, setNewGoogleCalData] = useState([]);

  const [finalArray, setFinalArray] = useState([]);

  function cleanGoogleJSON() {
    let newArray = [];
    googleCalData.forEach((element) => {
      let data = {
        startDate: new Date(element.start).toString(),
        endDate: new Date(element.end).toString(),
        text: element.summary.toString(),
        description: "GOOGLE CALENDAR EVENT",
        eventTypeId: 0,
      };
      console.log(element.start);
      newArray.push(data);
    });
    // return newArray;

    console.log("NEW ARRAY");
    console.log(newArray);
    let final = newArray.concat(newSource);
    console.log("FINAL");
    console.log(final);
    setFinalArray(final);
  }

  function getGoogleCalendarData() {
    console.log("Getting calendar from token", localStorage.getItem("token"));
    var request = require("request");
    var options = {
      method: "GET",
      url: `http://localhost:3001/getcalendars?access_token=${localStorage.getItem(
        "token"
      )}`,
      headers: {},
    };
    request(options, function (error, response) {
      if (error) {
        console.log("Failed to fetch", error);
      } else {
        console.log("Successfully fetched google calendar", response.body);
        console.log(response.body);
        setNewGoogleCalData(JSON.parse(response.body));
      }
    });
  }

  function getFreeSlotData() {
    console.log("new source running again");
    let newSource = [];
    var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        let data = {
          startDate: childData.startDate,
          endDate: childData.endDate,
          text: childData.text,
          description: childData.description,
          eventTypeId: childData.eventTypeId,
          // sourceTypeId: 2,
        };
        newSource.push(data);
      });
      console.log(newSource);
      setNewSource(newSource);
    });
  }

  useEffect(() => {
    getFreeSlotData();
    getGoogleCalendarData();
  }, []);

  useEffect(() => {
    if (newSource && googleCalData) {
      cleanGoogleJSON();
    }
  }, [newSource, googleCalData]);

  console.log("newsource");

  // console.log(newSource);

  const currentDate = new Date();

  console.log(currentDate);
  const views = ["week"];

  const addNewSlot = (timeslot) => {
    var ts = timeslot.appointmentData;
    var text = ts.text;
    var description = ts.description || "No description";
    var startDate = ts.startDate;
    var endDate = ts.endDate;
    var eventTypeId = ts.eventTypeId;
    if (!eventTypeId) {
      eventTypeId = 3;
    }

    var newData = {
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      text: text,
      description: description,
      eventTypeId: eventTypeId,
    };

    const newSlotRef = firebase.database().ref(`${userId}/freeSlots`);
    newSlotRef.push(newData);

    console.log(timeslot);
  };

  const firstTimeUser = () => {
    var newUserObj = {
      interests: [],
      freeSlots: [],
    };

    const newUserRef = firebase.database().ref(userId);
    newUserRef.push(newUserObj);
  };

  const onDelete = (timeslot) => {
    console.log("works or");
    var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log(childData);
        var ts = timeslot.appointmentData;
        if (
          ts.startDate.toString() === childData.startDate.toString() &&
          ts.endDate.toString() === childData.endDate.toString()
        ) {
          console.log("Reached here");
          firebase.database().ref(`${userId}/freeSlots`).child(key).remove();
          return true; // break out of loop
        }
      });
    });
  };

  const update = async (object) => {
    var promise = new Promise((resolve, reject) => {
      let oldData = object.oldData;
      let newData = object.newData;

      resolve({ oldData, newData });
    });

    promise
      .then((obj) => {
        console.log(obj);
        console.log("first .then");
        let oldData = obj.oldData;
        let newData = obj.newData;

        let prevStartDate = oldData.startDate.toString();
        let prevEndDate = oldData.endDate.toString();

        var data = {
          startDate: newData.startDate.toString(),
          endDate: newData.endDate.toString(),
          text: newData.text,
          description: newData.description,
        };

        return { data, prevStartDate, prevEndDate };
      })
      .then(async (dataObj) => {
        console.log("is it working at this point");
        var query = await firebase
          .database()
          .ref(`${userId}/freeSlots`)
          .orderByKey();

        query.once("value").then(function (snapshot) {
          snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            if (
              dataObj.prevStartDate.toString() ===
                childData.startDate.toString() &&
              dataObj.prevEndDate.toString() === childData.endDate.toString()
            ) {
              firebase
                .database()
                .ref(`${userId}/freeSlots`)
                .child(key)
                .update(JSON.parse(JSON.stringify(dataObj.data)));
              return true; // break out of loop
            }
          });
        });
      });
  };

  const retrieve = () => {
    var userRef = firebase.database().ref(userId);
    userRef.on("value", (snapshot) => {
      console.log(`Snapshot: ${snapshot.val()}`);
      console.log(snapshot.val());
    });
  };

  return (
    <div id="scheduler">
      <Scheduler
        // timeZone="America/Los_Angeles"
        dataSource={finalArray}
        views={views}
        showAllDayPanel={false}
        defaultCurrentView="week"
        defaultCurrentDate={currentDate}
        height={700}
        startDayHour={8}
        endDayHour={24}
        crossScrollingEnabled={true}
        onAppointmentAdded={addNewSlot}
        onAppointmentDeleted={onDelete}
        onAppointmentUpdating={update}
      >
        <Resource
          fieldExpr="eventTypeId"
          allowMultiple={false}
          dataSource={eventType}
          label="Event Preference"
        />

        <View type="week" name="Week" />
        <View
          type="timelineWeek"
          name="Timeline Week"
          groupOrientation="horizontal"
          cellDuration={60}
        />
      </Scheduler>
      <div className="options">
        {/* <div className="caption">Show Friend Openings </div> */}
        <div className="option">
          {/* <Switch
            value={this.state.groupByDate}
            onValueChanged={this.onGroupByDateChanged}
          /> */}
        </div>
      </div>
    </div>
  );
}
// }

export default Calendar;
