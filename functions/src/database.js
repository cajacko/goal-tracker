const firebase = require('firebase');

var config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  // storageBucket: "<BUCKET>.appspot.com",
};

firebase.initializeApp(config);

module.exports = firebase.database;
