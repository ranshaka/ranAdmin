<template>
    <div class="content height100">
        <el-row class="height50">
            <el-col :span="12">
                <echarts :options="option" class="width100 height100"></echarts>
            </el-col>
            <el-col :span="12">
                <echarts :options="option2" class="width100 height100"></echarts>
            </el-col>
        </el-row>
        <echarts :options="option3" class="width100 height50"></echarts>
    </div>
</template>
<script>
    import {
        defineComponent
    } from 'vue'
    import echarts from "@/components/echarts.vue"
    export default defineComponent({
        components: {
            echarts
        },
        setup() {
            const option = {
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
            }

            const option2 = {
                title: {
                    text: 'Temperature Change in the Coming Week'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {
                            readOnly: false
                        },
                        magicType: {
                            type: ['line', 'bar']
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [{
                        name: 'Highest',
                        type: 'line',
                        data: [10, 11, 13, 11, 12, 12, 9],
                        markPoint: {
                            data: [{
                                    type: 'max',
                                    name: 'Max'
                                },
                                {
                                    type: 'min',
                                    name: 'Min'
                                }
                            ]
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: 'Avg'
                            }]
                        }
                    },
                    {
                        name: 'Lowest',
                        type: 'line',
                        data: [1, -2, 2, 5, 3, 2, 0],
                        markPoint: {
                            data: [{
                                name: '周最低',
                                value: -2,
                                xAxis: 1,
                                yAxis: -1.5
                            }]
                        },
                        markLine: {
                            data: [{
                                    type: 'average',
                                    name: 'Avg'
                                },
                                [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    },
                                    {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: 'Max'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }
                                ]
                            ]
                        }
                    }
                ]
            };
            const option3 = {
  xAxis: {
    type: 'category',
    boundaryGap: false
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '30%']
  },
  visualMap: {
    type: 'piecewise',
    show: false,
    dimension: 0,
    seriesIndex: 0,
    pieces: [
      {
        gt: 1,
        lt: 3,
        color: 'rgba(0, 0, 180, 0.4)'
      },
      {
        gt: 5,
        lt: 7,
        color: 'rgba(0, 0, 180, 0.4)'
      }
    ]
  },
  series: [
    {
      type: 'line',
      smooth: 0.6,
      symbol: 'none',
      lineStyle: {
        color: '#5470C6',
        width: 5
      },
      markLine: {
        symbol: ['none', 'none'],
        label: { show: false },
        data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
      },
      areaStyle: {},
      data: [
        ['2019-10-10', 200],
        ['2019-10-11', 560],
        ['2019-10-12', 750],
        ['2019-10-13', 580],
        ['2019-10-14', 250],
        ['2019-10-15', 300],
        ['2019-10-16', 450],
        ['2019-10-17', 300],
        ['2019-10-18', 100]
      ]
    }
  ]
};

            return {
                option,
                option2,
                option3,
            }
        },
    })
</script>