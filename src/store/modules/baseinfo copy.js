/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
import router from "@/router";
console.log(window.localStorage.getItem("modulesSize"))
const state = {
    //  appid
    appId: process.env.VUE_APP_ID,   
    //  菜单类型
    appName: process.env.VUE_APP_NAME,  
    //  国际化语言
    locales:window.localStorage.getItem("locales")=="" || window.localStorage.getItem("locales")=="zh-cn"?"zh-cn":'en',  
     //  菜单类型
    isMenu: window.localStorage.getItem("isMenu") =='' || window.localStorage.getItem("isMenu")=="true"?true:false, 
     //  项目主题
    themes: window.localStorage.getItem("themes") =='' || window.localStorage.getItem("themes")=="defaultTheme"?"defaultTheme":"darkTheme", 
    // 面包屑
    isBreadcrumb: window.localStorage.getItem("isBreadcrumb") =='' || window.localStorage.getItem("isBreadcrumb")=="true"?true:false, 
    // 历史菜单
    isPathbar: true, 
    // 系统设置方向
    direction:window.localStorage.getItem("direction") =='' || window.localStorage.getItem("direction")=="true"?true:false, 
    // 全局组件大小
    // modulesSize:window.localStorage.getItem("modulesSize") =='' || window.localStorage.getItem("modulesSize")=="large"?"small":window.localStorage.getItem("modulesSize"), 
    modulesSize:"small", 
    tagView: [], // 历史路由列表
    activeTagView: "", // 当前路由
    authority: "", // 功能按钮权限
}
const mutations = {
    SET_IS_MENU: (state, all) => state.isMenu = all,
    SET_IS_BREADCRUMB: (state, all) => state.isBreadcrumb = all,
    SET_IS_PATH_BAR: (state, all) => state.isPathbar = all,
    SET_DIRECTION: (state, all) => state.direction = all,
    SET_LOCALES: (state, all) => state.locales = all,
    ADD_TAG_VIEW: (state, tag) => { // 添加  tag 菜单
        state.activeTagView = tag.path
        if (tag.path == "/") return
        if (!state.tagView.some((x) => x.path == tag.path)) {
            state.tagView.push(tag)
        }
    },
    EDIT_TAG_VIEW: (state, tag) => { // 替换修改tag 菜单
        if (state.tagView.some((x) => x.path == tag.path)) {
            state.activeTagView = tag.path
            state.tagView = state.tagView.filter((x) => x.path != tag.path)
        }
        state.activeTagView = tag.path
        state.tagView.push(tag)
    },
    DELETE_TAG_VIEW: (state, index) => {  //  删除tag  菜单
        if (state.tagView.length <= 1) return;
        state.tagView.splice(index, 1)
        if (index>=1 && index<=state.tagView.length   ){
            if(index == 0)index = 1
            state.activeTagView = state.tagView[index - 1].path
            router.push(state.activeTagView)
        }
        
    },

    SET_ALL_STATUS:(state,all)=>{
  
    }
}


const actions = {
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}   


const getlocalStorage=(name)=>{
   return window.localStorage.getItem(name)?window.localStorage.getItem(name):false
}