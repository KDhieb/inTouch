const express = require('express')
const bodyParser = require('body-parser');
const calendar = require('./calendar');
var firebase = require('firebase')
require('dotenv').config();
let firebaseConfig =  {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
}
firebase.initializeApp(firebaseConfig)
let database = firebase.database()

const app = express()
const port = 3001


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.get('/getFreeSlots', (req, res) => {
    database.ref("slots/"+req.query.uid).once('value')
    .then(function(snapshot) {
        console.log(snapshot.val())
        res.send(snapshot.val())
    })
})

app.post('/createFreeSlots', (req,res) => {
    let slot = {
        start: {
            'dateTime': req.body.startTime,
        },end: {
            'dateTime': req.body.endTime,
        },
        purpose:["outdoors", "food"]
    }
    database.ref("slots/"+req.body.uid).push(slot, function(error) {
        if (error) {
          // The write failed...
          res.send("Failed with error: " + error)
          console.log("Failed with error: " + error)
        } else {
          // The write was successful...
          res.send("Successfully created slot")
          console.log("success")
        }
    });
})


app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));