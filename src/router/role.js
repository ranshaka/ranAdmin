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
export const roles = [{
    "path": "home",
    "name": "home",
    "en": "default",
    "cn": "默认系统",
    "children": [{
        "path": "index",
        "name": "index",
        "en": "index",
        "cn": "首页",
        "icon": "#icon-shouye",
        "id": "60d33c1b-eb26-798f-f166-20f2f6ed3fd8"
    }, {
        "path": "table",
        "name": "table",
        "en": "table",
        "cn": "表格",
        "icon": "#icon-yewuliebiao",
        "id": "0e3b90d9-d01d-a32c-14e4-bb3272ee8e97"
    }, {
        "path": "echarts",
        "name": "echarts",
        "en": "echarts",
        "cn": "图表",
        "icon": "#icon-map__easyicon",
        "children": [{
            "path": "eacharts-line",
            "name": "eacharts-line",
            "cn": "折线图",
            "en": "eacharts-line",
            "icon": "#icon-zhexiantu",
            "id": "8564e6b8-fff5-9ea1-f1d2-fb2a5c983774"
        }, {
            "path": "eacharts-pie",
            "name": "eacharts-pie",
            "cn": "饼图",
            "en": "eacharts-pie",
            "icon": "#icon-huanxingbingtu",
            "id": "f6730ddd-0b61-88c7-2d99-c3176f0f76b8"
        }],
        "id": "7e0f2917-45fc-7d36-5d91-fe6bb7290622"
    }, {
        "path": "icon",
        "name": "icon",
        "cn": "图标",
        "en": "icon",
        "icon": "#icon-tubiao",
        "id": "3c871908-4f91-dff0-87e9-6579e190162d"
    }, {
        "path": "language",
        "name": "language",
        "cn": "国际化",
        "en": "language",
        "icon": "#icon-diqiu",
        "id": "0330f6b1-8070-c514-840a-a14b933ad934"
    }, {
        "path": "watermark",
        "name": "watermark",
        "cn": "水印",
        "en": "watermark",
        "icon": "#icon-icon_zhutushuiyin",
        "id": "24cd4e08-e689-e854-f058-836d64ba8856"
    }, {
        "path": "errorView",
        "name": "errorView",
        "cn": "错误页面",
        "en": "errorView",
        "icon": "#icon-a-jinzhicuowu",
        "children": [{
            "path": "404",
            "name": "404",
            "cn": "404",
            "en": "404",
            "id": "942f3afb-0f9e-ea68-26f7-bdeea0b64857"
        }, {
            "path": "405",
            "name": "405",
            "cn": "405",
            "en": "405",
            "id": "0b1fd30e-0a2d-862d-0066-f97a098b7351"
        }, {
            "path": "500",
            "name": "500",
            "cn": "500",
            "en": "500",
            "id": "02fa78fb-d186-44d3-29e4-f4feb291d8d2"
        }],
        "id": "65ec4be0-f51f-5de0-4c66-d40afbee24f8"
    }, {
        "path": "Excle",
        "name": "Excle",
        "cn": "表格",
        "en": "Excle",
        "icon": "#icon-biaoge-xlxs_xls",
        "children": [{
            "path": "Excle-import",
            "name": "Excle-import",
            "cn": "Excle-导入",
            "en": "Excle-import",
            "icon": "#icon-shouyetubiao2-19",
            "id": "8dd07c7d-329c-7f52-8fb9-2da3e1771f46"
        }, {
            "path": "Excle-export",
            "name": "Excle-export",
            "cn": "Excle-导出",
            "en": "Excle-export",
            "icon": "#icon-daochuwenjian",
            "id": "ea31b58a-d02e-f539-2a80-fc92d0b4fe79"
        }],
        "id": "3aa51da8-6a5c-1146-d034-5f4a6c12e649"
    }, {
        "path": "themes",
        "name": "themes",
        "cn": "主题",
        "en": "themes",
        "icon": "#icon-mianxingtiaosepan",
        "children": [{
            "path": "themes-template",
            "name": "themes-template",
            "cn": "主题-模板",
            "en": "themes-template",
            "icon": "#icon-biaodanmoban",
            "id": "22d258b8-dcf1-a848-0795-8d05b90467b4"
        }, {
            "path": "themes-dynamic",
            "name": "themes-dynamic",
            "cn": "主题-动态",
            "en": "themes-dynamic",
            "icon": "#icon-gongchengdongtai",
            "id": "d2bbc498-c42e-c927-44bb-d8ba8d35312c"
        }],
        "id": "3696b8ae-2e22-521c-3eeb-b6306ae99a91"
    }, {
        "path": "autograph",
        "name": "autograph",
        "cn": "电子签名",
        "en": "autograph",
        "icon": "#icon-qianming",
        "id": "164ed79a-82f5-1732-810c-2d757b6d3913"
    }, {
        "path": "luckDraw",
        "name": "luckDraw",
        "cn": "抽奖",
        "en": "luckDraw",
        "icon": "#icon-xiadanchoujiang",
        "children": [{
            "path": "turntable",
            "name": "turntable",
            "cn": "转盘- 抽奖",
            "en": "turntable",
            "icon": "#icon-choujiangxianxing",
            "id": "588940be-c5a7-f061-7d25-c79834a5adca"
        }, {
            "path": "lattice",
            "name": "lattice",
            "cn": "九宫格- 抽奖",
            "en": "lattice",
            "icon": "#icon-jiugonggeyanying",
            "id": "82fda110-8169-e1a7-94aa-d14f1b60c111"
        }],
        "id": "92871cb3-af1f-0da1-afdd-6553760348a7"
    }, {
        "path": "map",
        "name": "map",
        "cn": "地图",
        "en": "map",
        "icon": "#icon-map__easyicon",
        "children": [{
            "path": "map-marker",
            "name": "map-marker",
            "cn": "地图",
            "en": "map-marker",
            "icon": "#icon-map_location_",
            "id": "8c657aee-6f19-7965-8f9d-8fcd1cdaa4b4"
        }, {
            "path": "map-moveTo",
            "name": "map-moveTo",
            "cn": "车辆轨迹",
            "en": "map-moveTo",
            "icon": "#icon-iconhuizong_huaban1fuben13",
            "id": "e55aa52a-0040-1c0f-0940-87d5df2321cd"
        }],
        "id": "9cddcc92-8200-0bc6-6e54-fefcf1a4d884"
    }, {
        "path": "jurisdiction",
        "name": "jurisdiction",
        "cn": "权限管理",
        "en": "jurisdiction",
        "icon": "#icon-icon-quanxian",
        "children": [{
            "path": "functionView",
            "name": "functionView",
            "cn": "功能权限",
            "en": "functionView",
            "icon": "#icon-gongneng",
            "id": "498a5540-90a6-e961-cbe4-1e032a5c7bc1"
        }, {
            "path": "routerView",
            "name": "routerView",
            "cn": "路由权限",
            "en": "routerView",
            "icon": "#icon-daolu",
            "id": "a5f5a273-4978-8617-8a27-28edad8240cb"
        }],
        "id": "fad2d7ea-2d9b-6bad-5db6-dcacb0dede69"
    }, {
        "path": "Reward",
        "name": "Reward",
        "cn": "支持作者",
        "en": "Reward",
        "icon": "#icon-dashanghongbao",
        "id": "43675f00-2953-0c9e-2bdc-86750cbe701b"
    }],
    "id": "ef435a43-621c-7523-3d20-edceeae6e50c"
}, {
    "path": "index",
    "name": "index",
    "en": "大屏系统",
    "cn": "大屏系统",
    "children": [{
        "path": "map",
        "name": "map",
        "cn": "地图",
        "en": "map",
        "children": [{
            "path": "map-marker",
            "name": "map-marker",
            "cn": "地图",
            "en": "map-marker",
            "id": "573120df-191e-2319-25ed-2bb5558601f1"
        }, {
            "path": "map-moveTo",
            "name": "map-moveTo",
            "cn": "车辆轨迹",
            "en": "map-moveTo",
            "id": "d675f53e-7594-2b2d-0412-bcb30015fcff"
        }],
        "id": "1bd47d1b-29d2-43e7-0e44-fe05dc3c12a3"
    }],
    "id": "7d53a350-c6da-29aa-a1d8-5a940a928f24"
}, {
    "path": "admin",
    "name": "admin",
    "cn": "管理员系统",
    "en": "admin",
    "id": "8c369fd1-605f-4197-b6a8-29ba166f6df5",
    "children": [{
        "path": "baseInfo",
        "name": "baseInfo",
        "cn": "基础信息",
        "en": "baseInfo",
        "children": [{
            "path": "userInfo",
            "name": "userInfo",
            "cn": "人员管理",
            "en": "userInfo",
            "id": "c86d72e5-7b69-b12b-8c28-6946dc29e608"
        }, {
            "path": "roleInfo",
            "name": "roleInfo",
            "cn": "角色管理",
            "en": "roleInfo",
            "id": "e1b1de9a-bd81-2ad6-5a1d-78db1333635d"
        }],
        "id": "90250f6b-4bfb-7d1d-a7e2-d6495185a67a"
    }, 
    {
        "path": "menu",
        "name": "menu",
        "cn": "菜单管理",
        "en": "menu",
        "id": "14ff1c46-da4e-3e02-b414-9cb436273af3"
    },
    {
        "path": "menuPermission",
        "name": "menuPermission",
        "cn": "权限管理",
        "en": "menu",
        "id": "14ff1c46-da4e-3e02-b414-9cb43612345",
        "children":[
            {
                "path": "menuPermissionUser",
                "name": "menuPermissionUser",
                "cn": "权限管理-用户",
                "en": "menuPermissionUser",
                "id": "14ff1c46-da4e-3e02-b414-9cb436123456",
            },
            {
                "path": "menuPermissionRole",
                "name": "menuPermissionRole",
                "cn": "权限管理-角色",
                "en": "menuPermissionRole",
                "id": "14ff1c46-da4e-3e02-b414-9cb4361234567",
            },
        ]
    },
],

}]