"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
var _default = [{
  path: "home",
  name: "home",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require('@/layout/index.vue'));
    });
  },
  meta: {
    icon: "",
    title: "测试demo"
  }
}, {
  path: "index",
  name: "index",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/index/index.vue"));
    });
  },
  meta: {
    title: "index"
  }
}, {
  path: "table",
  name: "table",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/table/table.vue"));
    });
  },
  meta: {
    title: "table",
    icon: "#icon-yewuliebiao"
  }
}, {
  path: "eacharts-line",
  name: "eacharts-line",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/echarts/echarts-line.vue"));
    });
  },
  meta: {
    title: "折线图",
    icon: "#icon-zhexiantu"
  }
}, {
  path: "eacharts-pie",
  name: "eacharts-pie",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/echarts/echarts-pie.vue"));
    });
  },
  meta: {
    title: "饼图",
    icon: "#icon-huanxingbingtu"
  }
}, {
  path: "language",
  name: "language",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/language/language.vue"));
    });
  },
  meta: {
    title: "国际化"
  }
}, {
  path: "icon",
  name: "icon",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/icon/icon.vue"));
    });
  },
  meta: {
    title: "图标"
  }
}, {
  path: "watermark",
  name: "watermark",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/watermark/watermark.vue"));
    });
  },
  meta: {
    title: "水印"
  }
}, {
  path: "404",
  name: "404",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/errorView/404.vue"));
    });
  },
  meta: {
    title: "错误页面"
  }
}, {
  path: "405",
  name: "405",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/errorView/405.vue"));
    });
  },
  meta: {
    title: "405"
  }
}, {
  path: "500",
  name: "500",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/errorView/500.vue"));
    });
  },
  meta: {
    title: "500"
  }
}, {
  path: "Excle-import",
  name: "Excle-import",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Excle/Excle-import.vue"));
    });
  },
  meta: {
    title: "Excle-import"
  }
}, {
  path: "Excle-export",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Excle/Excle-export.vue"));
    });
  },
  name: "Excle-export",
  meta: {
    title: "Excle-导出"
  }
}, {
  path: "themes-template",
  name: "themes-template",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/themes/themes-template.vue"));
    });
  },
  meta: {
    title: "主题-模板"
  }
}, {
  path: "themes-dynamic",
  name: "themes-dynamic",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/themes/themes-dynamic.vue"));
    });
  },
  meta: {
    title: "主题-动态"
  }
}, {
  path: "autograph",
  name: "autograph",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/autograph/autograph.vue"));
    });
  },
  meta: {
    title: "电子签名"
  }
}, {
  path: "turntable",
  name: "turntable",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/luckDraw/turntable.vue"));
    });
  },
  meta: {
    title: "转盘抽奖"
  }
}, {
  path: "lattice",
  name: "lattice",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/luckDraw/lattice.vue"));
    });
  },
  meta: {
    title: "九宫格抽奖"
  }
}, {
  path: "map-marker",
  name: "map-marker",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/map/map.vue"));
    });
  },
  meta: {
    title: "地图",
    menu: "x",
    padding: true
  }
}, {
  path: "map-moveTo",
  name: "map-moveTo",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/map/mapMoveTo.vue"));
    });
  },
  meta: {
    title: "车辆轨迹",
    menu: "y"
  }
}, {
  path: "functionView",
  name: "functionView",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/jurisdiction/functionView.vue"));
    });
  },
  meta: {
    title: "功能权限"
  }
}, {
  path: "routerView",
  name: "routerView",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/jurisdiction/routerView.vue"));
    });
  },
  meta: {
    title: "路由权限"
  }
}, {
  path: "Reward",
  name: "Reward",
  component: function component() {
    return Promise.resolve().then(function () {
      return _interopRequireWildcard(require("@/view/Reward/Reward.vue"));
    });
  },
  meta: {
    title: "打赏"
  }
}];
exports["default"] = _default;