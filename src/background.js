/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
'use strict'

import {
  app,
  protocol,
  BrowserWindow,
  ipcMain
} from 'electron'
import {
  createProtocol
} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {
  VUEJS3_DEVTOOLS
} from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'


// 自定义托盘
import {
  implementSystemTray
} from './electron_layout/tray.js';
// 自动热更新
import {
  updateAva
} from './hot-updata.js';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])
let mainWindow=null
async function createWindow() {
  // Create the browser window.
  const win = mainWindow = new BrowserWindow({
    width: 1200,
    height: 670,
    minWidth: 600,
    maxWidth: 1920,
    maxHeight: 1200,
    minHeight: 670,
    minWidth: 1200,
    frame: false,  // 是否有边框
    transparent: true,  // 透明度 恤搭配 frame 使用 
    webPreferences: {

      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info

      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      // preload:'./src/preload.js' ,
      preload: __dirname + '\\preload.js',
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) 
    win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
    win.webContents.openDevTools()
    updateAva(win, 'http://192.168.0.191/electron/', app.getVersion());
  }


  // 注册托盘
  implementSystemTray(app, win)
  //  //隐藏菜单
  //   mainWindow.setMenu(null);

  //   //设置全屏
  //   win.setFullScreen(true);

  //  监听web 唤醒 程序
  const gotTheLock = app.requestSingleInstanceLock()
  if (!gotTheLock) {
    app.quit()
  } else {
    // 其他实例启动时，主实例会通过 second-instance 事件接收其他实例的启动参数 `argv`
    app.on('second-instance', (event, argv) => {
      // Windows 下通过协议URL启动时，URL会作为参数，所以需要在这个事件里处理
      if (process.platform === 'win32') {
        const webSgin=argv.filter((a,i)=>i>=1&&a.indexOf(process.env.VUE_APP_NAME)==0)
        if(webSgin && webSgin.length){
          win.webContents.send('accept-tray-messages',"web 唤醒程序发送得消息"+ webSgin[0])
        }
    
      }
    });

    // macOS 下通过协议URL启动时，主实例会通过 open-url 事件接收这个 URL
    app.on('open-url', (event, argv) => {
      const webSgin=argv.filter((a,i)=>i>=1&&a.indexOf(process.env.VUE_APP_NAME)==0)
      if(webSgin && webSgin.length)
     win.webContents.send('accept-tray-messages',"web 唤醒程序发送得消息"+ webSgin[0])
    });
  }


}




// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {

  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()

  _handleAfterReady()
})



/**
 * 添加对协议链接的处理， 用于实现网页调起客户端逻辑
 */
// 当应用启动完成后，主动判断应用是否是从网页中调起
const _handleAfterReady = () => {
  // windows如果是通过url schema启动则发出时间处理
  // 启动参数超过1个才可能是通过url schema启动
  setTimeout(() => {
    if (process.argv.length > 1) {
      if (!app.isReady()) {
        app.once("browser-window-created", () => {
          // app 未打开时，通过 open-url打开 app，此时可能还没 ready，需要延迟发送事件
          // 此段ready延迟无法触发 service/app/ open-url 处理，因为saga初始化需要时间
          app.emit("second-instance", null, process.argv);
        });
      } else {
        app.emit("second-instance", null, process.argv);
      }
    }
  }, 1000);

};




// 窗口全屏
ipcMain.on("winMax",(event,flag)=>{
  if (flag) {
    mainWindow.setContentSize(1200, 670); //重新设置窗口客户端的宽高值（例如网页界面），这里win.setSize(x,y)并不生效。
    mainWindow.center(); // 窗口居中
} else {
    mainWindow.maximize();
}
})

// 窗口缩小 
ipcMain.on("winMin",()=>{
  mainWindow.hide()
})
// 窗口关闭
ipcMain.on("winClose",()=>{
  app.exit()
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}