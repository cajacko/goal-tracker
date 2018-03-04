const fetch = require('node-fetch');
const formatDaily = require('./helpers/formatDaily');

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
      return data;
    });
}

function setFormData() {
  return getFormData(process.env.DAILY_METRICS_FORM_ID).then(
    saveFormData(formatDaily)
  );
}

module.exports = setFormData;
