<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="conter minHeight100">
        <div class="padding-2x bg-white">
                <el-alert title="文件地址 src\utils\directive\extend\permissions.js" type="error" effect="dark" class="margin-bottom-2x"> </el-alert>
                <div>
                    根据后台返回功能权限列表 单独控制每个功能模板（包括但不限于按钮....）
                </div>
                <div>
                    利用vue自定义指令 队某一个模块/功能 单独做控制
                </div>
                <pre>
                    <code class="language-html">&lt;div  v-has="'A'" &gt;&lt;/div&gt;</code>
                </pre>
                <div class="green">v-has="'A'" A 就是权限id</div>
                <div v-has="'A'">效果展示</div>
                <div v-has="'ASDA'">效果展示2</div>
        </div>  
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
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
        },
        setup() {
 
            return {
          

            }
        }
    });
</script>
<style>


</style>