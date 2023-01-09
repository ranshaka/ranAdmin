/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */


import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import "@/assets/iconfont/iconfont.js"
// import 'element-plus/theme-chalk/dark/css-vars.css'


//国际化
import i18n  from "@/common/vuei18n/index"
// less 公用css
import '@/common/css/common.css'
import '@/common/css/common.less'

console.log(i18n)
// 操作权限自定义指令
import directive from '@/utils/directive';


import App from './App.vue'
import store from './store'
import router from './router'



var VueApp = createApp(App)
            .use(store)
            .use(router)
            .use(ElementPlus)
            .use(directive)
            .use(i18n)

// 屏蔽错误信息
// VueApp.config.errorHandler =()=>null
// VueApp.config.errorHandler = (err) => {
//     console.log(err);
// };
// 屏蔽警告信息
VueApp.config.warnHandler  =()=>null
// VueApp.config.warnHandler = (message) => {
//     console.log(message);
// };

VueApp.mount('#app')
