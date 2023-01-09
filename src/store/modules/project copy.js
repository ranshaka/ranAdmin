import {
    roles
} from "@/router/role"
import store from "@/store";
import routerList from "@/router/routerExt"
import ComponentsView from "@/layout/index"
import router from "@/router";
import {
    appLogin
} from "@/axios/request"

const state = {
    allRouter: null,
    allMenu: null,
    tagView: [],
    activeTagView: "",

}

const mutations = {
    SET_ALLROUTER: (state, all) => state.allRouter = all,
    SET_MENU: (state, all) => state.allMenu = all,
    ADD_TAG_VIEW: (state, tag) => {
        state.activeTagView = tag.path
        console.log(state.activeTagView)
        if (tag.path == "/") return
        if (!state.tagView.some((x) => x.path == tag.path)) {
            state.tagView.push(tag)
        }
    },
    EDIT_TAG_VIEW: (state, tag) => {
        if (state.tagView.some((x) => x.path == tag.path)) {
            state.activeTagView = tag.path
            state.tagView = state.tagView.filter((x) => x.path != tag.path)
        }
        state.activeTagView = tag.path
        state.tagView.push(tag)
    },
    DELETE_TAG_VIEW: (state, index) => {
        if (state.tagView.length <= 1) return;
        state.tagView.splice(index, 1)

        if (index ==state.tagView.length-1   ){
            if(index == 0)index = 1
            state.activeTagView = state.tagView[index - 1].path
            router.push(state.activeTagView)
        }
        
    },
}


const actions = {
    appLogin: async ({
        state,
        commit
    }, data) => {
        try {
            let res = await appLogin()
            console.log(res)
            await ResetRouter()
            console.log(state.allRouter)
            router.push(state.allRouter[0].path)
        } catch (error){
            console.log(error)
        }

    },
}

const ResetRouter = async ({
    state,
    commit
}, id = 1) => {
    // let menu = routerArr
    var allRouter = await ResetRouter()
    console.log(state.allRouter)
    // console.log(store.getters.allRouter)
    // router.push(  store.getters.allRouter[0].path)
    // store.commit("project/SET_ALLROUTER", allRouter)
    router.push(allRouter[0].path)
}


// 匹配添加路由
export async function ResetRouter() {
    let menu = await getRoleRouter()
    var allRouter = await InitRouter(menu, "", true)
    console.log(allRouter)
    // return
    store.commit("project/SET_ALLROUTER", allRouter)
    await addDynamicRoute(allRouter)


    if (router.hasRoute('redirectTo404')){
        router.removeRoute('redirectTo404')
    }
    
    router.addRoute({
        path: '/:catchAll(.*)',
        name: "redirectTo404",
        redirect: '/error_404',
        hidden: true
    })
    store.commit("project/SET_ALLROUTER", allRouter)
    store.commit("project/SET_MENU", allRouter[0].children)

    // store.commit("project/EDIT_TAG_VIEW", allRouter[0].children[0])
    // return allRouter
}

// 调用接口获取当前角色菜单
const getRoleRouter = async () => {
    let role = []
    await appLogin().then((res) => {
        console.log("获取路由成功！")
        role = roles
    })
    return role
}

// router4.0 递归添加路由
const addDynamicRoute = (useroute, parent) => {
    for (let i = 0; i < useroute.length; i++) {
        if (parent) {
            useroute[i].path = '/' + parent + useroute[i].path
            router.addRoute(parent, useroute[i]);
            console.log(parent,useroute[i].path)
        } else {
            router.addRoute(useroute[i]);
        }
        if (useroute[i].children && useroute[i].children.length > 0) {
            addDynamicRoute(useroute[i].children, (parent ? parent + '/' : "") + useroute[i].name);
        }
    }
}

const routerArrFun = () => {
    const list = routerList
    let arr = []
    list.forEach((item) => arr[item.path] = item)
    return arr
}

//  动态匹配生成路由
const InitRouter = (routerArr, isPaht, isType) => {
    let routerActive = routerArrFun()
    const addRouter = []
    routerArr.forEach((item) => {
        let parentRouter = routerActive[item.path]
        if (item && item.children) {
            let routerModel = {
                ...parentRouter,
                path: (isType ? "/" : "") + item.path,
                component: isPaht ? () => import("@/layout/publicView.vue") : () => import("@/layout/index.vue"),
                name: item.name,
                redirect: "",
                meta: {
                    title: parentRouter.title,
                    // title:activeRouter.meta.name
                }
            }
            routerModel["children"] = InitRouter(item.children, routerModel.path, true)
            routerModel.redirect = isPaht + routerModel.path + routerModel.children[0].path
            return addRouter.push(routerModel)
        }
        addRouter.push({
            ...parentRouter,
            // ...activeRouter,
            path: "/" + item.path,
            name: item.name,
            meta: {
                title: parentRouter.title,
                // ...parentRouter.meta,
                // title:activeRouter.meta.name
            }
        })
    })
    return addRouter
}




export default {
    namespaced: true,
    state,
    mutations,
    actions
}