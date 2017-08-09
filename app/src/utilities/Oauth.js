const electronOauth2 = require('electron-oauth2');
const config = require('../config.js');

class Oauth {
  static login() {
    let token;

    const windowParams = {
      alwaysOnTop: true,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
      },
    };
    const scopes = ['repo', 'user:email'];

    const options = {
      scope: scopes.join(' '),
      accessType: 'online',
    };

    const myApiOauth = electronOauth2(config, windowParams);

    return myApiOauth.getAccessToken(options)
      .then((t) => {
        token = t;
        window.localStorage.setItem('githubtoken', token.access_token);
      });
  }

  static logout() {
    window.localStorage.removeItem('githubtoken');
  }

}

module.exports = Oauth;
