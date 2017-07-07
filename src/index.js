const electron = require('electron');
const url = require('url');
const path = require('path');
const Git = require('git.js');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const USERNAME = 'adambutac';

let mainWindow;

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    this.git = new Git(USERNAME);
    this.git.hasGithubPage()
      .then((res) => {
        console.log(res);
        return this.git.cloneGithubPage();
      }, (rej) => {
        console.log(rej);
        return this.git.cloneTechfoliosTemplate();
      });
    createWindow();
  }
});

function createWindow() {

  mainWindow = new BrowserWindow({ width: 920, height: 600 });

  mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      }));
  mainWindow.show();

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}