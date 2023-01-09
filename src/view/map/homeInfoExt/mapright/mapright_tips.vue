<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 15:55:11
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapright_tips flex">
        <img src="../../images/view/GJ2.png" alt="">
        <p class="zhuhui" style="font-size:24px;">{{totalInfo.giveAnAlarmNum}}</p>
        <div class="division"></div>
        <div>
            <div class="zhuhui">沪A132131 <span style="color:red;margin-left:20px;">温度告警</span></div>
            <div class="grey ellipsis" style="font-size:12px;width:150px;">上海市杨sadad浦区隆昌路619</div>
        </div>
        <div class="division"></div>
        <img src="../../images/view/CD1.png" class="pointer" @click="Datails(3)" alt="">
    </div>
    <div class="mapright_tips  mapright_tips2 flex">
        <img src="../../images/view/GJ1.png" alt="" style="width:40px;height:40px;">
        <p class="zhuhui" style="font-size:24px;">{{totalInfo.faultsNum}}</p>
        <div class="division"></div>
        <div>
            <div class="zhuhui">沪A132131 <span style="color:orange;margin-left:20px;">XX故障</span></div>
            <div class="grey ellipsis" style="font-size:12px;width:150px;">上海市杨sadad浦区隆昌路619</div>
        </div>
        <div class="division"></div>
        <img src="../../images/view/CD1.png" class="pointer"  @click="Datails(4)" alt="">
    </div>
</template>

<script>
    import {
        defineComponent,
        ref
    } from 'vue';

    export default defineComponent({
        name: 'BusinessManagement',
        setup() {
            const totalInfo=ref({})
            number_large_screen_vehicles().then((res)=>{
                if(res.code==200){
                    totalInfo.value=res.data
                    console.log(totalInfo.value)
                }
            })
            const Datails = (index) => {
                let type=['COUNT','ONLINE','ONNOTLINE','GIVEANALARM','FAULT']
                let title=["车辆信息","在线车辆信息","离线车辆信息","告警信息","故障信息",]
                emitter.emit("showModel", {
                    title:title[index],
                    index: 3,
                    type:type[index],
                    width:'10rem',
                    flag:index==3?true:false,
                })
            }
            return {
                Datails,
                totalInfo
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapright_tips {
        position: absolute;
        top: 80px;
        right: 10px;
        height: 60px;
        width: 375px;
        background: url("../../images/view/T1.png");
        background-size: 100% 100%;
        padding: 10px 20px;
        color: #FFF;
        text-align: center;
        box-sizing: border-box;
        z-index: 10;
        text-align: left;
    }

    .mapright_tips2 {
        top: 150px;
    }
</style>