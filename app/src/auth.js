const OauthGithub = require('electron-oauth-github');
const Secret = require('./secret.js');

class Auth {
  constructor() {
    this.token = '';
    this.github = new OauthGithub({
      id: Secret.client_id,
      secret: Secret.client_secret,
      scopes: Secret.scopes,
    });
  }

  authenticate() {
    return new Promise((res, rej) => {
      this.github.startRequest(function (access_token, err) {
        if (err) {
          console.error(err);
        }

        console.log(`Retrieved Github token: ${access_token}`);
        this.token = access_token;
      });
    });
  }
}

module.exports = Auth;
