/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
//语言
import { createI18n } from 'vue-i18n'		//引入vue-i18n组件
import store from "@/store";
import ZH from './zh'
import EN from './en'
// import { 引入的组件 export 出来的 变量} from 'vue-i18n'
  //注册i8n实例并引入语言文件
 const i18n = createI18n({
    locale: store.getters.locales,		//默认显示的语言 
    legacy: false, // composition AP
    globalInjection: true, //全局生效$
      messages: {
        'zh-cn':ZH,	//引入语言文件
        'en':EN 
      }
  })

  /**
   * @description:  动态加载 语言包
   * @param {*} routers 菜单列表
   * @return {*} 
   */  
  export const mergeLocaleMessages=(routers)=>{
    const tree = treeToArr(routers);
    if(tree.length){
      let cn=tree[0]
      let en=tree[1]
        i18n.global.mergeLocaleMessage("zh-cn",{
          'menu':{
            ...cn
          }
        })
        i18n.global.mergeLocaleMessage("en",{
          "menu":{
            ...en
          }
        })
    }
} 

/**
 * @description:  递归处理菜单
 * @param {*} arr
 * @param {*} cn
 * @param {*} en
 * @return {*}
 */
const treeToArr=(arr,cn={},en={})=>{
  for(let i=0;i<arr.length;i++){
    cn[arr[i].path]=arr[i].cn
    en[arr[i].path]=arr[i].en
    if(arr[i].children && arr[i].children.length){
      treeToArr(arr[i].children,cn,en)    
  }
  }
  return [cn,en]
}
  export default i18n; //将i18n暴露出去，在main.js中引入挂载
