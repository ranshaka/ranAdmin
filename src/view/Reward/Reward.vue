<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->


<template>
    <div class="content minHeight100">
        <div>
            <a-alert title="本项目仅供学习参考，若被他人用于商业用途，与本人无关" type="success" />
        </div>
        <div class="tips">
            <p>赠人玫瑰，手有余香</p>
            <p>如果觉得此项目对你有帮助。可以请作者喝杯咖啡</p>
            <p>如果是新手小白有不懂的问题，记得备注微信号。会加你微信号。</p>
            <p>大家共同交流，学习进步</p>
        </div>
        <div class="imagesBox">
            <img src="../../assets/images/ranadmin.png" alt="">
        </div>
    </div>
</template>

<script>
    import {
        computed,
        defineComponent,
        reactive, //响应式
        watch, //响应式
        ref,
    } from 'vue';
    export default {
        setup() {
       
            return {
         
            }
        },
    }
</script>
<style lang="less" scoped>
.tips{
    width: 320px;
        height:150px;
        margin:0 auto;
        text-align: center;
}
    .imagesBox{
        width: 320px;
        height:300px;
        margin:0 auto;
        img{
            width: 100%;
            height: 100%;
        }
    }
</style>