const electron = require('electron')
const electronOauth2 = require('electron-oauth2')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

var config = {
    clientId: '4578d8f7380fb75dcfc6',
    clientSecret: '0e3e90b709d2efae7e7b0ca48e12f3d06efca68a',
    authorizationUrl: 'https://github.com/login/oauth/authorize',
    tokenUrl: 'https://github.com/login/oauth/access_token',
    useBasicAuthorizationHeader: false,
    redirectUri: 'http://localhost'
};

function createWindow (token) {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html?access_token=${token.access_token}&token_type=${token.token_type}&scope=${token.scope}`)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', () => {
  const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false
    }
  }
  let scopes = ["user:email", "notifications"];

  const options = {
    scope: scopes.join("%20"),
    accessType: 'offline'
  };

  const myApiOauth = electronOauth2(config, windowParams);

  myApiOauth.getAccessToken(options)
    .then(token => {
      // use your token.access_token
      console.log(token)
      createWindow(token);

      // myApiOauth.refreshToken(token.refresh_token)
      //   .then(newToken => {
      //     //use your new token
      //   });
    });
});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
