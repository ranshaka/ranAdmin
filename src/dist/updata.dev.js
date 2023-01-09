"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateHandle = updateHandle;

var _electronUpdater = require("electron-updater");

var _electron = require("electron");

var mainWindow = null;
_electronUpdater.autoUpdater.autoDownload = false;
var canQuit = false;

function updateHandle(window, feedUrl) {
  mainWindow = window;
  var message = {
    error: '检查更新出错',
    checking: '正在检查更新……',
    updateAva: '检测到新版本，正在下载……',
    updateNotAva: '现在使用的就是最新版本，不用更新'
  }; //设置更新包的地址

  _electronUpdater.autoUpdater.setFeedURL(feedUrl); //监听升级失败事件


  _electronUpdater.autoUpdater.on('error', function (error) {
    sendUpdateMessage({
      cmd: 'error',
      message: error
    });
  }); //监听开始检测更新事件


  _electronUpdater.autoUpdater.on('checking-for-update', function (message) {
    sendUpdateMessage({
      cmd: 'checking-for-update',
      message: message
    });
  }); //监听发现可用更新事件


  _electronUpdater.autoUpdater.on('update-available', function (message) {
    sendUpdateMessage({
      cmd: 'update-available',
      message: message
    });
  }); //监听没有可用更新事件


  _electronUpdater.autoUpdater.on('update-not-available', function (message) {
    sendUpdateMessage({
      cmd: 'update-not-available',
      message: message
    });
  }); // 更新下载进度事件


  _electronUpdater.autoUpdater.on('download-progress', function (progressObj) {
    sendUpdateMessage({
      cmd: 'download-progress',
      message: progressObj
    });
  });

  _electronUpdater.autoUpdater.on('close', function (event) {
    if (!canQuit) {
      mainWindow.hide();
      mainWindow.setSkipTaskbar(true);
      event.preventDefault();
    }
  }); //监听下载完成事件


  _electronUpdater.autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl) {
    sendUpdateMessage({
      cmd: 'update-downloaded',
      message: {
        releaseNotes: releaseNotes,
        releaseName: releaseName,
        releaseDate: releaseDate,
        updateUrl: updateUrl
      }
    }); //退出并安装更新包

    if (process.platform !== 'darwin') {
      canQuit = true;

      _electronUpdater.autoUpdater.quitAndInstall();
    } // autoUpdater.quitAndInstall();

  }); //接收渲染进程消息，开始检查更新


  _electron.ipcMain.on("checkForUpdate", function (e, arg) {
    //执行自动更新检查
    // sendUpdateMessage({cmd:'checkForUpdate',message:arg})
    if (arg) {
      _electronUpdater.autoUpdater.autoDownload = true;
    }

    _electronUpdater.autoUpdater.checkForUpdates();
  });
} //给渲染进程发送消息


function sendUpdateMessage(text) {
  mainWindow.webContents.send('message', text);
}