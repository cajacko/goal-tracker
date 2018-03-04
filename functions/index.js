const functions = require('firebase-functions');
require('dotenv').config();
const setData = require('./src/setData');
const auth = require('./src/auth');

exports.setData = functions.https.onRequest((request, response) => {
  setData()
    .then(json => response.send(JSON.stringify(json)))
    .catch(e => response.send(e.message));
});

exports.auth = functions.https.onRequest((request, response) => {
  auth(request, response)
    .catch(e => response.send(e.message));
});
