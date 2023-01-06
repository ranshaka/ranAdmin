<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
    <div class="content">
        <div class="flex width100" style="height:500px;">
            <div  style="position: relative;"  class="box Dark Shadow" v-waterMarker="{text:input,textColor:'rgba(180, 180, 180, 0.4)',styles:{rotate:0}, }">
                文字水印
            </div>
            <div class="box" v-waterMarker="{text:input,textColor:'rgba(180, 180, 180, 0.4)',styles:{
                rotate:-20,width:120,height:80}, }">
                倾斜文字水印
            </div>
            <div class="box" v-waterMarker="{text:input,textColor:'aqua'}">
                文字水印修改文字颜色
            </div>
        </div>
    </div>
</template>
<script>
    import {
        defineComponent,
        computed,
        ref,
    } from 'vue'
    export default defineComponent({
        components: {},
        setup() {
            const input=ref("Francis")

            return {
                input
            }
        }
    })
</script>
<style scoped>
    .box {
        width: 34%;
        height: 100%;
        /* margin: 20px; */
        box-shadow:--a-box-shadow-lighter;
    }
</style>