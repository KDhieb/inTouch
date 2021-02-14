import React from "react";
import firebase, { database } from "../../services/firebase";

import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { data, priorityData } from "./data.js";
import CustomStore from "devextreme/data/custom_store";

const store = new CustomStore({
  // ...
  onUpdating: function (key, values) {
    // Your code goes here
  },
});
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
        title: newData.text,
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
          console.log(key);
          console.log("-----");
          console.log(dataObj.prevEndDate.toString());
          console.log(childData.endDate.toString());

          if (
            dataObj.prevStartDate.toString() ===
              childData.startDate.toString() &&
            dataObj.prevEndDate.toString() === childData.endDate.toString()
          ) {
            console.log("Reached");
            console.log(dataObj.data.title);
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

class Calendar extends React.Component {
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

export default Calendar;
