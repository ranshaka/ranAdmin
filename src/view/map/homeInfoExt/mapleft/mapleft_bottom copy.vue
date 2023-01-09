<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 15:55:08
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
                :ranges="ranges"
                    @ok="big_screen_travel_alarm_numFun" />
            </div>
            <div class=" height100" style="height:calc(100% - 50px)">
                <div class="flex width100 height49 scroll">
                    <div >
                        <div class="flex space-between " style="position:relative">
                            <div class="svnTitle">告警数：{{alertMapcont}}条</div>
                        </div>
                        <div class="flex space-between  width100 height100 ">
                            <echarts :options="options" style="height: 100%; width: 100%"></echarts>
                        </div>
                    </div>
                    <div class="flex  flex-wrap height100 width60 " style="overflow-y:scroll;">
                        <div class="block" v-for="(value,index) in alertMap" :key="value.name">
                            <div class="block-Title pointer" @click="selectPie(value,index)"
                                :style="!value.flag?'color:#aaa':''" :title="value.name">{{value.name}}</div>
                            <div class="flex">
                                <div class="sign">
                                    <div class="signBg" style="width:50%;"></div>
                                </div>
                                <div class="zhuhui aqua pointer" @click="seeError(value.type,true)" :title="value.value">
                                    {{value.value}}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="width100 height49 scroll flex" style="margin-top:4%;">
                    <div>
                        <div class=" flex width100 " style="position:relative">
                        <div class="svnTitle">故障数：{{faultMapcont}}条</div>
                            </div>
                            <div class="flex space-between width100 height100 ">
                        <echarts :options="options2" style="height: 100%; width: 100%"></echarts>
                        
                    </div>
                    </div>
                   
                    
                    <div class="flex  flex-wrap height100 width60 " style="overflow-y:scroll;">
                            <div class="block" v-for="(value,index) in faultMap" :key="value.name">
                                <div class="block-Title pointer" @click="selectPie2(value,index)"
                                    :style="!value.flag?'color:#aaa':''" :title="value.name">{{value.name}}</div>
                                <div class="flex">
                                    <div class="sign">
                                        <div class="signBg" style="width:50%;"></div>
                                    </div>
                                    <div class="zhuhui aqua pointer" :title="value.value"
                                        @click="seeError(value.type,false)">{{value.value}}</div>
                                </div>
                            </div>
                        </div>
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


    import echarts from "@/components/echarts.vue"
    
    import moment, { Moment } from 'moment';
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            echarts

        },
        setup() {
            const ranges=ref(
                { 
                    '本周': [moment(getFirstDayOfWeek(formatDateTime())),moment(formatDateTime(new Date()))], 
                    '本月': [moment(getFirstDayOfMonth(formatDateTime())),moment(formatDateTime(new Date()))],
                    // '本周': [getFirstDayOfWeek(formatDateTime()),formatDateTime(new Date())], 
                    // '本月': [getFirstDayOfMonth(formatDateTime()),formatDateTime(new Date())],
                 }
            )
            const faultMap = ref([])
            const alertMap = ref([])
            const alertMapcont = ref(0)
            const faultMapcont = ref(0)
            const value1 = ref([formatDateTime(new Date(), "YYYY") + " 00:00:00", formatDateTime(new Date())])
            const options = ref({
                backgroundColor: "",
                legend: {
                    show: false,
                    selected: {}
                },
                tooltip: {
                    position: 'right',
                    textStyle: {
                        fontSize: '20',
                        color: '#ccc'
                    },
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    formatter: function (param) {
                        var value = param.data;
                        return '<div style="border-radius:1px solid #0553C9;  font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            value.name + ' ' + value.value +
                            '</div>'
                    }
                },
                series: [{
                    name: 'Access From',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    center: ["50%", "40%"],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: []
                }]
            })
            const options2 = ref({
                backgroundColor: "",
                legend: {
                    show: false,
                    selected: {}
                },
                tooltip: {
                    position: 'right',
                    textStyle: {
                        fontSize: '20',
                        color: '#ccc'
                    },
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    formatter: function (param) {
                        var value = param.data;
                        return '<div style="border-radius:1px solid #0553C9;  font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                            value.name + ' ' + value.value +
                            '</div>'
                    }
                },
                series: [{
                    name: 'Access From',
                    type: 'pie',
                    radius: ['60%', '70%'],
                    center: ["50%", "40%"],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: []
                }]
            })


            const big_screen_travel_alarm_numFun = () => {
                let t = JSON.parse(JSON.stringify(value1.value))
                big_screen_travel_alarm_num({
                    "startTime": t[0].replace("T", " ").replace("0Z", ""),
                    "endTime": t[1].replace("T", " ").replace("0Z", ""),
                }).then(res => {

                    if (res.code == 200) {
                        let aler = res.data.alertMap
                        alertMap.value = [{
                                name: "	烟雾预警",
                                type: "SMOKEWARNING",
                                value: aler.smokeWarningNum
                            },
                            {
                                name: "CO预警",
                                type: "COWARNING",
                                value: aler.coWarningNum
                            },
                            {
                                name: "温度预警",
                                type: "TEMPERATUREWARNING",
                                value: aler.temperatureWarningNum
                            },
                            {
                                name: "火焰预警",
                                type: "FLAMEWARNING",
                                value: aler.flameWarningNum
                            },
                            {
                                name: "化学气体烟雾预警",
                                type: "CHEMICALGASSMOGWARNING",
                                value: aler.chemicalgassmogWarningNum
                            },
                            {
                                name: "感温线报警",
                                type: "TEMPERATURELINEALARM",
                                value: aler.temperatureLineWarningNum
                            },
                            {
                                name: "当前压力超出压力差值阈值报警",
                                type: "SMOTCPETPDTAALARMEWARNING",
                                value: aler.tcpetpdtAalarmWarningNum
                            },
                            {
                                name: "当前温度超出绝对阈值报警",
                                type: "CTEATALARM",
                                value: aler.cteatAlarmWarningNum
                            },
                            {
                                name: "当前温度超出斜率阈值报警",
                                type: "CTESALARM",
                                value: aler.ctesAlarmWarningNum
                            },
                            {
                                name: "当前烟雾浓度超出绝对阈值报警",
                                type: "TCSMOKECETABALARM",
                                value: aler.tcsmokecetabAlarmWarningNum
                            },
                            {
                                name: "探测器使用寿命到期预警",
                                type: "ENDLIFEWARNING",
                                value: aler.endliFewarningWarningNum
                            },
                        ]
                        alertMap.value.filter(x => x.flag = true)
                        alertMapcont.value = aler.totalNumberOfAlerts
                        // alertMapcont.value=alertMap.value.reduce((sum, item) => sum + item.value, 0)
                        options.value.series[0].data = alertMap.value
                        let fault = res.data.faultMap
                        faultMap.value = [
                            // {
                            //     name: "故障数",
                            //     value: fault.totalFailureNum
                            // },
                            {
                                name: "未接收到上级设备回复备份命令的通讯故障",
                                type: "COMMUNICATIONFAIL",
                                value: fault.communicationFailNum
                            },
                            {
                                name: "温度传感器故障",
                                type: "TEMPERATURESENSORFAILURE",
                                value: fault.temperatureSensorFailureNum
                            },
                            {
                                name: "感温线对电源短路故障",
                                type: "POWERSHORTCIRCUITFAULT",
                                value: fault.powershortcircuitfaultNum
                            },
                            {
                                name: "感温线对地短路故障",
                                type: "SHORTTOGROUNDFAULT",
                                value: fault.shorttogroundfaultNum
                            },
                            {
                                name: "单传感器开路故障",
                                type: "SINGLESENSOROPENCIRCUITFAULT",
                                value: fault.FaultNum
                            },
                            {
                                name: "探测器故障",
                                type: "DETECTORFAILURE",
                                value: fault.detectorFailureNum
                            },
                            {
                                name: "备电故障",
                                type: "BACKUPPOWERFAILURE",
                                value: fault.backuppowerfailureNum
                            },
                            {
                                name: "探测器数量故障",
                                type: "DETECTORNUMBERFAILURE",
                                value: fault.detectornumberfailureNum
                            },
                            {
                                name: "CAN1（外网）通讯故障",
                                type: "CANCOMMUNICATIONFAIL",
                                value: fault.cancommunicationfailNum
                            },
                            {
                                name: "电源电压过低故障",
                                type: "POWERSUPPLYVOLTAGEISTOOLOWFAULT",
                                value: fault.toolowfaultNum
                            },
                            {
                                name: "外部Flash故障",
                                type: "EXTERNALFLASHFAULT",
                                value: fault.flashfaultNum
                            },
                            {
                                name: "电源电压过高故障",
                                type: "POWERSUPPLYVOLTAGEISTOOLOWFAULT",
                                value: fault.powersupplyvoltNum
                            },
                            {
                                name: "传感器内部故障",
                                type: "INTERNALSENSORFAILURE",
                                value: fault.internalsensorfailureNum
                            },
                            {
                                name: "ADC参考电压故障",
                                type: "ADCREFERENCEVOLTAGEFAILURE",
                                value: fault.adcrefefailureNum
                            },
                            {
                                name: "光电路故障",
                                type: "OPTICALCIRCUITFAILURE",
                                value: fault.opticalcircuitfailureNum
                            },

                        ]
                        faultMap.value.filter(x => x.flag = true)
                        faultMapcont.value = fault.totalFailureNum
                        //  faultMapcont.value=faultMap.value.reduce((sum, item) => sum + item.value, 0)
                        options2.value.series[0].data = faultMap.value
                    }
                })
            }
            big_screen_travel_alarm_numFun()

            const seeError = (type, falg) => {
                emitter.emit("showModel", {
                    title: falg ? "告警信息" : '故障信息',
                    index: falg ? 1 :2,
                    data: {},
                    type: type
                })
            }

            const selectPie = (value, index) => {
                alertMap.value[index].flag = !alertMap.value[index].flag
                console.log(alertMap.value[index].flag)
                options.value.legend.selected[value.name] = alertMap.value[index].flag
            }
            const selectPie2 = (value, index) => {
                faultMap.value[index].flag = !faultMap.value[index].flag
                options2.value.legend.selected[value.name] = faultMap.value[index].flag
            }
            return {
                ranges,
                alertMap,
                faultMap,
                alertMapcont,
                faultMapcont,
                value1,
                options,
                options2,
                big_screen_travel_alarm_numFun,
                seeError,
                selectPie,
                selectPie2,
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

        .SleectBox {
            width: 120px;
            position: absolute;
            right: 0;
            top: 0;
            // background: #FFF;
            z-index: 1;
            right: 0;

            .ant-select {
                width: 100%;
                height: 100%;
            }
        }

        .block {
            width: 50%;
            height: 50%;
            padding-left: 40px;
            box-sizing: border-box;
            margin-bottom: 20px;

            .block-Title {
                width: 80%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }

        .options2 .block {
            margin-top: 20px;
        }
    }

    .echartsbottom1 {
        width: 100%;
        height: 100%;
    }
</style>