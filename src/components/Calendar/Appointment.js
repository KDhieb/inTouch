import React from "react";
import Query from "devextreme/data/query";
import "devextreme/localization/globalize/date";

import Globalize from "globalize";
// import { moviesData } from './data.js';

export default function Appointment(model) {
  const { appointmentData } = model.data;
  const movieData = getMovieById(appointmentData.movieId) || {};
  return (
    <div className="showtime-preview">
      <div> {movieData.text}</div>
      <div>
        Ticket Price: <strong>${appointmentData.price}</strong>
      </div>
      <div>
        {Globalize.formatDate(appointmentData.startDate, { time: "short" })}
        {" - "}
        {Globalize.formatDate(appointmentData.endDate, { time: "short" })}
      </div>
    </div>
  );
}

// onAppointmentFormOpening(data) {
//     let form = data.form,
//       movieInfo = getMovieById(data.appointmentData.movieId) || {},
//       startDate = data.appointmentData.startDate;

//     form.option('items', [{
//       label: {
//         text: 'Movie'
//       },
//       editorType: 'dxSelectBox',
//       dataField: 'movieId',
//       editorOptions: {
//         items: moviesData,
//         displayExpr: 'text',
//         valueExpr: 'id',
//         onValueChanged: function(args) {
//           movieInfo = getMovieById(args.value);

//           form.updateData('director', movieInfo.director);
//           form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
//         }
//       },
//     }, {
//       label: {
//         text: 'Director'
//       },
//       name: 'director',
//       editorType: 'dxTextBox',
//       editorOptions: {
//         value: movieInfo.director,
//         readOnly: true
//       }
//     }, {
//       dataField: 'startDate',
//       editorType: 'dxDateBox',
//       editorOptions: {
//         width: '100%',
//         type: 'datetime',
//         onValueChanged: function(args) {
//           startDate = args.value;
//           form.updateData('endDate', new Date(startDate.getTime() + 60 * 1000 * movieInfo.duration));
//         }
//       }
//     }, {
//       name: 'endDate',
//       dataField: 'endDate',
//       editorType: 'dxDateBox',
//       editorOptions: {
//         width: '100%',
//         type: 'datetime',
//         readOnly: true
//       }
//     }, {
//       dataField: 'price',
//       editorType: 'dxRadioGroup',
//       editorOptions: {
//         dataSource: [5, 10, 15, 20],
//         itemTemplate: function(itemData) {
//           return `$${itemData}`;
//         }
//       }
//     }
//     ]);
//   }
