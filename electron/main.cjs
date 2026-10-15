const { app, BrowserWindow, ipcMain } = require("electron");
const { execFile } = require("child_process");
const path = require("path");

let mainWindow;

const isDev = !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("✅ Electron UI Loaded");
  });

  mainWindow.webContents.on("did-fail-load", (_, errorCode, errorDesc) => {
    console.log("❌ Failed loading:", errorCode, errorDesc);
  });

  mainWindow.webContents.on("console-message", (_, level, message) => {
    console.log("Renderer:", message);
  });
}

// باز کردن Practice.exe
ipcMain.handle("open-practice", async () => {
  let exePath;

  if (isDev) {
    // مسیر فایل هنگام npm run electron
    exePath = path.join(
      app.getAppPath(),
      "public",
      "Practice",
      "Practice.exe"
    );
  } else {
    // مسیر فایل بعد از Build
    exePath = path.join(
      process.resourcesPath,
      "Practice",
      "Practice.exe"
    );
  }

  console.log("🚀 Opening:", exePath);

  execFile(exePath, (error) => {
    if (error) {
      console.error("❌ Practice launch error:", error);
      return;
    }

    console.log("✅ Practice started");

    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.close();
    }

    app.quit();
  });
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});