const oauth = require('electron-oauth-github');
const secure = require('./secure.js');

export class auth {
  client_id     = secure.client_id;
  client_secret = secure.client_secret;
  scopes        = secure.scopes;
  token         = '';

  authenticate() {
    return new Promise((resolve, fail) =>
      github.startRequest(function (access_token, err) {
        if (err) {
          console.error(err);
        }
        token = access_token;
        console.log(token);
    }));
  }
}

module.exports = auth;
