<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 10:07:47
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapright_message flex">
        <img src="../../images/view/GJ1.png" alt="">

        <div class="division" style="height:40px;"></div> 
        <div>
            <div class="zhuhui orange" style="text-align:left;">温度持续升高，即将到达预警线</div>
            <div class="flex">
                <div class="grey ellipsis" style="font-size:12px;width:150px;">2022:09 00:00:00</div>
                <div class="messageBut">处理</div>
            </div>
           
        </div>

    </div>
</template>

<script>

    import {
        defineComponent,
    } from 'vue';
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            
            
        },
       setup(){

       }
    });
</script>
<style lang="less" scoped>
     .mapright_message{
        position: absolute;
        top: 160px;
        right: 10px;
        height: 100px;
        width:375px;
        background: url("../../images/view/T2.png");
        background-size: 100% 100%;
        padding: 10px 20px;
        color:#FFF;
        text-align: center;
        box-sizing: border-box;
        z-index: 10;
        text-align: left;
        .messageBut{
            width:83px;height:30px;
            text-align: center;
            line-height: 30px;
            color:orange;
            background: url("../../images/view/处理.png");
            background-size: 100%  100%;
            margin-top:5px;
        }
     }
</style>