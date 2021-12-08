const {
    contextBridge,
    ipcRenderer
} = require("electron"); 

contextBridge.exposeInMainWorld("baylorApp", {
    relaunch: (arg) => ipcRenderer.invoke("relaunch", arg)
});