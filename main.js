const { app, BrowserWindow } = require('electron')
require('./server/index.js');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  // win.loadFile('index.html')
  win.setResizable(true);
  win.isResizable(true);
  win.setMenuBarVisibility(false);
  win.loadURL('http://localhost:3001');
}

app.whenReady().then(createWindow)