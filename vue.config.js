/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
const path = require('path')
const fs = require('fs');
const {
	getThemeVariables
} = require('ant-design-vue/dist/theme');

function resolve(dir) {
	return path.join(__dirname, dir)
}
const port = 8848 // 服务端口号
const outputDirName = 'frame-template'
const AppName = process.env.VUE_APP_NAME

function AddZero(time) {
	if (time < 10) {
		return "0" + time
	} else {
		return time
	}
}
let packageTxt = fs.readFileSync('./package.json', 'utf8');
let versionData = packageTxt.split('\n');
let packageJson = JSON.parse(packageTxt);
let VersionArr = packageJson.version.split('.');
let date = new Date();
let today = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate())
if (today == VersionArr[1]) {
	VersionArr[2] = parseInt(VersionArr[2]) + 1
} else {
	VersionArr[1] = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate())
	VersionArr[2] = 1;
}
let versionLine = VersionArr.join('.');
for (let i = 0; i < versionData.length; i++) {
	if (versionData[i].indexOf('"version":') != -1) {
		versionData.splice(i, 1, '  "version": "' + versionLine + '",');
		break;
	}
}
fs.writeFileSync('./package.json', versionData.join('\n'), 'utf8');


module.exports = {
	chainWebpack(config) {
		//标题
		config.plugin('html').tap((args) => {
			args[0].title = AppName;
			return args;
		})
		const svgRule = config.module.rule('svg') // 找到svg-loader
		svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
		svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
		svgRule // 添加svg新的loader处理
		  .test(/\.svg$/)
		  .use('svg-sprite-loader')
		  .loader('svg-sprite-loader')
		  .options({
			symbolId: 'icon-[name]',
		  })
		// 修改images loader 添加svg处理
		const imagesRule = config.module.rule('images')
		imagesRule.exclude.add(resolve('src/common/svg'))
		config.module
		  .rule('images')
		  .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
	},
	// 关闭语法检查
	lintOnSave: false,
	// 基本路径   整个文件夹在哪
	//publicPath: process.env.NODE_ENV === 'production' ? '/static/' : './',
	publicPath: "./",

	// 输出文件目录   文件夹名
	outputDir: outputDirName,

	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。  资源放的目录
	assetsDir: "public",

	// 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径  index的路径和名字
	indexPath: "./index.html",

	/* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，
	    可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) --默认为true */
	filenameHashing: true,

	// 运行时版本是否需要编译
	runtimeCompiler: true,

	// eslint-loader 是否在保存的时候检查
	lintOnSave: false,

	// 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
	productionSourceMap: false,

	//开发环境配置，跨域以及端口号，是否可被其他地址访问等
	devServer: {
		// true 则热更新，false 则手动刷新，默认值为 true
		inline: true,
		// * 自动打开浏览器 */
		open: true,
		// 限定ip访问  0.0.0.0  表示不限制
		host: "0.0.0.0",
		//服务端口号
		port: port,
		//  是否https
		https: false,
		// 启用Hot Module Replacement，当编译失败时，不刷新页面。
		hotOnly: true,
		// 在浏览器上全屏显示编译的errors或warnings。
		overlay: {
			warnings: false,
			errors: true
		},
	},
	css: {

		loaderOptions: { // 向 CSS 相关的 loader 传递选项
			less: {
				// lessOptions: {

				// modifyVars:getThemeVariables({
				//             dark: true, // 开启暗黑模式
				//           }),
				javascriptEnabled: true, // 解决ant-design less 报错 .bezierEasingMixin

				// }

			}
		}
	},
	// 简单配置webpack
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		resolve: {
			alias: {
				'@': resolve('src')
			}
		},
		module: {
			rules: [
				// {
				//     test: /\.(js|vue)$/,
				//     loader: 'eslint-loader',
				//     enforce: 'pre',
				//     include: [resolve('src'), resolve('test')],
				//     options: {
				//         formatter: require('eslint-friendly-formatter')
				//     }
				// }
			]
		}
	},

	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'less',
			patterns: [path.resolve(__dirname, '@/common/css/common.less')]
		},
		electronBuilder: {

			// List native deps here if they don't work
			// 原生包必须这里声明下
			externals: ["serialport"],
			//   If you are using Yarn Workspaces, you may have multiple node_modules folders
			//   List them all here so that VCP Electron Builder can find them
			nodeModulesPath: ["../../node_modules", "./node_modules"],
			nodeIntegration: true,
			// 打包配置
			builderOptions: {

				"appId": AppName,

				// 发布者名称
				productName: AppName,

				// 安装包名称，可自行配置
				artifactName: AppName + '.exe',

				nsis: {

					// "guid": "YOUR GUID",
					// "include": "./installer.nsh",
					// "guid": "com.net.app",
					// "include": "build/installer.nsh",
					// 一键安装，如果设为true，nsis设置就无意义请直接删除 nsis 配置
					oneClick: false,
					// true全用户安装【目录为：C:\Program Files (x86)】，false安装到当前用户
					perMachine: true,
					// 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
					allowElevation: true,
					// 允许修改安装目录
					allowToChangeInstallationDirectory: true,
					// 创建桌面图标
					createDesktopShortcut: true,
					// 创建开始菜单图标
					createStartMenuShortcut: true,
					// 快捷方式的名称,默认为应用程序名称
					shortcutName: AppName,
					// 是否在卸载时删除应用程序数据
					deleteAppDataOnUninstall: true,
					// 指定要包含 nsis 的脚本，基于内置的nsis脚本进一步扩展
					// for win - 将协议写入主机的脚本
					include: `src/urlProtoco.nsh`
				},
				protocols: [ // for macOS - 用于在主机注册指定协议
					{
						// "name":   process.env.VUE_APP_SIGN,
						"name": "ranAdmin",
						"schemes": [
							"ranAdmin"
						]
					}
				],
				//  files: [
				//      {
				//        'filter': ['**/*']
				//      }
				//    ],
				//    extraFiles: ['./extensions/'],
				//  asar: true,
				publish: [{
					"provider": "generic",
					url: "http://192.168.0.191/electron/" // 更新文件服务器地址
				}],
				"win": { //  win相关配置
					"requestedExecutionLevel": "highestAvailable"

				},
			}
		}
	}
}