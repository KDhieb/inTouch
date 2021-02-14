import React, { useContext, useEffect, useState } from "react";
import firebase, { database } from "../../services/firebase";

import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { data, dataObject, slotType, eventType } from "./data.js";
import CustomStore from "devextreme/data/custom_store";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { UserContext } from "../../providers/UserProvider";

function Calendar() {
  const user = useContext(UserContext);

  let userId = "abc123";

  if (user) {
    userId = user.uid;
  }
  const [newSource, setNewSource] = useState([]);

  function getFreeSlotData() {
    console.log("new source running again");
    let newSource = [];
    var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();
    query.once("value").then(function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var key = childSnapshot.key;
        var childData = childSnapshot.val();
        // console.log(childData);
        let data = {
          startDate: childData.startDate,
          endDate: childData.endDate,
          // text: "Install New Router in Dev Room",
          // priorityId: 1,
          // startDate: new Date("2021-05-16T20:00:00.000Z"),
          // endDate: new Date("2021-05-16T22:30:00.000Z"),
          text: childData.text,
          description: childData.description,
          // eventTypeId: 3,
          // sourceTypeId: 2,
        };
        newSource.push(data);
      });
      console.log(newSource);
      setNewSource(newSource);
      // return newSource;
    });
    // setNewSource(newSource)
    // return newSource;
  }

  useEffect(() => {
    getFreeSlotData();
  }, []);

  // function getData() {}
  // let newSource = getFreeSlotData();
  console.log("outside");

  console.log(newSource);

  // let data = {
  //   text: "Install New Router in Dev Room",
  //   priorityId: 1,
  //   startDate: new Date("2021-05-16T20:00:00.000Z"),
  //   endDate: new Date("2021-05-16T22:30:00.000Z"),
  // };

  // let newSource = [];
  // newSource.push(data);

  // const dataObject = [];

  // const currentDate = new Date();

  // const getFreeSlotData = () => {
  //   var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();

  //   query.once("value").then(function (snapshot) {
  //     snapshot.forEach(function (childSnapshot) {
  //       var key = childSnapshot.key;
  //       var childData = childSnapshot.val();
  //       let data = {
  //         startDate: childData.startDate,
  //         endDate: childData.endDate,
  //         text: childData.text,
  //         description: childData.description,
  //         eventTypeId: 3,
  //         sourceTypeId: 2,
  //       };
  //       dataObject.push(data);
  //     });
  //   });
  // };

  // getFreeSlotData();

  // const dataSource = AspNetData.createStore({
  //   key: "userId",
  //   // loadUrl: `https://intouch-3f91c-default-rtdb.firebaseio.com/${userId}.json`,
  //   // insertUrl: `${url}/Post`,
  //   // updateUrl: `${url}/Put`,
  //   // deleteUrl: `${url}/Delete`,
  //   onBeforeSend(_, ajaxOptions) {
  //     ajaxOptions = {
  //       Authorization: process.env.REACT_APP_API_KEY,
  //     };
  //     ajaxOptions.xhrFields = { withCredentials: true };
  //   },
  // });

  // var request = require("request");
  // var options = {
  //   method: "GET",
  //   url: `https://intouch-3f91c-default-rtdb.firebaseio.com/${userId}.json`,
  //   headers: {
  //     auth: process.env.REACT_APP_API_KEY,
  //   },
  // };
  // request(options, function (error, response) {
  //   if (error) throw new Error(error);
  //   console.log(response.body);
  // });

  const currentDate = new Date(2021, 4, 21);

  console.log(currentDate);
  const views = ["week"];

  // const groups = ["priorityId"];

  const addNewSlot = (timeslot) => {
    // firstTimeUser();
    var ts = timeslot.appointmentData;
    var text = ts.text;
    var description = ts.description;
    var startDate = ts.startDate;
    var endDate = ts.endDate;

    var newData = {
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      text: text,
      description: description,
    };
    console.log(`${text} ${description} ${startDate} ${endDate}`);
    const newSlotRef = firebase.database().ref(`${userId}/freeSlots`);
    newSlotRef.push(newData);

    var testData = {
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      text: text,
      description: description,
      eventTypeId: 3,
      sourceTypeId: 2,
    };

    data.push(newData);
    console.log(dataObject);
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

  // constructor() {
  // super();
  // const user = useContext(UserContext);

  // this.state = {
  //   groupByDate: true,
  // };
  // this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
  // }
  // onGroupByDateChanged(args) {
  //   this.setState({
  //     groupByDate: args.value,
  //   });
  // }

  // render() {
  return (
    <div id="scheduler">
      <Scheduler
        timeZone="America/Los_Angeles"
        dataSource={newSource}
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
        // onAppointmentUpdated={updateTest}
        // onCurrentDateChange={firstTimeUser}
      >
        <Resource
          fieldExpr="sourceTypeId"
          allowMultiple={false}
          dataSource={slotType}
          label="Source"
        />

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
        <div className="caption">Show Friend Openings </div>
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
