const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("node:path");
const fs = require("fs");

console.log("STARTED");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

ipcMain.on("saveText", (err, val) => {
  let date = new Date().getTime();
  let filePath = path.join(__dirname, `${date}.txt`);
  fs.writeFile(filePath, val.toString(), (e) => {
    if (!e) {
      console.log("FILE UPLOADED");
      shell.openPath(filePath);
    } else console.log("ERROR" + " " + e.toString());
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
