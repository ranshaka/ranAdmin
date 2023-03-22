/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import { createApp } from 'vue'



import "@/assets/iconfont/iconfont.js"


//国际化
import i18n  from "@/common/vuei18n/index"
// less 公用css
import '@/common/css/common.css'
import '@/common/css/common.less'


// 操作权限自定义指令
import directive from '@/utils/directive';

import adtDesign from "@/ant-design.js"
import Antd from 'ant-design-vue';

// svg
import   "@/common/svg/index"

// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css'
// import 'ant-design-vue/dist/antd.dark.less';

// import "ant-design-vue/dist/antd.less"
// data-theme="dark"
import "@/common/themes/dark.css"
// import "@/common/themes/default.css"
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
