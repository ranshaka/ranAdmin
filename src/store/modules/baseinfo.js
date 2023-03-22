/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
import router from "@/router";

/**
 * @description:  
 * @param {*} name
 * @param {*} falgTrue 
 * @param {*} falgFalse  
 * @param {*} stringIs  // 是否json 
 * @return {*}
 */
 var getlocalStorage=(name,falgTrue,falgFalse,stringIs)=>{
    if(name  == "themes"){

    }
    let result=null
    let data=window.localStorage.getItem(name)
    if(data=="" || data==null){
        if(falgTrue)result=falgTrue
    }else{
        if(data =='false')return false
        if(falgTrue === true ){
            if(data=="true")  return true 
            return  false
        }else{
            result=data   
        }
    }
    if(stringIs &&  data)return JSON.parse(result)
   return result
}
const state = {
    //  appid
    appId: process.env.VUE_APP_ID,   
    //  菜单类型
    appName: process.env.VUE_APP_NAME,  
    //  国际化语言
    locales:getlocalStorage("locales","zh-cn","en"),  
     //  菜单类型
    isMenu: getlocalStorage("isMenu",true,false), 
     //  项目主题
    themes: getlocalStorage("themes",false,true), 
    // 自定义项目主题
    themesColor:getlocalStorage("themesColor",{
        primaryColor: '#1890ff',
        errorColor: '#ff4d4f',
        warningColor: '#faad14',
        successColor: '#52c41a',
        infoColor: '#909399',
      },false,true), 
    // 面包屑
    isBreadcrumb: getlocalStorage("isBreadcrumb",true,false), 
    // 历史菜单
    isPathbar: true,
    // 系统设置方向
    direction:getlocalStorage("direction",true), 
    // 全局组件大小
    modulesSize:getlocalStorage("modulesSize",'large'), 

    allloading:false, // 全局loading

    fixedTop:getlocalStorage("fixedTop",true,false), // 全局loading

    borderTop:getlocalStorage("borderTop",true,false), // 顶部边框
      

    // 切换系统
    systemIndex:getlocalStorage("systemIndex",0), 
    tagView: [], // 历史路由列表
    activeTagView: "", // 当前路由
    authority: [], // 功能按钮权限
    
}
const mutations = {
    SET_IS_MENU: (state, all) => state.isMenu = all,
    SET_SYSTEM_INDEX: (state, all) => state.systemIndex = all,
    SET_IS_BREADCRUMB: (state, all) => state.isBreadcrumb = all,
    SET_IS_PATH_BAR: (state, all) => state.isPathbar = all,
    SET_DIRECTION: (state, all) => state.direction = all,
    SET_LOCALES: (state, all) => state.locales = all,
    SET_THEMES: (state, all) => state.themes = all,
    SET_THEMES_COLOR: (state, all) => state.themesColor = all,
    SET_MODULES_SIZE: (state, all) => state.modulesSize = all,
    SET_ALL_LOADING: (state, all) => state.allloading = all,
    SET_AUTHORITY: (state, all) => state.authority = all,
    SET_FIXEDTOP: (state, all) => state.fixedTop = all,
    SET_BORDERTOP: (state, all) => state.borderTop = all,

     // 添加  tag 菜单
    ADD_TAG_VIEW: (state, tag) => {
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
    CLEAR_TAG_VIEW: (state, index) => {
        state.tagView=[]
        state.activeTagView=""
        state.systemIndex=index
    },
    SET_ALL_STATUS:(state,all)=>{
  
    }
}

const actions = {
    initRouter({
        state,
        commit
    }, to){
        if(to && to.meta){
            // 判断是否需要锁定菜单
            if(to.meta.menu){
                window.localStorage.setItem("isMenu", to.meta.menu=='y')
                commit('SET_IS_MENU', to.meta.menu=='y');
            }
            
            // 添加历史菜单
            if(to && to.meta && to.meta.title){
                commit("ADD_TAG_VIEW",{
                    path: to.path,
                    name: to.name,
                    ...to.meta
                })
            }
        }

    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}   


