const electron = require('electron');
const electronOauth2 = require('electron-oauth2')
const url = require('url');
const path = require('path');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let token;

const config = require('./config.js')

app.on('ready', () => {
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  }
  let scopes = ["repo", "user:email"];

  const options = {
    scope: scopes.join(" "),
    accessType: 'online'
  }

  const myApiOauth = electronOauth2(config, windowParams);

  myApiOauth.getAccessToken(options)
    .then(t => {
      token = t;
      createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow() {

  mainWindow = new BrowserWindow({ width: 920, height: 800 });

  mainWindow.loadURL(`file://${__dirname}/index.html?access_token=${token.access_token}&token_type=${token.token_type}&scope=${token.scope}`)

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
