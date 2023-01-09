/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */
/*
 * @name: 所有路由全部平铺  根据后台返回路由树 动态匹配绑定  返回规则参考 role.js
    {
        path:"home",   // 匹配字段  也可以跟换其他字段 或者uuid 
        name:"home",
        component: () => import('@/layout/index.vue'),
        meta:{
            title:"测试demo",  
          'menu':'y'        固定菜单 y/x  
        'padding':falg        内容padding  
        }
    },
 */
    export default [
        {
            path:"home",
            name:"home",
            component: () => import('@/layout/index.vue'),
            meta:{
                icon:"",
                title:"测试demo",
    
            }
        },
        {
            path:"index",
            name:"index",
            component:()=>import("@/view/index/index.vue"),
            meta:{
                title:"index",
                
            }
        },
        {
            path:"table",
            name:"table",
            component:()=>import("@/view/table/table.vue"),
            meta:{
                title:"table",
                icon:"#icon-yewuliebiao",
            }
        },
    
        {
            path:"eacharts-line",
            name:"eacharts-line",
            component:()=>import("@/view/echarts/echarts-line.vue"),
            meta:{
                title:"折线图",
                icon:"#icon-zhexiantu",
            }
        },
        {
            path:"eacharts-pie",
            name:"eacharts-pie",
            component:()=>import("@/view/echarts/echarts-pie.vue"),
            meta:{
                title:"饼图",
                icon:"#icon-huanxingbingtu",
            }
        },
        {
            path:"language",
            name:"language",
            component:()=>import("@/view/language/language.vue"),
            meta:{
                title:"国际化",
                
            }
        },
        {
            path:"icon",
            name:"icon",
            component:()=>import("@/view/icon/icon.vue"),
            meta:{
                title:"图标",
                
            }
        },
        {
            path:"watermark",
            name:"watermark",
            component:()=>import("@/view/watermark/watermark.vue"),
            meta:{
                title:"水印",
                
            }
        },
        {
            path:"404",
            name:"404",
            component:()=>import("@/view/errorView/404.vue"),
            meta:{
                title:"错误页面",
                
            }
        },
        {
            path:"405",
            name:"405",
            component:()=>import("@/view/errorView/405.vue"),
            meta:{
                title:"405",
                
            }
        },
        {
            path:"500",
            name:"500",
            component:()=>import("@/view/errorView/500.vue"),
            meta:{
                title:"500",
                
            }
        },
        {
            path:"Excle-import",
            name:"Excle-import",
            component:()=>import("@/view/Excle/Excle-import.vue"),
            meta:{
                title:"Excle-import",
                
            }
        },
    
        {
            path:"Excle-export",
            component:()=>import("@/view/Excle/Excle-export.vue"),
            name:"Excle-export",
            meta:{
                title:"Excle-导出",
                
            }
        },
        { 
            path:"themes-template",
            name:"themes-template",
            component:()=>import("@/view/themes/themes-template.vue"),
            meta:{
                title:"主题-模板",
                
            }
        },
        { 
            path:"themes-dynamic",
            name:"themes-dynamic",
            component:()=>import("@/view/themes/themes-dynamic.vue"),
            meta:{
                title:"主题-动态",
                
            }
        },
        { 
            path:"autograph",
            name:"autograph",
            component:()=>import("@/view/autograph/autograph.vue"),
            meta:{
                title:"电子签名",
                
            }
        },
    
        { 
            path:"turntable",
            name:"turntable",
            component:()=>import("@/view/luckDraw/turntable.vue"),
            meta:{
                title:"转盘抽奖",
                
            }
        },
        { 
            path:"lattice",
            name:"lattice",
            component:()=>import("@/view/luckDraw/lattice.vue"),
            meta:{
                title:"九宫格抽奖",
            }
        },
        { 
            path:"map-marker",
            name:"map-marker",
            component:()=>import("@/view/map/map.vue"),
            meta:{
                title:"地图",
                menu:"x",
                padding:true
            }
        },
        { 
            path:"map-moveTo",
            name:"map-moveTo",
            component:()=>import("@/view/map/mapMoveTo.vue"),
            meta:{
                title:"车辆轨迹",
                menu:"y"
            }
        },
        { 
            path:"functionView",
            name:"functionView",
            component:()=>import("@/view/jurisdiction/functionView.vue"),
            meta:{
                title:"功能权限",
            }
        },
        { 
            path:"routerView",
            name:"routerView",
            component:()=>import("@/view/jurisdiction/routerView.vue"),
            meta:{
                title:"路由权限",
            }
        },
        { 
            path:"Reward",
            name:"Reward",
            component:()=>import("@/view/Reward/Reward.vue"),
            meta:{
                title:"打赏",
            }
        },
    ]