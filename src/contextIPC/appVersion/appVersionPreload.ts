import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('appVersionUpdate', {
    getAppVersion(callBack) {
        console.log('The app version')
        ipcRenderer.on('appVersionUpdate', callBack)
    }
})