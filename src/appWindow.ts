import { app, BrowserWindow, ipcMain } from "electron";

const isDevelopment = !app.isPackaged;
console.log('The application is in development mode', isDevelopment)

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

export function createAppWindow(): BrowserWindow {
  appWindow = new BrowserWindow({
    width: 1600,
    height: 800,
    backgroundColor: "#FFF",
    show: true,
    frame: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  if (isDevelopment) {
    appWindow.webContents.openDevTools();
  }

  appWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);


  ipcMain.on("minimizeApp", () => {
    appWindow.minimize();
  });

  ipcMain.on("maximizeRestoreApp", () => {
    if (appWindow.isMaximized()) {
      appWindow.restore();
    } else {
      appWindow.maximize();
    }
  });

  appWindow.on("maximize", () => {
    appWindow.webContents.send("windowState", "maximized");
  });

  appWindow.on("unmaximize", () => {
    appWindow.webContents.send("windowState", "restored");
  });

  ipcMain.on("closeApp", () => {
    appWindow.close();
  });

  appWindow.on("ready-to-show", () => appWindow.show());

  appWindow.on("close", () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}
