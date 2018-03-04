const fetch = require('node-fetch');
const queryString = require('query-string');
const database = require('./database');

function saveTokens({ access_token, refresh_token, expires_in }) {
  console.log(config);

  return database()
    .ref('auth/fitbit')
    .set({
      accessToken: access_token,
      refreshToken: refresh_token,
      expires: new Date().getTime() + expires_in * 1000,
    });
}

exports.redirectToAuth = res => {
  let url = 'https://www.fitbit.com/oauth2/authorize?response_type=code';

  const addParam = (key, value) => {
    let data = value;

    if (Array.isArray(data)) {
      data = '';

      value.forEach((item, i) => {
        if (i) data = `${data} `;

        data = `${data}${item}`;
      });
    }

    url = `${url}&${key}=${encodeURIComponent(data)}`;
  };

  addParam('client_id', process.env.FITBIT_CLIENT_ID);
  addParam('redirect_uri', process.env.FITBIT_REDIRECT_URI);
  addParam('expires_in', 31536000);

  addParam('scope', [
    'activity',
    'nutrition',
    'heartrate',
    'location',
    'nutrition',
    'profile',
    'settings',
    'sleep',
    'social',
    'weight',
  ]);

  res.redirect(url);
};

exports.getTokens = req => {
  let formData = '';

  const addParam = (key, value) => {
    let data = value;

    if (Array.isArray(data)) {
      data = '';

      value.forEach((item, i) => {
        if (i) data = `${data} `;

        data = `${data}${item}`;
      });
    }

    formData = `${formData}&${key}=${encodeURIComponent(data)}`;
  };

  addParam('code', queryString.parseUrl(req.originalUrl).query.code);
  addParam('grant_type', 'authorization_code');
  addParam('client_id', process.env.FITBIT_CLIENT_ID);
  addParam('redirect_uri', process.env.FITBIT_REDIRECT_URI);

  return fetch('https://api.fitbit.com/oauth2/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${new Buffer(
        `${process.env.FITBIT_CLIENT_ID}:${process.env.FITBIT_CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  })
    .then(response => response.json())
    .then(response => {
      console.log(new Date());
      console.log(response);

      if (response.errors) {
        console.error(response);
        throw new Error('Error Response');
      }

      return response;
    })
    .then(saveTokens);
};

exports.isAuthenticated = () => {
  return Promise.resolve(false);
};

exports.refreshToken = () => {};
