"use strict";
const electron = require("electron");
const preload = require("@electron-toolkit/preload");
const api = {
  invoke: (channel, ...args) => electron.ipcRenderer.invoke(channel, ...args),
  onMainMessage: (callback) => electron.ipcRenderer.on("main-to-renderer", (_, data) => callback(data))
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", preload.electronAPI);
    electron.contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = preload.electronAPI;
  window.api = api;
}
