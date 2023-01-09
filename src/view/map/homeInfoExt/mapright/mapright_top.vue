<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 18:16:57
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapright_top padding">
        <div class="height100">
            <div class="flex space-between">
                <div class="modelTitle">
                    <p class="modelTitle-text">站点区域top5</p>
                </div>
                <!-- <a-range-picker style="width: 400px" v-model:value="value1" show-time format="YYYY/MM/DD HH:mm:ss"
                    :ranges="ranges" @ok="big_screen_travel_alarm_numFun" /> -->
            </div>
            <div class=" width100 height80">
                <div class="top_List flex space-between margin-bottom-1x" v-for="(value,index) in 5" :key="value">
                    <div class="mapright_top_box">
                        1321312
                    </div>
                    <div class="sign" :class="'sign-'+ stylew[index%5]" style="width:2rem">
                        <div class="signBg" :style="`width:${index+1}5%; width:80%;` "></div>
                    </div>
                    <div class="zhuhui aqua pointer" :class="stylew[index%5]">{{index+5}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        ref,
        defineComponent,
        nextTick,
        onMounted,
        onBeforeUnmount,
    } from 'vue';
    import elecharts from "@/components/echarts.vue"
    
    import * as echarts from "echarts";
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            elecharts
        },
        setup() {
            const stylew=["orange","purple","red","aqua","pink"]
            const options = ref({
                grid: {
                    top: '3%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        textStyle: {
                            color: "#bbb"
                        }
                    },

                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    color: '#fff',
                    axisLabel: {
                        textStyle: {
                            color: "#bbb"
                        }
                    },
                    splitLine: { //分割线配置
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)",
                        }
                    },
                    splitLiabel: { //分割线配置
                        show: false,
                        lineStyle: {
                            color: "#222",
                        }
                    },
                    type: 'value',
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    barWidth: 10,
                    itemStyle: {
                        barBorderRadius: [2, 2, 0, 0], //柱体圆角   
                        color: new echarts.graphic.LinearGradient(
                            //前四个参数用于配置渐变色的起止位置，这四个参数依次对应 右下左上 四个方位。也就是从右边开始顺时针方向。
                            //通过修改前4个参数，可以实现不同的渐变方向
                            /*第五个参数则是一个数组，用于配置颜色的渐变过程。
                              每项为一个对象，包含offset和color两个参数
                            */
                            0, 0, 0, 1, [{ //代表渐变色从正上方开始
                                    offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                                    color: '#005BEA'
                                }, //柱图渐变色
                                {
                                    offset: 1, //指100%处的颜色
                                    color: '#00C6FB'
                                }
                            ]
                        ),
                    }
                }]
            })

            return {
                stylew,
                options,
            }

        }
    });
</script>
<style lang="less" scoped>
    .mapright_top {
        position: absolute;
        top: 0;
        right: 0;
        height: 36%;
        width:30%;
        color: #FFF;
        background: url("../../images/view/right.png");
        background-size: 100% 100%;
        z-index: 1;

        .mapright_top_box {
            height: 32px;
            width: 80px;
            border: 1px solid red;
        }


    }

</style>