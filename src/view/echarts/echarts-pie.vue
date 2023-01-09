<template>
    <div class="content height100">
        <el-row class="height60">
            <el-col :span="12">
                <echarts :options="option" class="width100 height100"></echarts>
            </el-col>
            <el-col :span="12">
                <echarts :options="option2" class="width100 height100"></echarts>
            </el-col>
        </el-row>
        <echarts :options="option3" class="width100 height40"></echarts>
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
                legend: {
                    top: 'bottom'
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: false
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                series: [{
                    name: 'Nightingale Chart',
                    type: 'pie',
                    radius: [50, 150],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 8
                    },
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
            const option2 = {
                // tooltip: {
                //     trigger: 'item',
                //     formatter: '{a} <br/>{b}: {c} ({d}%)'
                // },
                legend: {
                    data: [
                        'Direct',
                        'Marketing',
                        'Search Engine',
                        'Email',
                        'Union Ads',
                        'Video Ads',
                        'Baidu',
                        'Google',
                        'Bing',
                        'Others'
                    ]
                },
                series: [{
                        name: 'Access From',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
                        label: {
                            position: 'inner',
                            fontSize: 14
                        },
                        labelLine: {
                            show: false
                        },
                        data: [{
                                value: 1548,
                                name: 'Search Engine'
                            },
                            {
                                value: 775,
                                name: 'Direct'
                            },
                            {
                                value: 679,
                                name: 'Marketing',
                                selected: true
                            }
                        ]
                    },
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['45%', '60%'],
                        labelLine: {
                            length: 30
                        },
                        data: [{
                                value: 1048,
                                name: 'Baidu'
                            },
                            {
                                value: 335,
                                name: 'Direct'
                            },
                            {
                                value: 310,
                                name: 'Email'
                            },
                            {
                                value: 251,
                                name: 'Google'
                            },
                            {
                                value: 234,
                                name: 'Union Ads'
                            },
                            {
                                value: 147,
                                name: 'Bing'
                            },
                            {
                                value: 135,
                                name: 'Video Ads'
                            },
                            {
                                value: 102,
                                name: 'Others'
                            }
                        ]
                    }
                ]
            };
            const data = [{
                    name: 'Apples',
                    value: 70
                },
                {
                    name: 'Strawberries',
                    value: 68
                },
                {
                    name: 'Bananas',
                    value: 48
                },
                {
                    name: 'Oranges',
                    value: 40
                },
                {
                    name: 'Pears',
                    value: 32
                },
                {
                    name: 'Pineapples',
                    value: 27
                },
                {
                    name: 'Grapes',
                    value: 18
                }
            ];
            const option3 = {
                title: [{
                        text: 'Pie label alignTo',
                        left: 'center'
                    },
                    {
                        subtext: 'alignTo: "none" (default)',
                        left: '16.67%',
                        top: '75%',
                        textAlign: 'center'
                    },
                    {
                        subtext: 'alignTo: "labelLine"',
                        left: '50%',
                        top: '75%',
                        textAlign: 'center'
                    },
                    {
                        subtext: 'alignTo: "edge"',
                        left: '83.33%',
                        top: '75%',
                        textAlign: 'center'
                    }
                ],
                series: [{
                        type: 'pie',
                        radius: '25%',
                        center: ['50%', '50%'],
                        data: data,
                        label: {
                            position: 'outer',
                            alignTo: 'none',
                            bleedMargin: 5
                        },
                        left: 0,
                        right: '66.6667%',
                        top: 0,
                        bottom: 0
                    },
                    {
                        type: 'pie',
                        radius: '25%',
                        center: ['50%', '50%'],
                        data: data,
                        label: {
                            position: 'outer',
                            alignTo: 'labelLine',
                            bleedMargin: 5
                        },
                        left: '33.3333%',
                        right: '33.3333%',
                        top: 0,
                        bottom: 0
                    },
                    {
                        type: 'pie',
                        radius: '25%',
                        center: ['50%', '50%'],
                        data: data,
                        label: {
                            position: 'outer',
                            alignTo: 'edge',
                            margin: 20
                        },
                        left: '66.6667%',
                        right: 0,
                        top: 0,
                        bottom: 0
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