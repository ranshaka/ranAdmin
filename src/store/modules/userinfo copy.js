import {
    roles
} from "@/router/role"
import store from "@/store";
import routerList from "@/router/routerExt"
import router from "@/router";
import {
    appLogin
} from "@/axios/request"
import {mergeLocaleMessages}  from "@/common/vuei18n/index"
const state = {
    allRouter: null, // 路由列表
    allMenu: null,  // 菜单列表
    authority: "", // 功能按钮权限
}

const mutations = {
    SET_ALLROUTER: (state, all) => state.allRouter = all,
    SET_MENU: (state, all) => state.allMenu = all,
    SET_AUTHORITY: (state, all) => state.authority = all,
   
}


const actions = {
    // APP Login
    appLogin: async ({
        state,
        commit
    }, data) => {
        try {
            let res = await appLogin()
            await ResetRouter()
            console.log(state.allRouter)
            router.push(state.allRouter[0].path)
        } catch (error){
            console.log(error)
        }

    },
}



/**
 * @description:  初始化  页面刷新 重新匹配路由规则
 * @return {*}
 */
export async function ResetRouter() {
    // 获取角色的菜单选项
    let menu = await getRoleRouter()  // 
    // 平铺序列号路由
    let routerinstall = await routerArrFun()
    //  路由初始化 根据权限匹配对应的路由
    var allRouter = await InitRouter(menu,routerinstall, "", true)
    // 动态加载路由

    console.log(allRouter)
    mergeLocaleMessages(allRouter)
    await addDynamicRoute(allRouter)

    // 如果有404 删除
    if (router.hasRoute('redirectTo404')){
        router.removeRoute('redirectTo404')
    }
    // 添加404
    router.addRoute({
        path: '/:catchAll(.*)',
        name: "redirectTo404",
        redirect: '/error_404',
        hidden: true
    })
    
    store.commit("userinfo/SET_ALLROUTER", allRouter)
    store.commit("userinfo/SET_AUTHORITY", ["A","B","C"])
    store.commit("userinfo/SET_MENU", allRouter[0].children)
    store.commit("baseinfo/SET_ALL_STATUS","")

}






/**
 * @description:  调用接口获取当前角色菜单
 * @return {*}
 */
const getRoleRouter = async () => {
    let role = []
    await appLogin().then((res) => {
        console.log("获取路由成功！")
        role = roles
    })
    return role
}

/**
 * @description:  router4.0 递归添加路由
 * @useroute 路由列表
 * @parent   父级路由
 * @parentname 父级name
 */
const addDynamicRoute = async(useroute, parent,parentname) => {
    for (let i = 0; i < useroute.length; i++) {
        if (parent) {
            // 子路由path 必须加上父级path
            useroute[i].path = '/' + parent + useroute[i].path
            //  parentname 必须是父级的name 
            await router.addRoute(parentname, useroute[i]);
        } else {
            await router.addRoute(useroute[i]);
        }
        if (useroute[i].children && useroute[i].children.length > 0) {
            await addDynamicRoute(useroute[i].children, (parent ? parent + '/' : "") + useroute[i].name,useroute[i].name);
        }
    }
}

/**
 * @description:   初始化平铺路由 方便匹配
 * @return {*}
 */
const routerArrFun = () => {
    const list = routerList
    let arr = []
    list.forEach((item) => arr[item.path] = item)
    return arr
}

/**
 * @description: 路由初始化 根据权限匹配对应的路由
 * @param {*} routerArr   权限列表
 * @param {*} routerinstall   初始化平铺路由 方便匹配
 * @param {*} isPaht   路由模板
 * @param {*} isType   路由规则
 * @return {*}  动态路由列表
 */
const InitRouter = (routerArr,routerinstall, isPaht, isType) => {
    const addRouter = []
    routerArr.forEach((item) => {
        let parentRouter = routerinstall[item.path]
        if(parentRouter){
            if (item && item.children) {
                let routerModel = {
                    ...parentRouter,
                    ...item,
                    title:item.en,
                    path: (isType ? "/" : "") + item.path,
                    //  添加模板
                    component: isPaht ? () => import("@/publicView/publicView.vue") : () => import("@/layout/index.vue"),
                    redirect: "",
                    meta: {
                        cn:item.cn,
                        en:item.en,
                        ... parentRouter.meta,
                    }
                }
                // 递归处理子路由
                routerModel["children"] = InitRouter(item.children,routerinstall, routerModel.path, true)
                // 设置重定向
                routerModel.redirect = isPaht + routerModel.path + routerModel.children[0].path
                return addRouter.push(routerModel)
            }
            addRouter.push({
                cn:parentRouter.meta.title,
                ...parentRouter,
                ...item,
                path: "/" + item.path,
                meta: {
                    ...parentRouter.meta,
                    cn:item.cn,
                    en:item.en,
                }
            })
        }
    })
    return addRouter
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
}    