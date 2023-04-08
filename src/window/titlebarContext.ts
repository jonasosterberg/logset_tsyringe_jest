import { ipcRenderer } from 'electron';


const titlebarContext = {
  minimize(): void {
    ipcRenderer.send('minimizeApp');
  },
  maximizeRestore(): void {
    ipcRenderer.send('maximizeRestoreApp');
  },
  close(): void {
    ipcRenderer.send('closeApp');
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onWindowState: (callback: any) => ipcRenderer.on('windowState', callback)
};

export type TitlebarContextApi = typeof titlebarContext;

export default titlebarContext; 