const setFormData = require('./setFormData');
const setFitbitData = require('./setFitbitData');
const setMyFitnessPalData = require('./setMyFitnessPalData');
const setWithingsData = require('./setWithingsData');

function setData() {
  return Promise.all([
    setFormData(),
    setFitbitData(),
    setMyFitnessPalData(),
    setWithingsData(),
  ]);
}

module.exports = setData;
