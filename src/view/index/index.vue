<template>
    <div class="content2 minHeight100">
      
        <el-row gutter="20" class="titleList">
            <el-col :span="6">
                <el-card class="box-card width100 tatleBox">
                    <template #header>
                        <div class="card-header">
                            <span>下载量</span>
                            <div class="zhuhui cyan">212313132</div>
                        </div>
                    </template>
                    <el-alert title="success alert" type="success" />
                    <el-alert title="info alert" type="info" />
                    <el-alert title="warning alert" type="warning" />
                </el-card>
            </el-col>
          
            <el-col :span="6">
                <el-card class="box-card width100 tatleBox" :body-style="{ padding: '0px' }">
                    <template #header>
                        <div class="card-header">
                            <span>下载曲线</span>
                            <div class="zhuhui cyan">212313132</div>
                        </div>
                    </template>
                    <echartsEl :options="option" class="width100 echartsbox margin-top-2x"></echartsEl>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card width100 tatleBox">
                    <template #header>
                        <div class="card-header">
                            <span>数据分析</span>
                            <div class="zhuhui pink">212313132</div>
                        </div>
                    </template>
                    <echartsEl :options="option2" class="width100 echartsbox"></echartsEl>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card class="box-card width100 tatleBox">
                    <template #header>
                        <div class="card-header">
                            <span>访问百分比</span>
                            <div class="zhuhui purple">212313132</div>
                        </div>
                    </template>
                    <div>
                        <el-progress :percentage="50" class="margin-top-sl" />
                        <el-progress :percentage="100" :format="format" class="margin-top-2x" />
                        <el-progress :percentage="100" status="success" class="margin-top-2x" />
                        <el-progress :percentage="100" status="warning" class="margin-top-2x" />
                        <el-progress :percentage="50" status="exception" class="margin-top-2x" />
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row gutter="20" class="margin-top-2x">
            <el-col :span="16">
                <div class="padding-2x bg-white">
                    <el-scrollbar height="357px">
                        <p v-for="(item,index) in tableData" :key="item" class="margin">
                            <el-checkbox v-model="item.falg" :label="item.date" size="large" />
                            {{index+1}} Operation feedback: enable the users to updates and interactive
                        </p>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="padding-2x bg-white">
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card class="bg-gradual-blue">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card class="bg-gradual-green">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card class="bg-gradual-orange">
                                <h4>Update Github template</h4>
                                <p>Tom committed 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>
                </div>

            </el-col>
        </el-row>
        <div class="margin-top-2x padding-2x bg-white">
            <el-table :data="tableData" border style="width: 100%" class="width100" id="Export">
                <el-table-column prop="date" label="Date" width="150" />
                <el-table-column prop="name" label="Name" width="120" />
                <el-table-column prop="state" label="State" width="120" />
                <el-table-column prop="city" label="City" width="120" />
                <el-table-column label="Address" :show-overflow-tooltip="true">
                    <template #default="scope">
                        <div v-if="scope.row.flag" class="flex space-between">
                            <el-input v-model="scope.row.address" placeholder="Please input" clearable />
                            <div>
                                <el-link link type="success" @click="scope.row.flag=false" style="width:30px;">保存
                                </el-link>
                            </div>
                        </div>
                        <div v-else class="flex space-between">
                            <span>{{scope.row.address}}</span>
                            <el-link link type="primary" @click="scope.row.flag=true">修改</el-link>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="zip" label="Zip" width="120" />
                <el-table-column label="Operations" width="220">
                    <template #default>
                        <el-button type="primary" size="small" text bg>Detail</el-button>
                        <el-button type="success" size="small" text bg>Edit</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="margin-top-2x padding-2x bg-white">
            <el-row>
                <el-col :sm="12" :lg="6">
                    <el-result icon="success" title="Success Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <el-button type="primary">Back</el-button>
                        </template>
                    </el-result>
                </el-col>
                <el-col :sm="12" :lg="6">
                    <el-result icon="warning" title="Warning Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <el-button type="primary">Back</el-button>
                        </template>
                    </el-result>
                </el-col>
                <el-col :sm="12" :lg="6">
                    <el-result icon="error" title="Error Tip" sub-title="Please follow the instructions">
                        <template #extra>
                            <el-button type="primary">Back</el-button>
                        </template>
                    </el-result>
                </el-col>
                <el-col :sm="12" :lg="6">
                    <el-result icon="info" title="Info Tip">
                        <template #sub-title>
                            <p>Using slot as subtitle</p>
                        </template>
                        <template #extra>
                            <el-button type="primary">Back</el-button>
                        </template>
                    </el-result>
                </el-col>
            </el-row>

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
    export default defineComponent({
        components: {
            echartsEl
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
            const tableData = [{
                    date: '2016-05-03',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },

                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },

                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
            ]
            return {
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

        /deep/.el-card__header {
            padding: 12px;
        }
    }
</style>