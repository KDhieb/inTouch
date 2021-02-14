// const firebase = require("../../services/firebase");
// const { useContext, useEffect, useState } = require("react");
// const { slotType, eventType } = require("./data.js");

import React, { useContext, useEffect, useState } from "react";
import firebase, { database } from "../../services/firebase";
import "whatwg-fetch";
import Switch from "devextreme-react/switch";
import Scheduler, { Resource, View } from "devextreme-react/scheduler";
import { slotType, eventType } from "./data.js";
import { UserContext } from "../../providers/UserProvider";

export function getTimes(users, callback) {
  let result;
  let times = [];
  let names = [];
  let emails = [];
  var dbRef = firebase.database().ref();
  dbRef.once("value", (snapshot) => {
    const calendar = snapshot.val();
    
    for (let i in users) {
      let slots = calendar[users[i]].freeSlots;
      names.push(calendar[users[i]].name);
      emails.push(calendar[users[i]].email);
      for (let j in slots) {
        times.push({
          name: calendar[users[i]].name,
          email: calendar[users[i]].email,
          startDate: new Date(slots[j].startDate),
          endDate: new Date(slots[j].endDate),
          type: slots[j].eventTypeId
        });
      }
    }
    console.log([callback(times), names, emails])
    result = [callback(times), names, emails];
  });
  return result
}

export function overlap(dateRanges) {
  var sorted = dateRanges.sort((previous, current) => {
    var previousTime = previous.startDate.getTime();
    var currentTime = current.startDate.getTime();

    if (previousTime < currentTime) {
      return -1;
    }
    if (previousTime === currentTime) {
      return 0;
    }
    return 1;
  });

  var result = sorted.reduce(
    (result, current, idx, arr) => {
      if (idx === 0) {
        return result;
      }
      var previous = arr[idx - 1];

      var previousStart = previous.startDate.getTime();
      var previousEnd = previous.endDate.getTime();
      var currentStart = current.startDate.getTime();
      var currentEnd = current.startDate.getTime();
      var overlap = previousEnd >= currentStart && previousStart <= currentEnd;
      var compatible =
        previous.type == 3 ||
        current.type == 3 ||
        previous.type == current.type;

      if (overlap && compatible) {
        result.overlap = true;
        result.ranges.push({
          startDate: new Date(
            Math.max.apply(null, [previous.startDate, current.startDate])
          ),
          endDate: new Date(
            Math.min.apply(null, [previous.endDate, current.endDate])
          ),
        });
      }
      return result;
    },
    { overlap: false, ranges: [] }
  );
  return result;
}

console.log(getTimes(["4K2ddbkVhVa1Fbmbu8pJFSKB4cj1", "ImJUpetNVPU7MRnyZR21Xtn0Pe62"], overlap))
