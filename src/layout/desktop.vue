<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="header_desktop " :style="!borderTop?'background:none':''">
        <div class="flex space-between" >
            <div class="drag-box" @dblclick="winMax">
            </div>
            <div class="pointer "  v-if="borderTop">
                <svgView svg="min"  :title="'最小化'" @click="winMin"></svgView> 
                <svgView svg="max" title="最大化" class="margin-lr-1x" v-if="windowFlag" @click="winMax"></svgView> 
                <svgView svg="recove" title="最大化" class="margin-lr-1x" v-else @click="winMax"></svgView> 
                <svgView svg="close" title="关闭" @click="winClose"></svgView> 
            </div>
        </div>
    </div>
</template> 
<script setup>
    import {
        computed,
        ref,
    } from "@vue/reactivity";
    import store from "@/store";
    import {
        useRouter
    } from 'vue-router';
    import svgView from "@/common/svg/svg.vue"
    const borderTop = computed(() => store.getters.borderTop)
    const ipcRenderer = window.ipcRenderer
    const windowFlag=ref(false)
    const winMin=()=>{
        ipcRenderer.send("winMin")
    }
    const winMax=()=>{
        console.log( windowFlag.value)
        ipcRenderer.send("winMax",windowFlag.value)
        windowFlag.value= !windowFlag.value
    }
    const winClose=()=>{
        ipcRenderer.send("winClose")
    }
</script>
<style scoped lang="less">
.header_desktop{
    position: fixed;
    top:0;
    left:0;
    right:0;
    height:22px;
    background:rgba(0, 0, 0, .2);
    z-index: 10;
    padding-right:10px;
   
    svg{
        color:#FFF;
    }
    .drag-box{
        height: 22px;
        -webkit-app-region: drag;  // 告诉electron 区域氪拖拽
        -webkit-user-select: none; // 禁用文本
        width:calc(100vw - 100px);
    }
}
</style>