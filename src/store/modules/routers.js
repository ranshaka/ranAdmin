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
import store from "@/store"
import router from "@/router";


const state = {
    allRouter: [],
    defaultRouter:""
}

const mutations = {
    SET_ALL_ROUTER: (state, all) => state.allRouter = all,
    SET_DEFAULT_ROUTER: (state, data) => state.defaultRouter = data,
}

const actions = {
    getallRouter({
        state,
        commit
    }, data) {
        commit("SET_ALL_ROUTER", data)
        let index=0
        //如果要切换的路由结构
        const thisRouter = state.allRouter[index] || state.allRouter[0]
        //设置路由结构名称，借助router.addRoute() api的name唯一性，清空之前的路由结构
        thisRouter.name = 'renderRoute'
      
        //将当前使用的路由文件设置为当前的激活路由
        // store.commit("SET_ACTIVE_SYS", thisRouter)
        //设置404导航，将所有error页面指向404
        if (router.hasRoute('redirectTo404'))
            router.removeRoute('redirectTo404')
        router.addRoute({
            path: '/:catchAll(.*)',
            name: "redirectTo404",
            redirect: '/error_404',
            hidden: true
        })
        //s
        console.log(thisRouter)
        commit("SET_DEFAULT_ROUTER", thisRouter.path)
        console.log(state.defaultRouter)
        router.push(state.defaultRouter)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}