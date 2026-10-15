const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openPractice: () => ipcRenderer.invoke("open-practice"),
});