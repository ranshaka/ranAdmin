<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 18:01:02
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapright_content padding">
        <div class="height100">
            <div class="flex space-between">
                <div class="modelTitle">
                    <p class="modelTitle-text">告警故障</p>
                </div>
            </div>
            <div class=" height100" style="height:calc(100% - 50px)">
                <div class="flex width100 height100 scroll">
                    <div class="width50 height100">
                        <elecharts :options="options" style="height: 100%; width: 100%"></elecharts>
                    </div>
                    <div class="flex  flex-wrap height100 width50 " style="overflow-y:scroll;">
                        <div  class="block" v-for="(value,index) in 10" :key="value.name">
                            <div class="block-Title pointer" @click="selectPie(value,index)"
                                :style="!value.flag?'color:#aaa':''" >10</div>
                            <div class="flex">
                                <div class="sign" :class="'sign-'+ stylew[index%5]">
                                    <div class="signBg" style="width:50%;"></div>
                                </div>
                                <div class="zhuhui aqua pointer" :class="stylew[index%5]">10</div>
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
    import elecharts from "@/components/echarts.vue"
    export default defineComponent({
        components: {
            elecharts

        },
        setup() {
            const stylew=["orange","purple","red","aqua","pink",]
         
          
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
                stylew,
                
                options,
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapright_content {
        position: absolute;
        right: 0;
        top:37%;
        // bottom: 0;
        height: 30%;
        width:30%;
        color: #FFF;
        background: url("../../images/view/right.png");
        background-size: 100% 100%;
        z-index: 1;
        // .SleectBox {
        //     width: 120px;
        //     position: absolute;
        //     right: 0;
        //     top: 0;
        //     z-index: 1;
        //     right: 0;
        //     .ant-select {
        //         width: 100%;
        //         height: 100%;
        //     }
        // }

        // .block {
        //     width: 48%;
        //     padding-left: 24px;
        //     box-sizing: border-box;
        //     margin-bottom: 20px;
        //     .block-Title {
        //         width: 80%;
        //         white-space: nowrap;
        //         overflow: hidden;
        //         text-overflow: ellipsis;
        //     }

        // }
    }
</style>