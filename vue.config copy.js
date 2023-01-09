/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
const path = require('path')
const {
  getThemeVariables
} = require('ant-design-vue/dist/theme');


function resolve(dir) {
  return path.join(__dirname, dir)
}
const port = 8848 // 服务端口号
const outputDirName = 'frame-template'
module.exports = {
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
      errors: false
    },
  },
  css: {
  
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        // lessOptions: {
          javascriptEnabled: true,  // 解决ant-design less 报错 .bezierEasingMixin
          modifyVars:{
            '@sadad':"red",
          },
          // modifyVars:getThemeVariables({
          //             dark: false, // 开启暗黑模式
          //           }),
      // }
    }
    }
  },

  // 简单配置webpack
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //         path.resolve(__dirname, './src/assets/style/varibles.less') 
  //     ]
  //   }
  // }
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    module: {

      // rules: [{
      //   test: /\.less$/,
      //   loader: "less-loader", 
      //   use: [
      //     //   {
      //     //   loader: 'style-loader',
      //     // }, {
      //     //   loader: 'css-loader', // translates CSS into CommonJS
      //     // },
      //     {
      //       loader: 'less-loader', // compiles Less to CSS
      //       options: {
      //         // lessOptions: {
      //           // javascriptEnabled: true,
      //             // modifyVars:getThemeVariables({
      //             //     dark: true, // 开启暗黑模式
      //             //   }),
      //           // modifyVars: {
      //           //   '--body-background':"red",
                 
      //           // }
                
      //         // }
      //       },
      //       // javascriptEnabled: true,
      //     }
      //   ],
      //   // {
      //   //     test: /\.(js|vue)$/,
      //   //     loader: 'eslint-loader',
      //   //     enforce: 'pre',
      //   //     include: [resolve('src'), resolve('test')],
      //   //     options: {
      //   //         formatter: require('eslint-friendly-formatter')
      //   //     }
      // }]
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
          path.resolve(__dirname, '@/common/css/common.less'),
        ],
    }
  },
 
}