const { redirectToAuth, getTokens, isAuthenticated } = require('./fitbit');

function auth(req, res) {
  return isAuthenticated().then(authenticated => {
    if (authenticated) {
      res.send('Authenticated with fitbit');
      return true;
    }

    if (req.originalUrl.includes('/fitbit')) {
      return getTokens(req).then(json => res.send(JSON.stringify(json)));
    }

    redirectToAuth(res);

    return false;
  });
}

module.exports = auth;
