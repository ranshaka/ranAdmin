<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
  <!--  :prefixCls="themes?'custom-dark':'ant'"  -->
  <a-config-provider   :component-size="modulesSize"  :prefixCls="themes?'custom-dark':'ant'"   :locale="locale">
    <a-spin :spinning="loading" :delay="500"  tip="飞速加载中...">
      <router-view :class="themes ?'custom-dark':''" ></router-view>
  </a-spin>
  
  </a-config-provider>
</template>
<script>
  import {
        defineComponent,
        inject ,
        nextTick,
        computed,
        watch
    } from "vue"
    //  国际化语言包
    import enUS from 'ant-design-vue/es/locale/en_US';
    import zhCN from 'ant-design-vue/es/locale/zh_CN';
    import dayjs from 'dayjs';
    import {
    ConfigProvider,
  } from 'ant-design-vue';
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
            const locale = computed(() =>{
              let a= store.getters.locales == "zh-cn"?zhCN:enUS
              dayjs.locale(a)
              return a;
            }
           )
            const modulesSize = computed(() => store.getters.modulesSize)
            const themes=computed(()=>store.getters.themes)
            const themesColor=computed(()=>store.getters.themesColor)
            ConfigProvider.config({
                    theme: themesColor.value,
                    });
          
            return {
              loading,
              themes,
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
  .a-main{
    padding:0;
  }
  
</style>