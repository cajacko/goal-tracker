const functions = require('firebase-functions');
require('dotenv').config();
const setData = require('./src/setData');

exports.setData = functions.https.onRequest((request, response) => {
  setData()
    .then(json => response.send(JSON.stringify(json)))
    .catch(e => response.send(e.message));
});
