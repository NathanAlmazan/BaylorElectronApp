const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const axios = require('axios');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    show: false,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      contextIsolation: true,
      plugins: true,
      preload: path.join(__dirname, 'preload.js'),
    }
  });

  try {
    const body = JSON.stringify({ city: "Quezon City", province: "Metro Manila" });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      }
    }

    await axios.post('http://192.168.0.106:4000/users/suggestLocation', body, config);

    mainWindow.loadURL('http://192.168.0.106:3000/');
    Menu.setApplicationMenu(null);
    mainWindow.maximize();
    mainWindow.show();


  } catch (err) {
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    Menu.setApplicationMenu(null);
    mainWindow.maximize();
    mainWindow.show();
  }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
ipcMain.handle("relaunch", async (event, args) => {
  console.log(args);
  app.relaunch();
  app.exit();
})