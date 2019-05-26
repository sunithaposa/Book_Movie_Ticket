/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const functions = require('firebase-functions');
const {google} = require('googleapis');
const {WebhookClient} = require('dialogflow-fulfillment');

const calendarId ='eifdt6cclsgps56k6teguo3nao@group.calendar.google.com';

const serviceAccount = {
  "type": "service_account",
  "project_id": "book-movie-ticket-f5210",
  "private_key_id": "acb8f2f53b3570d44eb7e2034dc457795e09e86d",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDJMGnyV1lut23w\nMOvxWKyyqLCPBXROAcrjv4/lCOk/Z2OyzU29RWiAjqNKPLd44Cy2Vae205QRidPJ\nJPDuZTqG3ATAfTD4uRByPq8okrUoI+8YUr/YiXaWL9OiP9vz/rMRNTDnPveiARVc\n0OElkC0SxrKq9vd2FeBNAq3QZ519RxAi6x1XdBE6yQ1rmKtNj2BZP69LAcxV+Zrm\nrPZeTj1za9www8/rNyGk5DERJT7w1sAKiMPEJgpYwyu48kPY1tyOn0OnUnYOJebG\nNXxFtoYfAOa1pwPV0QRJEDx5IJ5no3N+CPZFoDDJCmQMah6XuzXLZq+hERU2qX4Y\nu+sWCGhTAgMBAAECggEAHt1Eg58O40NUpFJ8/8uAwu/KFkbZ7tWrkIDkzFgvoEB2\nNQn18SFixMYdGthxtSN++IHvdsbComYojWUTaR8yeVnriLQr/Rw2/6/KI0lObVgF\n6A9ZyxhbjvLLXsq5LZdXVT55wCAS0VGlO1X4FFEn+QduhXfZws3cWTQeAijDKmKk\n3m0e0LrqeHgHLkE1Q+VKEDO6kZTJhao6hUDwq10x66mJ0QNRTlR8KxQ5ESjwXYlH\nmElhFvZmcXIx0C4uwlt1vEZ/zaIkaW21pRn1asj2DfCZYqhcU86dIrh3wZIiN0G2\nFI3LFWKHtUnWCSwW0gkm1P+wS2sZSf9bK9WwWOHogQKBgQDlEnvqjxkjxHYS99AR\nsxVikPdWmwh4egnDZi4MF4xT7u5KY7D4ZzTiIaRQrTqRD/IdskN7FgrPil0+ywti\nmtXpXg+qPA5QnkGcqhnWURkSL33K7dyNf8z6qXbJNmdtzz2ZZULWp846K8P/EmQr\ne3D89SojrFgI2FrkrUg3pSpWYQKBgQDg1taleDTBEj5p3nYqJsLDo5IrBnYDyyNS\nf77hABO3SJ3RfoSzuW83BPIPNMKP+TGAiqleD1XPAH37ILmicBu78VtmL2E5J+5/\ngm0qfo+uhv9U7+0d+hJ57hW+/DHwPdrk/OvRNoDP3XO8InRa8YN9lO/5NnuDTSD9\n3Uxh2DATMwKBgBksWNXD9/1IP7mB5imrxnPYfnXT/7BNqPkCJ5lIlTE8Fo+yOOZz\nYQpgrA/5mXALko3U4zmJiJKaH/kgkxW48jz9Czen9eLCIW+3+bLlop2u/mHolc4u\n9zWsndMq2V7l4V0UFa5FLpKR8K39NWjZ3ebOglz9OYdvTz3GFSOYUPjBAoGAAL6V\nXVzlh9IgpMcYyxDvyigLftr5nw+YIVjM7//JEO1LoHrzw4iUprD8gDJjhoiDsnJD\nF02jshjFUgSMuM34OYoWDGORxdetAX0UEXTz0tcdl1FoDpZaY073gXdiTvJVfDae\nLUYp7QZFsNTIX9i2376TgNa+V/P0bQLDkvtdRWMCgYEAi8k8+hE1e5Y0IjvvwJf3\n0HG8x0eketORbsXzHOGN1hZ7vmn3QlkzLzaS2E5874oimE9klgL4E93KInboIubm\nyod9CKfii0UKhypo7wd7Yt5U8333eYil5CqWUa5C+tOUDEEItYDO+mSHEH9EIopO\nINoMJRBsZgXx39gHTWdVDQM=\n-----END PRIVATE KEY-----\n",
  "client_email": "book-movie-ticket@book-movie-ticket-f5210.iam.gserviceaccount.com",
  "client_id": "101442887921316887266",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/book-movie-ticket%40book-movie-ticket-f5210.iam.gserviceaccount.com"
};

// Set up Google Calendar service account credentials
const serviceAccountAuth = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: 'https://www.googleapis.com/auth/calendar'
});

const calendar = google.calendar('v3');
process.env.DEBUG = 'dialogflow:*'; // It enables lib debugging statements

const timeZone = 'Asia/Colombo';  // Change it to your time zone
const timeZoneOffset = '+05:30';         // Change it to your time zone offset

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });

  function makeAppointment (agent) {
    // Use the Dialogflow's date and time parameters to create Javascript Date instances, 'dateTimeStart' and 'dateTimeEnd',
    // which are used to specify the appointment's time.
    const appointmentDuration = 1;// Define the length of the appointment to be one hour.
    //const dateTimeStart='2019-05-24T23:30:00';
    const dateTimeStart = convertParametersDate(agent.parameters.date, agent.parameters.time);
    const number = agent.parameters.number;
    const dateTimeEnd = addHours(dateTimeStart, appointmentDuration);
    const appointmentTimeString = getLocaleTimeString(dateTimeStart);
    const appointmentDateString = getLocaleDateString(dateTimeStart);
    const randomnum=randomIntInc(100000, 999999);
    // Check the availability of the time slot and set up an appointment if the time slot is available on the calendar
    return createCalendarEvent(dateTimeStart, dateTimeEnd).then(() => {
      agent.add(`Got it. We have your booking on ${dateTimeStart} for ${number} people and your reference number is ${randomnum}. thank you. `);
    }).catch(() => {
      agent.add(`Sorry, we're booked on ${dateTimeStart} . Is there anything else I can do for you?`);
    });
  }
  let intentMap = new Map();
  intentMap.set('Make_Booking', makeAppointment);  // It maps the intent 'Make Appointment' to the function 'makeAppointment()'
  agent.handleRequest(intentMap);
});

function createCalendarEvent (dateTimeStart, dateTimeEnd) {
  return new Promise((resolve, reject) => {
    calendar.events.list({  // List all events in the specified time period
      auth: serviceAccountAuth,
      calendarId: calendarId,
      timeMin: dateTimeStart.toISOString(),
      timeMax: dateTimeEnd.toISOString()
    }, (err, calendarResponse) => {
      // Check if there exists any event on the calendar given the specified the time period
      if (err || calendarResponse.data.items.length > 0) {
        reject(err || new Error('Requested time conflicts with another appointment'));
      } else {
        // Create an event for the requested time period
        calendar.events.insert({ auth: serviceAccountAuth,
          calendarId: calendarId,
          resource: {summary: 'Booking',
            start: {dateTime: dateTimeStart},
            end: {dateTime: dateTimeEnd}}
        }, (err, event) => {
          err ? reject(err) : resolve(event);
        }
        );
      }
    });
  });
}


// A helper function that receives Dialogflow's 'date' and 'time' parameters and creates a Date instance.
function convertParametersDate(date, time){
  return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('+')[0] + timeZoneOffset));
  //return new Date(Date.parse(date.split('T')[0] + 'T' + time.split('T')[1].split('+')[0] + '-' + time.split('T')[1].split('+')[1]));
}

// A helper function that adds the integer value of 'hoursToAdd' to the Date instance 'dateObj' and returns a new Data instance.
function addHours(dateObj, hoursToAdd){
  return new Date(new Date(dateObj).setHours(dateObj.getHours() + hoursToAdd));
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this time in English.
function getLocaleTimeString(dateObj){
  return dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, timeZone: timeZone });
}

// A helper function that converts the Date instance 'dateObj' into a string that represents this date in English. 
function getLocaleDateString(dateObj){
  return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: timeZone });
}
//code for random number generation
function randomIntInc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}