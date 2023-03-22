<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://s1.ax1x.com/2023/03/09/ppnZgg0.jpg" alt="Project logo"></a>
</p>

<h3 align="center">ranAdmin</h3>

<div align="center">

[![Status](https://img.shields.io/badge/csdn-@ranshakalove-aqua.svg)](https://i.csdn.net/#/user-center/profile?spm=1011.2415.3001.5111)
[![Status](https://gitee.com/ranshaka/ran-admin/badge/star.svg?theme=dark)](https://gitee.com/ranshaka/ran-admin)
[![](https://img.shields.io/github/stars/ranshaka/ranAdmin?style=social)](https://github.com/ranshaka/ranAdmin)


</div>

   <br> 

---
<br> 
<div align="center">

[![trophy](https://github-profile-trophy.vercel.app/?username=ranAdmin&theme=onedark)](https://github.com/ryo-ma/github-profile-trophy)

![:Augenestern-creator](https://count.getloli.com/get/@:ran-admin?theme=gelbooru)

</div>
   <br> 


---
   <br> 



## 🧐 About <a name = "about"></a>

vue3.0 后台管理模板;

有4个版本  

vue3 + ant-design 

vue3 + ant-design + electron 

vue3 + element-plus

vue3 + element-plus  + electron 


electron 安装包美化 
electron 自定义托盘 + 托盘闪烁  与主进程通信
electron 无边框下  窗口 放大缩小  拖拽 全屏
electron 通过网页唤醒 通信
electron 自动热更新
[electron  视频演示](https://live.csdn.net/v/embed/284482)


[项目演示 ](https://ranshaka.github.io/ranAdmin/#/)

![Working](https://s1.ax1x.com/2023/03/09/ppnZc3q.png)
![Working](https://s1.ax1x.com/2023/03/09/ppnZ6Cn.png)

![Working](https://s1.ax1x.com/2023/03/09/ppnZs4s.png)


## ⛏️ 项目主要功能 <a name = "项目主要功能"></a>

- 暗黑主题自由切换

- 动态主题

- 动态的国际化语言

- 动态面包屑

- 动态路由导航

- 动态菜单 根据接口返回参数 动态渲染菜单 动态路由

- 多个系统动态切换 

- 第三方图标库 

- 项目水印 

- canvas 电子签名 

- 抽样 /九宫格、大转盘 

-  高德地图-撒点 海量 电子围栏 热力图..... 

- 高德地图- 动态车辆轨迹

- excel 导入 excel 导出 

- 封装 echarts 图表使用 

- 个性化button

- 多元化title  


### 安装教程

1. 项目启动
```
npm install 

// 不推荐yarn  应该是会报错  yarn 报错 删掉依赖  使用 npm run 
```

2.如果是electron 分支 需要配置自动更新地址

- [electron-hot-update 自动热更新插件 / demo](https://github.com/ranshaka/electron-hot-updata)

```

//background.js 
 updateHandle(win, 'http://192.168.0.191/electron/'); // 配置自动跟新地址;



// vue.config.js 
module.exports = {
  pluginOptions:{
    nodeIntegration:{
       publish:[
            {
                "provider":"generic",
                url: "http://192.168.0.191/electron/" // 更新文件服务器地址
            }
        ],
        }
  }
}


```



## ✍️ Authors <a name = "authors"></a>

- [@ranshaka](https://gitee.com/ranshaka)

- [@博客](https://blog.csdn.net/qq_44795810?spm=1001.2101.3001.5343) 


## 🧧 打赏作者

可以请作者喝杯咖啡


![Working](https://s1.ax1x.com/2023/03/09/ppnuOWd.png)
