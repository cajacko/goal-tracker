const fetch = require('node-fetch');
const formatDaily = require('./helpers/formatDaily');
const database = require('./database');

function getFormData(id) {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setDate(date.getDate() - 5);

  return fetch(process.env.GOOGLE_SCRIPTS_API_URL, {
    method: 'POST',
    body: JSON.stringify({
      id,
      date: date.getTime(),
    }),
  }).then(res => res.json());
}

function saveFormData(callback) {
  return response =>
    callback(response).then(data => {
      const promises = [];

      Object.keys(data).forEach(day => {
        const ref = `days/${day}`;

        const promise = database()
          .ref(ref)
          .once('value')
          .then(snapshot => Object.assign(snapshot.val() || {}, data[day]))
          .then(finalDay =>
            database()
              .ref(ref)
              .set(finalDay)
              .then(() => [day, finalDay])
          );

        promises.push(promise);
      });

      return Promise.all(promises);
    });
}

function setFormData() {
  return getFormData(process.env.DAILY_METRICS_FORM_ID).then(
    saveFormData(formatDaily)
  );
}

module.exports = setFormData;
