const functions = require('firebase-functions');
require('dotenv').config();
const setFormData = require('./src/setFormData');

exports.setFormData = functions.https.onRequest((request, response) => {
  setFormData()
    .then(json => response.send(JSON.stringify(json)))
    .catch(e => response.send(e.message));
});
