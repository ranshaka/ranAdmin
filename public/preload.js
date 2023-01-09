const electron = require('electron');
window.ipcRenderer = require('electron').ipcRenderer;
window.add=()=>{
    console.log(1213213)
}
console.log(window)
window.remote = require('electron').remote;
