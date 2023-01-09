/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

import {createRouter, createWebHashHistory} from 'vue-router'
import store from "@/store";
import {ResetRouter} from "@/store/modules/userinfo";

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


export const publicRoutes = [
    {
        path: '/',
        component: () => import('@/publicView/login/login.vue')
    },
    {
        path: '/error_404',
        component: ()=>import("@/view/errorView/404.vue"),
    },
    {
        path: '/login',
        component: () => import('@/publicView/login/login.vue')
    },

]
const router = createRouter({
    history: createWebHashHistory(),
    routes: publicRoutes
})

router.beforeEach(async(to,from,next)=>{
    NProgress.start()
    // if (!hasNecessaryRoute(to)) {
    //     router.addRoute(generateRoute(to))
    //     // trigger a redirection
    //     return to.fullPath
    //   }
    if(to.path == "/" || to.path=="/login" ) return next()
    store.dispatch("baseinfo/initRouter",to)
    // if (to && to.meta && to.meta.title) {
    //     store.commit("baseinfo/ADD_TAG_VIEW", {
    //         path: to.path,
    //         name: to.name,
    //         ...to.meta
    //     })
    // }
    if(store.getters.routerAll){
        return  next()
    } 
    await ResetRouter(window.localStorage.getItem("systemIndex") || 0)

 
    // next()
    next({
        ...to,
        replace:true
    })
})

router.afterEach(() => {
    NProgress.done()
})
export default router