/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import {electronHotupdata} from "electron-hot-updata"
const electronHotupdatas= new electronHotupdata(this)
const path = require('path');
import {
    ipcMain,
    app
} from 'electron'
let mainWindow=null
export function updateAva(windows,provider,Version){
    mainWindow=windows
    // 设置地址
    electronHotupdatas.setProvider(provider)
    // 设置版本号
    electronHotupdatas.setNewVersion(Version)

    //  ***  一般情况下不介意修改地址
    // electron 默认安装在 C:\Program Files\ 目录下   如果热更新地址不对  electronHotupdatas.setBaseUrl 动态修改地址    
    // electronHotupdatas.setBaseUrl(baseUrl)


    // 监听获取版本失败
    electronHotupdatas.on("get-version-failed",(message)=>{
        sendHotUpdateMessage({
            cmd: 'get-version-failed',
            message: message
        })
    })

    // 监听没有新版本
    electronHotupdatas.on("no-new-version",(message)=>{
        sendHotUpdateMessage({
            cmd: 'no-new-version',
            message: message
        })
    })

    // 监听有新版本  可更新
    electronHotupdatas.on("new-version-available",(message)=>{
        sendHotUpdateMessage({
            cmd: 'new-version-available',
            message: message
        })
    })

     // 监听获取版本失败 更新失败
     electronHotupdatas.on("downloaded-failed",(message)=>{
        sendHotUpdateMessage({
            cmd: 'downloaded-failed',
            message: message
        })
     })

    // 监听更新完成
    electronHotupdatas.on("complete-downloaded",(message)=>{
        sendHotUpdateMessage({
            cmd: 'complete-downloaded',
            message: message
        })
    })

    // 跟新完成立即重启程序
    ipcMain.on("relaunch",()=>{
        app.relaunch()
        app.exit()
    })

    // 触发更新事件
    ipcMain.on("start-updata",(message)=>{
       
        electronHotupdatas.startUpdata()
    })

    // 获取跟新进度
    electronHotupdatas.on("downloaded-progressNumber",(message)=>{
        sendHotUpdateMessage({
            cmd: 'downloaded-progressNumber',
            message: message
        })
    })


    // 触发获取新版本事件
    ipcMain.on("startLoop",(message)=>{
       
        electronHotupdatas.startLoop()
    })

}


//给渲染进程发送消息
function sendHotUpdateMessage(text) {
    mainWindow.webContents.send('hotMessage', text)
}
