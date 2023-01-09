<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 10:11:43
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapright_tag" v-if="flag">
        <div class="tagInfoRemove" @click="flag=false">X</div>
        <img src="../../images/view/car.png" alt="" class="width100 height20">
        <div class="division_"></div>
        <div class="flex" style="margin:10px 0;">
            <div class="tagTitle text-shadow">
                {{infos.RPlateNumber}}
            </div>
            <div class="flex">
                <div class="tagButton">在线 </div>
                <div class="tagButton">告警 (1)</div>
                <div class="tagButton">故障 (2)</div>
            </div>
            <div style="margin-left:15px;">{{infos.VStatus}}</div>
        </div>
        <div class="division_"></div>
        <div class="tagInfo">
            
            <div class="flex space-between">
                <div>企业名称:北京公交集团</div>
                <div>VIN:13584618613132</div>
            </div>
            <div class="flex space-between">
                <div>CO最大值: 839 ppm</div>
                <div>CO最小值:0.0 ppm</div>
            </div>
            <div class="flex space-between">
                <div>温度最大值: 45.0 °C</div>
                <div>温度最小值:34.0 °C</div>
            </div>
            <div class="flex space-between">
                <div>烟雾最大值: 3.0 db/m</div>
                <div>烟雾最小值:2.0 db/m</div>
            </div>
            <div class="flex space-between">
                <div>VOC最大值:22.5 %</div>
                <div>VOC最小值:58.0 %</div>
            </div>
            <div class="flex space-between">
                <div>备电电压: 0.0V</div>
                <div></div>
            </div>
            <div class="division_"></div>
            <div>最新时间: 2022:02:02 00 00 00</div>
            <div class="division_"></div>
            <div>当前位置: 上海市</div>
            <div class="division_"></div>
        </div>
        <div class="flex space-between">
            <div class="width50">
                <div class="svnButton text-shadow " @click="playback(true)">
                    实时监控
                </div>
            </div>
            <div class="width50">
                <div class="svnButton text-shadow  " @click="playback(false)" >
                    历史回放
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        defineComponent,
        ref,
        onMounted,
    } from 'vue';
    import {
        useRouter
    } from "vue-router";
    import {
        useStore
    } from "vuex";
    import {
        reloadRoute,
        toChangeSystem
    } from "@/store/modules/user";
    
    export default defineComponent({
        name: 'BusinessManagement',
        components: {


        },
        setup() {
            const router = useRouter()
            const store = useStore()
            const allRouter =  store.getters.allRouter
            const flag=ref(false)
            const infos=ref({})
            const playback = (falg) => {
                let number = infos.value.RPlateNumber
                let routers= JSON.parse(JSON.stringify(allRouter))
                    let index=routers.findIndex(x=>x.path == '/cxIndex')
                setTimeout(()=>{
                    sessionStorage.setItem("systemIndex", index)
                toChangeSystem(index)
                reloadRoute(store.getters.moduleInTop)
                console.log(store.getters.moduleInTop)
                router.push({
                    name:"video",
                    params:{
                        number:number,
                        falg:falg
                    }
                })
                },200)
            }


            onMounted(()=>{
                emitter.on("carDatails",(e)=>{
                    flag.value=true
                    infos.value=e.target.De.extData
                    console.log(infos)
                 
                    console.log(flag.value)
                })
            })
            return {
                flag,
                infos,
                playback,
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapright_tag {
        position: absolute;
        top: 270px;
        right: 10px;
        height: 460px;
        width: 375px;
        background: url("../../images/view/bg.png");
        background-size: 100% 100%;
        padding: 20px 20px;
        color: #FFF;
        text-align: center;
        box-sizing: border-box;
        z-index: 10;
        text-align: left;
     
            .tagInfoRemove{
                position: absolute;
                right:10px;
                top:0;
                font-size: 30px;
                color:#f60;
                font-weight: 600;
                cursor: pointer;
            }

        .tagInfo>div {
            margin-bottom: 5px;
            color: #F0F5FB;
            font-size: 14px;
          

            
        }
        .svnButton{
            width:140px;
            height:40px;
            line-height:40px;
            // border:1px solid #12a3f5;
            text-align: center;
            margin:0 auto;
            background: url("../../images/view/ship.png");
            background-size: 100% 100%;
            font-size:16px;
            margin-top:20px;
            cursor: pointer;
        }
        .videoBox {
            margin: 0 auto;
            width: 90%;
            height: 100px;
            background: url("../../images/view/ship.png");
            background-size: 100% 100%;

        }
        .tagButton>.tagButton{
            margin-left:10px;
        }
        .tagButton{
            width:60px; height:24px; line-height: 24px;
            text-align: center;
            color:#FFF;
            background:#12a3f5;
            margin-left:10px;
        }
        .tagButton:nth-child(2){
            background:red;
        }
        .tagButton:nth-child(3){
            background:#f60;
        }
    }
</style>