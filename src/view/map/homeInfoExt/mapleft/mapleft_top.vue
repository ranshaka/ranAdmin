<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-22 13:25:47
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapleft_top">
        <div class="modelTitle">
            <p class="modelTitle-text">基础数据</p>
        </div>
        <div class="flex  width100 height100">
            <div class="width30  height100" >
                <div class="width100 height50" style="argin-bottom: 10px;">
                    <div>
                        <div class="svnTitle2" style="width:100px" @click="seeCarMarker(0)">车辆总数</div>
                    </div>
                    <h2 class="zhuhui zhengIcon aqua " @click="seeCar(1)">56756</h2>
                </div>
                <div class="width100 height50" >
                    <div>
                        <div class="svnTitle" style="width:100px" @click="seeCarMarker(0)">车辆总数</div>
                    </div>
                    <h2 class="zhuhui zhengIcon aqua " @click="seeCar(1)">56756757</h2>
                </div>
            </div>
            <div class="flex  flex-wrap  sizeBox  width40 height100">
                <div class="">
                    <p @click="seeCarMarker(1)">在线数</p>
                    <h2 class="zhuhui zhengIcon aqua " @click="seeCar(1)">7575</h2>

                </div>
                <div>
                    <p @click="seeCarMarker(2)">离线数</p>
                    <h2 class="zhuhui zhengIcon  grey" @click="seeCar(2)">1231</h2>

                </div>
                <div>
                    <p @click="seeCarMarker(3)">告警数</p>
                    <h2 class="zhuhui zhengIcon red" @click="seeCar(3)">123</h2>

                </div>
                <div>
                    <p @click="seeCarMarker(4)">故障数</p>
                    <h2 class="zhuhui zhengIcon orange" @click="seeCar(4)">215</h2>

                </div>
            </div>
            <div class="width30 ">
                <div class=" " style="margin-bottom: 10px;">
                    <echarts :options="options" style="height:100% width: 100%"></echarts>
                </div>
                <div class=" ">
                    <echarts :options="options" style="height:100% width: 100%"></echarts>
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
            const totalInfo = ref({})
  

            const options=ref({
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
                totalInfo,
                options,
             
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapleft_top {
        position: absolute;
        top: 0;
        left: 0;
        height: 30%;
        width: 30%;
        padding: 10px 20px;
        color: #FFF;
        text-align: center;
        background: url("../../images/view/left.png");
        background-size: 100% 100%;
        z-index: 100;
        .marginHeight {
            margin: 10px 0;
            font-size: 16px;
        }
        .svnTitle2{
            display: block;
            padding-left:20px;
            color:#EAEDF9;
            /* text-shadow: 0 0 10px #0F5ACC,0 0 20px #0F5ACC,0 0 30px #0F5ACC,0 0 40px #0F5ACC; */
            font-size: 20px;
            height:40px;
            line-height: 40px;
            position: relative;
            text-shadow:-1px 0 #0780D8,
            0 1px #0780D8,
            1px 0 #0780D8,
            0 -1px #0780D8;
        }
        .svnTitle2::before{
            content: "";
            display: block;
            position: absolute;
            width:10px;
            height:10px;
            border-radius: 50%;
            left:0;
            top:50%;
            margin-top:-5px;
            background:#FFf;
            /* margin-right:20px; */
        }
    }

    .sizeBox {
        div {
            width: 50%;
            text-align: center;
            margin-bottom: 10px;
            p {
                color: #828D99;
                margin: 0;
                font-size: 20px;
                cursor: pointer;
            }

            h2 {
                font-size: 30px;
                cursor: pointer;
            }
        }
    }

    // .zhengIcon{
    //     // position: relative;

    // }
    .zhengIcon::after {
        display: inline-block;
        width: 12px;
        height: 15px;
        border-radius: 50%;
        margin-right: -30px;
        margin-left: 15px;
        background: url("../../images/view/top.png");
        background-size: 100% 100%;
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