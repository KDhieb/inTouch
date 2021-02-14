import "./App.css";
import React from "react";
import firebase, { database } from "./services/firebase";

import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { data, priorityData } from "./data.js";
import CustomStore from "devextreme/data/custom_store";

const dataObject = {};
// const currentDate = new Date();

const currentDate = new Date(2021, 4, 21);

console.log(currentDate);
const views = ["week"];

const groups = ["priorityId"];

const userId = "userabc123";

const addNewSlot = (timeslot) => {
  // firstTimeUser();
  var ts = timeslot.appointmentData;
  var title = ts.text;
  var description = ts.description;
  var startDate = ts.startDate;
  var endDate = ts.endDate;

  var data = {
    startDate: startDate.toString(),
    endDate: endDate.toString(),
    title: title,
    description: description,
  };
  console.log(`${title} ${description} ${startDate} ${endDate}`);
  const newSlotRef = firebase.database().ref(`${userId}/freeSlots`);
  newSlotRef.push(data);
  // const childRef = firebase.database().ref(`${userId}/freeSlots`);
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
  var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();
  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      var ts = timeslot.appointmentData;
      if (
        ts.startDate === childData.startDate &&
        ts.endDate === childData.endDate
      ) {
        firebase.database().ref(`${userId}/freeSlots`).child(key).remove();
        return true; // break out of loop
      }
    });
  });
};

// let oldStartDateForUpdate;
// let oldendDateForUpdate;

// const storeUnchangedSlot = (object) => {
//   var ts = object.oldData;
//   oldStartDateForUpdate = ts.startDate;
//   oldendDateForUpdate = ts.endDate;
// };

const updateTest = (object) => {
  console.log(object);
};

const update = (object) => {
  var ts = object.oldData;
  let oldStartDateForUpdate = ts.startDate;
  let oldendDateForUpdate = ts.endDate;

  var title = object.text;
  var description = object.description;
  var startDate = object.startDate;
  var endDate = object.endDate;

  var data = {
    startDate: startDate.toString(),
    endDate: endDate.toString(),
    title: title,
    description: description,
  };

  var query = firebase.database().ref(`${userId}/freeSlots`).orderByKey();

  query.once("value").then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var key = childSnapshot.key;
      var childData = childSnapshot.val();
      // console.log("----------");
      // console.log(
      //   `Key: ${key} start: ${childData.startDate} end: ${childData.endDate}`
      // );
      if (
        oldStartDateForUpdate.toString() === childData.startDate.toString() &&
        oldendDateForUpdate.toString() === childData.endDate.toString()
      ) {
        console.log("Reached");
        console.log(data.description);
        firebase.database().ref(`${userId}/freeSlots`).child(key).update(data);
        return true; // break out of loop
      }
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

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      groupByDate: true,
    };
    this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
  }
  onGroupByDateChanged(args) {
    this.setState({
      groupByDate: args.value,
    });
  }
  render() {
    return (
      <div id="scheduler">
        <Scheduler
          timeZone="America/Los_Angeles"
          dataSource={dataObject}
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
            fieldExpr="priorityId"
            allowMultiple={false}
            dataSource={priorityData}
            label="Priority"
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
            <Switch
              value={this.state.groupByDate}
              onValueChanged={this.onGroupByDateChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
