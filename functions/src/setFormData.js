const fetch = require('node-fetch');

function setFormData() {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setDate(date.getDate() - 5);

  return fetch(
    process.env.GOOGLE_SCRIPTS_API_URL,
    {
      method: 'POST',
      body: JSON.stringify({
        id: process.env.DAILY_METRICS_FORM_ID,
        date: date.getTime(),
      }),
    }
  )
    .then(res => res.json());
}

module.exports = setFormData;
