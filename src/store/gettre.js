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
/*
 * @name: name
 * @description: Descriptio * @lastEditors: Francis
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
export default {
    // 系统设置
    appId:state=>state.baseinfo.appId,
    appName:state=>state.baseinfo.appName,
    allloading:state=>state.baseinfo.allloading, // 全局loading
    isMenu:state=>state.baseinfo.isMenu, // 菜单类型
    isPathbar:state=>state.baseinfo.isPathbar, // 历史菜单
    isBreadcrumb:state=>state.baseinfo.isBreadcrumb, // 面包屑
    direction:state=>state.baseinfo.direction, // 系统设置方向
    systemIndex:state=>state.baseinfo.systemIndex, // 系统设置方向
    tagView:state=>state.baseinfo.tagView, // tag 历史菜单
    activeTagView:state=>state.baseinfo.activeTagView, // tag 选中菜单
    locales:state=>state.baseinfo.locales, // 国际化
    themes:state=>state.baseinfo.themes, // 国际化
    modulesSize:state=>state.baseinfo.modulesSize, //  全局组件大小
    themesColor:state=>state.baseinfo.themesColor, //  主题颜色
    fixedTop:state=>state.baseinfo.fixedTop, // 功能权限

    
    // 用户信息
    routerAll:state=>state.userinfo.allRouter,  // 所有路由
    allMenu:state=>state.userinfo.allMenu,    //  菜单列表
    authority:state=>state.userinfo.authority, // 功能权限
   
   
}