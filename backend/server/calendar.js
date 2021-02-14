const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const { resolveCname } = require("dns");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

function getCalendars(accessToken, res) {
  // Load client secrets from a local file.
  fs.readFile("./server/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(JSON.parse(content), accessToken, listEvents, res);
  });
}

function createEvent(accessToken, resource, res) {
  // Load client secrets from a local file.
  fs.readFile("./server/credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Calendar API.
    authorize(
      JSON.parse(content),
      accessToken,
      (oAuth2Client, res) => {
        makeEvent(oAuth2Client, res, resource);
      },
      res
    );
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, accessToken, callback, res) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  oAuth2Client.setCredentials({ access_token: accessToken });
  callback(oAuth2Client, res);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, appres) {
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.list(
    {
      calendarId: "primary",
      maxResults: 25,
      singleEvents: true,
      orderBy: "startTime",
      timeMin: "2021-01-03T10:00:00-07:00",
    },
    (err, res) => {
      if (err)
        return console.log("The google calendar API returned an error: " + err);
      const events = res.data.items;
      if (events.length) {
        let eventList = events.map((event, i) => {
          return {
            start: event.start.dateTime,
            end: event.end.dateTime,
            summary: event.summary, //The title
            status: event.status, //Whether it is confirmed or not
          };
        });
        console.log(eventList);
        appres.send(eventList);
      } else {
        console.log("No upcoming events found.");
      }
    }
  );
}

function makeEvent(auth, appres, resource) {
  console.log(auth);
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.insert(
    {
      calendarId: "primary",
      resource: resource,
    },
    (err, res) => {
      if (err) {
        return console.log("The google calendar API returned an error: " + err);
        appres.send("Error", 404);
      } else {
        appres.send("Saved");
        console.log("Event was saved");
      }
    }
  );
}

function addFreeSlot(auth, appres, resource) {
  console.log(auth);
  const calendar = google.calendar({ version: "v3", auth });
  calendar.events.insert(
    {
      calendarId: "primary",
      resource: resource,
    },
    (err, res) => {
      if (err) {
        return console.log("The google calendar API returned an error: " + err);
      } else {
        appres.send("Saved");
        console.log("Event was saved");
      }
    }
  );
}

module.exports = {
  getCalendars: getCalendars,
  createEvent: createEvent,
};
