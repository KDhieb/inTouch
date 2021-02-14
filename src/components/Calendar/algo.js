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

export function getTimes(users) {
  let schema;
  var dbRef = firebase.database().ref();
  dbRef.on("value", (snapshot) => {
    console.log(snapshot.val());
    schema = snapshot.val();

    const calendar = schema;
    let times = [];
    for (let i in users) {
      let slots = calendar[i].freeSlots;
      for (i in slots) {
        times.push({
          startDate: new Date(slots[i].startDate),
          endDate: new Date(slots[i].endDate),
          type: slots[i].eventTypeID,
        });
      }
    }

    console.log(times);
    return times;
  });
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
