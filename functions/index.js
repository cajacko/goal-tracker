const functions = require('firebase-functions');
const fetch = require('node-fetch');
require('dotenv').config();

exports.helloWorld = functions.https.onRequest((request, response) => {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setDate(date.getDate() - 5);

  fetch(
    process.env.GOOGLE_SCRIPTS_API_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        id: process.env.DAILY_METRICS_FORM_ID,
        date: date.getTime(),
      }),
    }
  )
    .then(res => res.json())
    .then(json => response.send(JSON.stringify(json)))
    .catch(e => response.send(e.message));
});
