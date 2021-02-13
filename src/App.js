import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  Home,
  Interests,
  SignIn,
  Profile,
  Friends,
  Dashboard
} from './pages';
import UserProvider from "./providers/UserProvider";

// import config from './services/config';
import Firebase from 'firebase';
// Firebase.initializeApp(config.firebaseConfig)

Firebase.database().ref('/').set('test');
console.log('DATA SAVED');

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/interests">
            <Interests />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/friends">
            <Friends />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </UserProvider>
  );
}
// import "./App.css";
// import React from "react";
// import firebase from "./services/firebase";

// import "whatwg-fetch";
// import Switch from "devextreme-react/switch";
// import Scheduler, { Resource, View } from "devextreme-react/scheduler";
// import { data, priorityData } from "./data.js";
// import CustomStore from "devextreme/data/custom_store";

// // const currentDate = new Date();

// const currentDate = new Date(2021, 4, 21);

// console.log(currentDate);
// const views = ["week"];

// const groups = ["priorityId"];

// const onAdded = (timeslot) => {
//   var ts = timeslot.appointmentData;
//   var title = ts.text;
//   var description = ts.description;
//   var startDate = ts.startDate;
//   var endDate = ts.endDate;
//   var data = {
//     title: title,
//     description: description,
//     startDate: startDate,
//     endDate: endDate,
//   };
//   console.log(`${title} ${description} ${startDate} ${endDate}`);
//   const newSlotRef = firebase.database().ref("New Slot");
//   newSlotRef.push(data);
// };

// const onDelete = (timeslot) => {
//   console.log("delete!");
// };

// const onUpdate = (timeslot) => {
//   console.log("Update!");
// };

// const retrieve = () => {};

// class App extends React.Component {
//   constructor() {
//     super();

//     this.state = {
//       groupByDate: true,
//     };
//     this.onGroupByDateChanged = this.onGroupByDateChanged.bind(this);
//   }
//   onGroupByDateChanged(args) {
//     this.setState({
//       groupByDate: args.value,
//     });
//   }
//   render() {
//     return (
//       <div id="scheduler">
//         <Scheduler
//           timeZone="America/Los_Angeles"
//           dataSource={data}
//           views={views}
//           showAllDayPanel={false}
//           defaultCurrentView="week"
//           defaultCurrentDate={currentDate}
//           height={700}
//           startDayHour={8}
//           endDayHour={24}
//           crossScrollingEnabled={true}
//           onAppointmentAdded={onAdded}
//           onAppointmentDeleted={onDelete}
//           onAppointmentUpdated={onUpdate}
//         >
//           <Resource
//             fieldExpr="priorityId"
//             allowMultiple={false}
//             dataSource={priorityData}
//             label="Priority"
//           />

//           <View type="week" name="Week" />
//           <View
//             type="timelineWeek"
//             name="Timeline Week"
//             groupOrientation="horizontal"
//             cellDuration={60}
//           />
//         </Scheduler>
//         <div className="options">
//           <div className="caption">Show Friend Openings </div>
//           <div className="option">
//             <Switch
//               value={this.state.groupByDate}
//               onValueChanged={this.onGroupByDateChanged}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
