const electron = require('electron');
const electronOauth2 = require('electron-oauth2');
const path = require('path');
const url = require('url');
const config = require('./config.js');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow (url) {
  let window = new BrowserWindow({width: 800, height: 600});
  window.loadURL(url);
  window.on('closed', function () {
    window = null;
  });

  return window;
}

function authenticate() {
  const myApiOauth = electronOauth2(config, {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  });

  return myApiOauth.getAccessToken({
    scope: 'user notifications',
    accessType: 'online'
  });
}

app.on('ready', () => {
  let token;
  authenticate()
  .then((res) => {
    token = res;
    mainWindow = createWindow(`file://${__dirname}/index.html?access_token=${token.access_token}&token_type=${token.token_type}&scope=${token.scope}`);
  }, (rej) => console.log(rej));
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
})
