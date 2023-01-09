<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
@@lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
  <el-config-provider :locale="locale"  :size="modulesSize">
    <router-view v-loading="loading"></router-view>
  </el-config-provider>
</template>
<script>
  import {
        defineComponent,
        inject ,
        nextTick,
        computed,
        watch
    } from "vue"
    // element-plus 国际化语言包
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'
  // 主题
  import {
        changeTheme,
        colorChange
    } from "@/common/themes/index"
  import store from "@/store";
  export default defineComponent({
        name: "index",
        components: { 
        },
        computed: {
        },
        setup() {
          const loading=computed(()=>store.getters.allloading)
            // element-plus 国际化
            const locale = computed(() => store.getters.locales == "zh-cn"?zhCn:en)
            const modulesSize = computed(() => store.getters.modulesSize)

              // 主题
              changeTheme(store.getters.themes)
            if(store.getters.themes=='defaultTheme'){
              colorChange(store.getters.themesColor)
            }
            return {
              loading,
                locale,
                modulesSize,
            }
        },
    })
</script>

<!-- 修改页面加载进度条颜色 -->
<style>
  #nprogress .bar {
    background: orangered !important;
  }
</style>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    /* margin-top: 60px; */
  }

  * {
    margin: 0;
    padding: 0;
  }
  .el-main{
    padding:0;
  }
  
</style>