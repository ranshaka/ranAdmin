<template>
    <div class="ant-content ">
        <a-row gutter="20" class="titleList">
            <a-col :span="6">
                <a-card title="下载量" class="box-card width100 tatleBox">
                    <template #extra>
                        <div class="card-header">
                            <numberView :value="'41255533'"></numberView>
                            <!-- <div class="zhuhui red">212313132</div> -->
                        </div>
                    </template>
                    <a-alert message="Success Text" type="success" banner />
                    <a-alert message="Info Text" type="info banner " banner />
                    <a-alert message="Warning Text" type="warning" banner />

                </a-card>
            </a-col>

            <a-col :span="6">
                <a-card title="下载曲线" class="box-card width100 tatleBox">
                    <template #extra>
                        <div class="card-header">
                            <div class="zhuhui pink">13132</div>
                        </div>
                    </template>
                    <echartsEl :options="option" class="width100 echartsbox margin-top-2x"></echartsEl>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="数据分析" class="box-card width100 tatleBox">
                    <template #extra>
                        <div class="card-header">
                            <div class="zhuhui cyan">13132</div>
                        </div>
                    </template>
                    <echartsEl :options="option2" class="width100 echartsbox"></echartsEl>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Default size card" class="box-card width100 tatleBox">
                    <template #extra>
                        <div class="card-header">
                            <div class="zhuhui blue">13132</div>
                        </div>
                    </template>
                    <echartsEl :options="option2" class="width100 echartsbox"></echartsEl>
                </a-card>
            </a-col>
        </a-row>
        <a-row gutter="20" class="margin-top-2x">
            <a-col :span="16">
                <div class="padding-2x background">
                    <a-scrollbar height="357px">
                        <p v-for="(item,index) in tableData" :key="item" class="margin">
                            <a-checkbox v-model="item.falg" :label="item.date" size="large" />
                            {{index+1}} Operation feedback: enable the users to updates and interactive
                        </p>
                    </a-scrollbar>
                </div>
            </a-col>
            <a-col :span="8">
                <div class="padding-2x background">
                    <a-timeline>
                        <a-timeline-item timestamp="2018/4/12" placement="top">
                            <a-card class="bg-gradual-blue">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/12 20:46</p>
                            </a-card>
                        </a-timeline-item>
                        <a-timeline-item timestamp="2018/4/3" placement="top">
                            <a-card class="bg-gradual-green">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/3 20:46</p>
                            </a-card>
                        </a-timeline-item>
                        <a-timeline-item timestamp="2018/4/2" placement="top">
                            <a-card class="bg-gradual-orange">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </a-card>
                        </a-timeline-item>
                    </a-timeline>
                </div>

            </a-col>
        </a-row>
        <div class="margin-top-2x padding-2x background">
            <a-table :columns="columns" :data-source="tableData" border style="width: 100%" class="width100" id="Export">

            </a-table>
        </div>
        <div class="margin-top-2x padding-2x background">
            <a-row>
                <a-col :sm="12" :lg="6">
                    <a-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <a-button type="primary">Back</a-button>
                        </template>
                    </a-result>
                </a-col>
                <a-col :sm="12" :lg="6">
                    <a-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <a-button type="primary">Back</a-button>
                        </template>
                    </a-result>
                </a-col>
                <a-col :sm="12" :lg="6">
                    <a-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <a-button type="primary">Back</a-button>
                        </template>
                    </a-result>
                </a-col>
                <a-col :sm="12" :lg="6">
                    <a-result icon="info" title="Info Tip">
                        <template #sub-title>
                            <p>Using slot as subtitle</p>
                        </template>
                        <template #extra>
                            <a-button type="primary">Back</a-button>
                        </template>
                    </a-result>
                </a-col>
            </a-row>

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
    import * as echarts from "echarts";
    import echartsEl from "@/components/echarts.vue"
    import {
        Card
    } from 'ant-design-vue';
    import numberView from "@/publicView/number"
    export default defineComponent({
        components: {
            Card,
            echartsEl,
            numberView
        },
        setup() {
            const option = {
                color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    top: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                }],
                yAxis: [{
                    type: 'value'
                }],
                series: [{
                        name: 'Line 1',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        lineStyle: {
                            width: 0
                        },
                        showSymbol: false,
                        areaStyle: {
                            opacity: 0.8,
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgb(128, 255, 165)'
                                },
                                {
                                    offset: 1,
                                    color: 'rgb(1, 191, 236)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: [140, 232, 101, 264, 90, 340, 250]
                    },


                ]
            };

            const option2 = {


                series: [{
                    type: 'pie',
                    radius: [10, 40],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    // itemStyle: {
                    //     borderRadius: 8
                    // },
                    data: [{
                            value: 40,
                            name: 'rose 1'
                        },
                        {
                            value: 38,
                            name: 'rose 2'
                        },
                        {
                            value: 32,
                            name: 'rose 3'
                        },
                        {
                            value: 30,
                            name: 'rose 4'
                        },
                        {
                            value: 28,
                            name: 'rose 5'
                        },
                        {
                            value: 26,
                            name: 'rose 6'
                        },
                        {
                            value: 22,
                            name: 'rose 7'
                        },
                        {
                            value: 18,
                            name: 'rose 8'
                        }
                    ]
                }]
            };
            const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Platform',
  dataIndex: 'platform',
  key: 'platform',
}, {
  title: 'Version',
  dataIndex: 'version',
  key: 'version',
}, {
  title: 'Upgraded',
  dataIndex: 'upgradeNum',
  key: 'upgradeNum',
}, {
  title: 'Creator',
  dataIndex: 'creator',
  key: 'creator',
}, {
  title: 'Date',
  dataIndex: 'createdAt',
  key: 'createdAt',
}, {
  title: 'Action',
  key: 'operation',
}];
const tableData = [];
for (let i = 0; i < 3; ++i) {
    tableData.push({
    key: i,
    name: `Screem ${i + 1}`,
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}
            return {
                columns,
                tableData,
                option,
                option2,

            }
        },
    })
</script>
<style lang="less" scoped>
    .titleList {
        .tatleBox {
            height: 200px;
        }

        .echartsbox {
            height: 100px;
        }

        /deep/.a-card__header {
            padding: 12px;
        }
    }
</style>