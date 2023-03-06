/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import { createApp } from 'vue'

//  代码规范 https://github.com/airbnb/javascript

import "@/assets/iconfont/iconfont.js"

import   "@/common/svg/index"

//国际化
import i18n  from "@/common/vuei18n/index"
// less 公用css
import '@/common/css/common.less'



// 操作权限自定义指令
import directive from '@/utils/directive';

// 引入 adtDesign
import adtDesign from "@/ant-design.js"
import Antd from 'ant-design-vue';

import 'ant-design-vue/dist/antd.variable.min.css'
import "@/common/themes/dark.css"

import App from './App.vue'
import store from './store'
import router from './router'



var VueApp = createApp(App)
            .use(store)
            .use(router)
            .use(directive)
            .use(i18n)
            .use(Antd)
            // .use(adtDesign) // 按需加载
         
          

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
