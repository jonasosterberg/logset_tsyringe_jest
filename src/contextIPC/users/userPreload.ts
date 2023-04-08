import { contextBridge } from 'electron';
import userContext from './userContext';

// Expose a global 'window.api' variable to renderer process.
contextBridge.exposeInMainWorld('api', {
    userContext: userContext,
});