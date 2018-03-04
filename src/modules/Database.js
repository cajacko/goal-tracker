import firebase from "firebase";

class Database {
  constructor() {
    var config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
    };

    firebase.initializeApp(config);

    this.database = firebase.database;
  }

  getDays() {
    return this.database()
      .ref("days")
      .once("value")
      .then(snapshot => snapshot.val());
  }
}

export default new Database();
