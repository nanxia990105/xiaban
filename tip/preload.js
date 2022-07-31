const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    handleCounter: (callback) => ipcRenderer.on('scheduleJob-small', callback)
})