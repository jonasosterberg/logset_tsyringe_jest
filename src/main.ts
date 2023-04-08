import { app, BrowserWindow } from "electron";
import "reflect-metadata"; // Required by TypoORM.

import { createAppWindow } from "./appWindow";
import autoUpdate from 'update-electron-app'
import logger from "./logger";
import init from "./server";

// require('update-electron-app')({
//   repo: 'github-user/repo',
//   updateInterval: '1 hour',
//   logger: require('electron-log')
// })


/**
 * This section is the 'MAIN process hub' in which 'electron' communicate to WINDOW system
 * and acts as a backend unit of the application.
 */

if (require("electron-squirrel-startup")) {
  app.quit();
}

// call to initialize server
init();

app.whenReady().then(() => {
  logger.debug("App started");
  const appWindow = createAppWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createAppWindow();
    }
  });

  autoUpdate({
    updateInterval: '1 hour',
    notifyUser: true
  })
  appWindow.webContents.send('appVersionUpdate', app.getVersion())

})


// /**
//  * Main process communicate to ------> Services(business logics hub)
//  */
// service.userService();


// close window on quit
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
