import "./App.css";
import React from "react";

import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { data, priorityData } from "./data.js";
import CustomStore from "devextreme/data/custom_store";

// const currentDate = new Date();

const currentDate = new Date(2021, 4, 21);

console.log(currentDate);
const views = ["week"];

const groups = ["priorityId"];

const onAdded = (timeslot) => {
  var ts = timeslot.appointmentData;

  var title = ts.text;
  var description = ts.description;
  var startDate = ts.startDate;
  var endDate = ts.endDate;

  var data = {
    title: title,
    description: description,
    startDate: startDate,
    endDate: endDate,
  };

  console.log(`${title} ${description} ${startDate} ${endDate} `);
  // console.log(object.appointmentData);
  // console.log(object.appointmentData.text);
  // console.log("its working");
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
          dataSource={data}
          views={views}
          showAllDayPanel={false}
          defaultCurrentView="week"
          defaultCurrentDate={currentDate}
          height={700}
          startDayHour={8}
          endDayHour={24}
          crossScrollingEnabled={true}
          onAppointmentAdded={onAdded}
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
