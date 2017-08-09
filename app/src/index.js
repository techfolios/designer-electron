const electron = require('electron');
// const electronOauth2 = require('electron-oauth2');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 920, height: 800 });
  // console.log(token);

  mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.webContents.openDevTools(); // REMOVE LATER
  mainWindow.on('closed', () => {
    mainWindow = null;
    app.quit();
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  /* This causes app to close in windows.
   * We need to have a window open at all times, but auth must happen
   * before the app is loaded. */
  // if (process.platform !== 'darwin') {
  //   app.quit();
  // }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
