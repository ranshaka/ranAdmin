<template>
    <div class=" minHeight100">
        <el-row :gutter="20">
            <el-col :span="12" >
                <div class="padding-2x bg-white">
                    <el-alert title="文件地址 src\router\routerExt.js" type="error" effect="dark" class="margin-bottom-2x"> </el-alert>
                    <el-alert title="支持多个系统，动态切换系统" type="success" effect="dark" class="margin-bottom-2x"> </el-alert>
                <el-alert title="框架定义的路由列表，全部是铺平，可以根据后台接口返回的格式自由搭配组合菜单页面" type="success" effect="dark"> </el-alert>
                <el-input v-model="rolesView" :rows="35" disabled type="textarea" placeholder="Please input" />
                </div>
            </el-col>
            <el-col :span="12" >
                <div class="padding-2x bg-white">
                    <el-alert title="文件地址 src\router\role.js" type="error" effect="dark" class="margin-bottom-2x"> </el-alert>
                    <el-alert title="后台接口返回参数//  序列化格式" type="success" effect="dark" class="margin-bottom-2x"> </el-alert>
                <el-alert title="动态化修改所有配置" type="success" effect="dark"> </el-alert>
                <el-input v-model="roleView" :rows="35" disabled type="textarea" placeholder="Please input" />
                </div>
            </el-col>
        </el-row>


    </div>
</template>

<script>
    import {
        computed,
        defineComponent,
        onMounted, //响应式
        ref,
        watch,
        nextTick
    } from 'vue';
    import {
        useStore
    } from "vuex";
    import {
        roles
    } from "@/router/role"
    import markerInit from "@/view/map/marker.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            markerInit,
        },
        setup() {
            const rolesView = ref(`
            /*
 * @name: 所有路由全部平铺  根据后台返回路由树 动态匹配绑定  返回规则参考 role.js
    {
        path:"home",   // 匹配字段  也可以跟换其他字段 或者uuid 
        name:"home",
        component: () => import('@/layout/index.vue'),
        meta:{
            title:"测试demo",  
        }
    },
 */
            [
    {
    "path": "home",
    "name": "home",
    children: [
        {
            "path": "table",
            "name": "table",
            'en':"table",
            'cn':"表格",
        },
        {
            "path": "echarts",
            "name": "echarts",
            'en':"echarts",
            'cn':"图表",
            "children": [
                {
                    "path": "eacharts-line",
                    "name": "eacharts-line",
                    'cn':"折线图",
                    'en':"eacharts-line",
                },
                {
                    "path": "eacharts-pie",
                    "name": "eacharts-pie",
                    'cn':"饼图",
                    'en':"eacharts-pie",
                },
                {
                    "path": "eacharts-map",
                    "name": "eacharts-map",
                    'cn':"地图",
                    'en':"eacharts-map",
                }
            ]
        },
        {
            path:"language",
            name:"language",
            'cn':"国际化",
            'en':"language",
        },
        {
            path:"watermark",
            name:"watermark",
            'cn':"水印",
            'en':"watermark",
        },
        {
            path:"errorView",
            name:"errorView",
            'cn':"错误页面",
            'en':"errorView",
            "children":[
                {
                    path:"404",
                    name:"404",
                    'cn':"404",
                    'en':"404",
                },
                {
                    path:"405",
                    name:"405",
                    'cn':"405",
                    'en':"405",
                },
            ]
        },
        {
            path:"Excle",
            name:"Excle",
            'cn':"表格",
            'en':"Excle",
            "children":[
                {
                    path:"Excle-import",
                    name:"Excle-import",
                    "cn":"Excle-导入",
                    'en':"Excle-import",
                },
                {
                    path:"Excle-export",
                    name:"Excle-export",
                    "cn":"Excle-导出",
                    'en':"Excle-export",
                },
            ]
        },
        {
            path:"themes",
            name:"themes",
            "cn":"主题",
            'en':"themes",
            "children":[
                {
                    path:"themes-template",
                    name:"themes-template",
                    "cn":"主题-模板",
                    'en':"themes-template",
                },
                {
                    path:"themes-dynamic",
                    name:"themes-dynamic",
                    "cn":"主题-动态",
                    'en':"themes-dynamic",
                },
            ]
        },
        {
            path:"autograph",
            name:"autograph",
            "cn":"电子签名",
            'en':"autograph",
        },
        {
            path:"luckDraw",
            name:"luckDraw",
            "cn":"抽奖",
            'en':"luckDraw",
            "children":[
                {
                    path:"turntable",
                    name:"turntable",
                    "cn":"转盘- 抽奖",
                    'en':"turntable",
                },
                {
                    path:"lattice",
                    name:"lattice",
                    "cn":"九宫格- 抽奖",
                    'en':"lattice",
                },
            ]
        },
        {
            path:"map",
            name:"map",
            "cn":"地图",
            'en':"map",
            "children":[
                {
                    path:"map-marker",
                    name:"map-marker",
                    "cn":"地图",
                    'en':"map-marker",
                },
                {
                    path:"map-moveTo",
                    name:"map-moveTo",
                    "cn":"车辆轨迹",
                    'en':"map-moveTo",
                },
            ]
        },
        {
            path:"routerView",
            name:"routerView",
            "cn":"路由权限",
            'en':"routerView",
        },
    ]
}]`)
            const roleView=`
                
/*
 可以根据后台接口返回路由自由动态设置菜单列表
[
    { // 第一层系统  如果业务只有一个系统 写死也行 去下标0也行 
        "path": "home",  系统名称
        "name": "home",  系统name
        'en':"默认系统",  中文
        'cn':"表格",      英文
        children: [
            {
                "path": "echarts",  路由地址 && 匹配routerExt.JS  路由字段  按业务需求跟换
                "name": "echarts",   路由名称
                'en':"echarts",   配置英文名称
                'cn':"图表",      配置中文名称
                "icon":"#icon-map__easyicon",   图标# 本项目取的iconfont 库图标    可自行更换 // https://www.iconfont.cn
                "children": [  // 子路由
                    {
                        "path": "eacharts-line",
                        "name": "eacharts-line",
                        'cn':"折线图",
                        'en':"eacharts-line",
                        "icon":"#icon-zhexiantu",
                    },
                    {
                        "path": "eacharts-pie",
                        "name": "eacharts-pie",
                        'cn':"饼图",
                        'en':"eacharts-pie",
                        "icon":"#icon-huanxingbingtu",
                    },
                ]
            },
        ]
    }
 */
export const roles = [
    { 
        "path": "home",
        "name": "home",
        'en':"默认系统",
        'cn':"表格",
        children: [
            {
                "path": "index",
                "name": "index", 
                'en':"index",
                'cn':"首页",
                "icon":"#icon-shouye",
            },
            {
                "path": "table",
                "name": "table",
                'en':"table",
                'cn':"表格",
                "icon":"#icon-yewuliebiao",
            },
            {
                "path": "echarts",
                "name": "echarts",
                'en':"echarts",
                'cn':"图表",
                "icon":"#icon-map__easyicon",
                "children": [
                    {
                        "path": "eacharts-line",
                        "name": "eacharts-line",
                        'cn':"折线图",
                        'en':"eacharts-line",
                        "icon":"#icon-zhexiantu",
                    },
                    {
                        "path": "eacharts-pie",
                        "name": "eacharts-pie",
                        'cn':"饼图",
                        'en':"eacharts-pie",
                        "icon":"#icon-huanxingbingtu",
                    },
                ]
            },
            {
                path:"icon",
                name:"icon",
                'cn':"图标",
                'en':"icon",
                "icon":"#icon-tubiao",
            },
            {
                path:"language",
                name:"language",
                'cn':"国际化",
                'en':"language",
                "icon":"#icon-diqiu",
            },
            {
                path:"watermark",
                name:"watermark",
                'cn':"水印",
                'en':"watermark",
                "icon":"#icon-icon_zhutushuiyin",
            },
            {
                path:"errorView",
                name:"errorView",
                'cn':"错误页面",
                'en':"errorView",
                "icon":"#icon-a-jinzhicuowu",
                "children":[
                    {
                        path:"404",
                        name:"404",
                        'cn':"404",
                        'en':"404",
                    },
                    {
                        path:"405",
                        name:"405",
                        'cn':"405",
                        'en':"405",
                    },
                ]
            },
            {
                path:"Excle",
                name:"Excle",
                'cn':"表格",
                'en':"Excle",
                "icon":"#icon-biaoge-xlxs_xls",
                "children":[
                    {
                        path:"Excle-import",
                        name:"Excle-import",
                        "cn":"Excle-导入",
                        'en':"Excle-import",
                        "icon":"#icon-shouyetubiao2-19",
                    },
                    {
                        path:"Excle-export",
                        name:"Excle-export",
                        "cn":"Excle-导出",
                        'en':"Excle-export",
                        "icon":"#icon-daochuwenjian",
                    },
                ]
            },
            {
                path:"themes",
                name:"themes",
                "cn":"主题",
                'en':"themes",
                "icon":"#icon-mianxingtiaosepan",
                "children":[
                    {
                        path:"themes-template",
                        name:"themes-template",
                        "cn":"主题-模板",
                        'en':"themes-template",
                        "icon":"#icon-biaodanmoban",
                    },
                    {
                        path:"themes-dynamic",
                        name:"themes-dynamic",
                        "cn":"主题-动态",
                        'en':"themes-dynamic",
                        "icon":"#icon-gongchengdongtai",
                    },
                ]
            },
            {
                path:"autograph",
                name:"autograph",
                "cn":"电子签名",
                'en':"autograph",
                "icon":"#icon-qianming",
            },
            {
                path:"luckDraw",
                name:"luckDraw",
                "cn":"抽奖",
                'en':"luckDraw",
                "icon":"#icon-xiadanchoujiang",
                "children":[
                    {
                        path:"turntable",
                        name:"turntable",
                        "cn":"转盘- 抽奖",
                        'en':"turntable",
                        "icon":"#icon-choujiangxianxing",
                    },
                    {
                        path:"lattice",
                        name:"lattice",
                        "cn":"九宫格- 抽奖",
                        'en':"lattice",
                        "icon":"#icon-jiugonggeyanying",
                    },
                ]
            },
            {
                path:"map",
                name:"map",
                "cn":"地图",
                'en':"map",
                "icon":"#icon-map__easyicon",
                "children":[
                    {
                        path:"map-marker",
                        name:"map-marker",
                        "cn":"地图",
                        'en':"map-marker",
                        "icon":"#icon-map_location_",
                    },
                    {
                        path:"map-moveTo",
                        name:"map-moveTo",
                        "cn":"车辆轨迹",
                        'en':"map-moveTo",
                        "icon":"#icon-iconhuizong_huaban1",
                    },
                ]
            },
            {
                path:"routerView",
                name:"routerView",
                "cn":"路由权限",
                'en':"routerView",
                "icon":"#icon-daolu",
            },
            {
                path:"Reward",
                name:"Reward",
                "cn":"支持作者",
                'en':"Reward",
                "icon":"#icon-dashanghongbao",
            },
        ]
    },
    {
        "path": "index",
        "name": "index",
        'en':"大屏",
        'cn':"大屏",
        children:[
            {
                path:"map",
                name:"map",
                "cn":"地图",
                'en':"map",
                "children":[
                    {
                        path:"map-marker",
                        name:"map-marker",
                        "cn":"地图",
                        'en':"map-marker",
                    },
                    {
                        path:"map-moveTo",
                        name:"map-moveTo",
                        "cn":"车辆轨迹",
                        'en':"map-moveTo",
                    },
                ]
            },
        ]
    },
    
]
            
            `
            return {
                rolesView,
                roleView

            }
        }
    });
</script>
<style>


</style>