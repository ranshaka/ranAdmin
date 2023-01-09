<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 17:50:14
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapleft_bottom padding">
        <div class="height100">
            <div class="flex space-between">
                <div class="modelTitle">
                    <p class="modelTitle-text">告警故障</p>
                </div>
                <a-range-picker style="width: 400px" v-model:value="value1" show-time format="YYYY/MM/DD HH:mm:ss"
                    :ranges="ranges" @ok="big_screen_travel_alarm_numFun" />
            </div>
            <div class=" width100 height80">
                <elecharts :options="options" style="height: 100%; width: 100%"></elecharts>
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
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            elecharts

        },
        setup() {

            const options = ref({
                color: ['#e54d42', '#0081ff'],
                grid: {
                    top: '3%',
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    axisLine: {
                            lineStyle: {
                                color: '#777', //x轴的颜色
                                width: 1, //轴线的宽度
                            },
                        },
                        splitLine: {//分割线配置
                        show:false,
                        lineStyle: {
                            color: "#222",
                        }
                     },
                    // type: 'category',
                    // boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],
                yAxis: [{
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#777', //x轴的颜色
                                width: 1, //轴线的宽度
                            },
                        },
                        splitLine: {//分割线配置
                        show:true,
                        lineStyle: {
                            color: "rgba(255,255,255,0.1)",
                        }
                     },
                    },

                ],
                series: [{
                        name: 'Line 1',
                        type: 'line',
                        // stack: 'Total',
                        smooth: true,
                        // lineStyle: {
                        //     width: 0
                        // },
                        // showSymbol: false,
                        areaStyle: {
                            color: {
                                //线性渐变
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(120, 255, 255, 0.8)', // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: 'rgba(120, 255, 255,0)', // 100% 处的颜色
                                }],
                                global: false, // 缺省为 false
                            },
                        },
                        // emphasis: {
                        //     focus: 'series'
                        // },
                        data: [140, 232, 101, 100, 90, 340, 250]
                    },
                    {
                        name: 'Line 2',
                        type: 'line',
                        // stack: 'Total',
                        smooth: true,
                        // lineStyle: {
                        //     width: 0
                        // },
                        // showSymbol: false,
                        areaStyle: {
                            color: {
                                //线性渐变
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0,
                                    color: 'rgba(1, 255, 255, 0.8)', // 0% 处的颜色
                                }, {
                                    offset: 0.6,
                                    color: 'rgba(1, 255, 255,0)', // 100% 处的颜色
                                }],
                                global: false, // 缺省为 false
                            },
                        },
                        // emphasis: {
                        //     focus: 'series'
                        // },
                        data: [120, 282, 111, 234, 220, 340, 310]
                    },


                ]
            })

            return {
                options
            }

        }
    });
</script>
<style lang="less" scoped>
    .mapleft_bottom {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 35%;
        width:30%;
        color: #FFF;
        background: url("../../images/view/left.png");
        background-size: 100% 100%;
        z-index: 1;
    }
</style>