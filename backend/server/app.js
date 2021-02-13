const express = require('express')
const bodyParser = require('body-parser');
const calendar = require('./calendar');

// Import Admin SDK
var admin = require("firebase-admin");

// Get a database reference to our blog
var db = admin.database();
var ref = db.ref("free_slots");


const app = express()
const port = 3001


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getCalendars', (req, res) => {
    console.log(req.query.access_token);
    let calendar_list = calendar.getCalendars(req.query.access_token, res)
});

app.post('/createEvent', (req, res) => {
    let resource = {
        'summary': req.body.title,
        start: {
            'dateTime': req.body.startTime,
        },end: {
            'dateTime': req.body.endTime,
        },
        sendUpdates: 'all',
    }
    console.log("Creating event", resource)
    calendar.createEvent(req.query.access_token, resource, res)
});

app.post('/saveFreeSlot', (req,res) => {
    let slot = {
        start: {
            'dateTime': req.body.startTime,
        },end: {
            'dateTime': req.body.endTime,
        },
        purpose:["outdoors", "food"]
    }

})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));