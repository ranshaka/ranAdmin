/*
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
 */

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
                'en':"echarts",   配置 英文名称
                'cn':"图表",      配置 中文名称
                "icon":"#icon-map__easyicon",   图标# 本项目取的iconfont 库图标   可自行更换 // https://www.iconfont.cn
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
                    {
                        path:"500",
                        name:"500",
                        'cn':"500",
                        'en':"500",
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
                        "icon":"#icon-iconhuizong_huaban1fuben13",
                    },
                ]
            },
            {
                path:"jurisdiction",
                name:"jurisdiction",
                "cn":"权限管理",
                'en':"jurisdiction",
                "icon":"#icon-icon-quanxian",
                children:[
                    {
                        path:"functionView",
                        name:"functionView",
                        "cn":"功能权限",
                        'en':"functionView",
                        "icon":"#icon-gongneng",
                    },
                    {
                        path:"routerView",
                        name:"routerView",
                        "cn":"路由权限",
                        'en':"routerView",
                        "icon":"#icon-daolu",
                    },
                ]
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