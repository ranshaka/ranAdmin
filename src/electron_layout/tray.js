/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
	// 系统托盘
	var appTray = null
    const electron = require('electron');
	const nativeImage = require('electron').nativeImage
    const shell = require('electron').shell
    const ipcMain = electron.ipcMain;

    const Menu = electron.Menu;
    const Tray = electron.Tray;
	let win=null
    const iconPath=__dirname+'\\favicon.ico'  // 如果本地测试没问题  打包之后托盘不显示 100% 就是icon 路径问题  
	const iconFlashPath =__dirname+'\\favicoFlash.ico'
	export function implementSystemTray(APP,WIN) {
		win=WIN
	    appTray = new Tray(iconPath) // 创建与image关联的图标
	    var contextMenu = Menu.buildFromTemplate([ // 创建菜单
	        {
	            label: '给主程序发送消息',
	            click: function () {
					win.webContents.send('accept-tray-messages', "托盘发送得消息，点个赞呀，兄弟")
	            }
	        },
			{
	            label: '打开gitee 项目地址',
	            click: function () {
                    shell.openExternal("https://gitee.com/ranshaka/ran-admin")
	            }
	        },
	        {
                label: '打开github 项目地址',
                click: function () {
                    shell.openExternal("https://github.com/ranshaka/ranAdmin")
	            }
	        },
	        {
	            label: '这不得去博客一键三连',
                click: function () {
                    shell.openExternal("https://i.csdn.net/#/user-center/profile?spm=1001.2101.3001.5111")
	            }
	        },
	        {
	            label: '退出程序',
                click: function () {
                    APP.exit(); // 点击之后退出应用
	            }
	        },
	        {
	            label: '关闭托盘',
	            role: 'close',
	            accelerator: 'CmdOrCtrl+Q'
	        }
	    ])

		// 鼠标放在该系统托盘图标上的提示信息                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
	    appTray.setToolTip('被我抓到了把，你现在是不是在查看托盘~') 

	    appTray.setContextMenu(contextMenu)


	    // 消息通知，利用计时器，通过Image实例和空的Image实例 来实现图标闪动效果；
	    let timer = null
	    let msgFlag = false

		// 监听主进程发送消息
	    ipcMain.on('tary-message', (event, arg) => {
			// 鼠标放在该系统托盘图标上的提示信息
			appTray.setToolTip('您有一条新消息'+arg)
	        timer = setInterval(() => {
	            msgFlag = !msgFlag
	            // msgFlag ? appTray.setImage(new Tray(iconPath) ) : appTray.setImage(new Tray(iconFlashPath) )  
				msgFlag ? appTray.setImage(nativeImage.createEmpty()) : appTray.setImage(iconFlashPath)
	            
	        }, 500)
	    })
	

		// 单击该系统托盘图标，显示隐藏窗口
	    appTray.on('click', (_event, _bounds, _position) => { 
	            clearInterval(timer)
	            timer = null
	            msgFlag = false
				appTray.setImage(iconPath)

	        if (win.isVisible()) {
	            win.hide()
	        } else {
	            win.show()
	        }
	    }) 

	
	}