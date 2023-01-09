<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-22 13:26:15
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapleft_content">
        <div class="modelTitle">
            <p class="modelTitle-text">设备概览</p>
        </div>
        <div class="flex  space-around  width100 ">
            <div class="leftsvn">
                <p>设备数量</p>
                <p>100</p>
            </div>
            <div class="leftsvn">
                <p>设备数量</p>
                <p>100</p>
            </div>
            <div class="leftsvn">
                <p>设备数量</p>
                <p>100</p>
            </div>
        </div>
        <div class="flex height70" >
            <div class=" width40 height100">
                <echarts :options="options" style="height: 100%; width: 100%"></echarts>
            </div>
            <div class=" width60 height100 scrollBox" style="overflow-y: scroll">
                <div class="margin-bottom-1x" v-for="value in 5" :key="value">
                    <div class="margin-bottom-1x text-left" >采集信息 {{value+1}}</div>
                    <div class="flexis ">
                        <div class="signbox">
                            <div class="sign">
                                <div class="signBg" style="width:50%;"></div>
                            </div>
                        </div>
                        <div class="zhuhui aqua pointer">10</div>
                        <div style="margin:0 10px;">/</div>
                        <div class="zhuhui red pointer">15</div>
                    </div>
                </div>
                <div class="margin-bottom-1x">
                    <div class="margin-bottom-1x text-left" >设备故障</div>
                    <div class="flexis ">
                        <div class="signbox">
                            <div class="sign">
                                <div class="signBg" style="width:50%;"></div>
                            </div>
                        </div>
                        <div class="zhuhui aqua pointer">10</div>
                        <div style="margin:0 10px;">/</div>
                        <div class="zhuhui red pointer">15</div>
                    </div>
                </div>
           
            </div>
        </div>
    </div>

</template>

<script>
    import {
        defineComponent,
        ref
    } from 'vue';
    
    import echarts from "@/components/echarts.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            echarts
        },

        setup() {
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
                    center: ["50%", "50%"],
                    label: {
                        show: false,
                        position: 'center'
                    },
                    labelLine: {
                        show: false
                    },
                    data: [123,50]
                }]
            })
            return {
                options
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapleft_content {
        position: absolute;
        top: 32%;
        left: 0;
        height: 30%;
        width: 30%;
        padding: 10px 20px;
        color: #FFF;
        text-align: center;
        background: url("../../images/view/left.png");
        background-size: 100% 100%;
        z-index: 1;
        .signbox{
            padding-left:20px;
        }
        .sign {
            color: aqua;
            width: 2rem;
            height: 12px;
            transform: skewX(35deg);
            background: #373E54;
            line-height: 20px;
            position: relative;
            margin-right: 20px;

            .signBg {
                position: absolute;
                bottom: 0;
                right: 0;
                top: 0;
                left: 0;
                background: linear-gradient(to right,
                        #2d83fa,
                        #10faf8);
            }

            &:before {
                content: "|||";
                display: inline-block;
                font-weight: 900;
                color: #FFF;
                line-height: 20px;
                position: absolute;
                position: absolute;
                top: -5px;
                left: -17px;
                color: #2d83fa;
            }
        }
    }


    .aqua {
        color: #37FFB8;
    }

    .red {
        color: #FF1641;
    }

    .orange {
        color: #FFB314;
    }

    .grey {
        color: #97B5C6;

    }

    .cornflowerblue {
        color: #0079CF;

    }
</style>