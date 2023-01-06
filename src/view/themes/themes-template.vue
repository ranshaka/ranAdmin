<template>
    <div class="content ">
        <div class="">
            <div>
                <a-select v-model:value="themes" style="width: 120px" placeholder="请选择">
                    <a-select-option :value="false" label="白天主题">白天主题</a-select-option>
                    <a-select-option :value="true" label="黑夜主题">黑夜主题</a-select-option>
                </a-select>
            </div>
            <a-divider />
            <a-row :gutter="20">
                <a-col :span="12">
                    <div class="grid-content ep-bg-purple" />
                    <a-alert title="成功提示的文案" type="success" effect="dark"> </a-alert>
                    <a-alert title="消息提示的文案" type="info" effect="dark"> </a-alert>
                    <a-alert title="警告提示的文案" type="warning" effect="dark"> </a-alert>
                    <a-alert title="错误提示的文案" type="error" effect="dark"> </a-alert>
                </a-col>
                <a-col :span="12">
                    <a-row>
                        <a-button>默认按钮</a-button>
                        <a-button type="primary">主要按钮</a-button>
                        <a-button type="success">成功按钮</a-button>
                        <a-button type="info">信息按钮</a-button>
                        <a-button type="warning">警告按钮</a-button>
                        <a-button type="danger">危险按钮</a-button>
                    </a-row>
                    <a-row class="mt10">
                        <a-button plain>朴素按钮</a-button>
                        <a-button type="primary" plain>主要按钮</a-button>
                        <a-button type="success" plain>成功按钮</a-button>
                        <a-button type="info" plain>信息按钮</a-button>
                        <a-button type="warning" plain>警告按钮</a-button>
                        <a-button type="danger" plain>危险按钮</a-button>
                    </a-row>

                    <a-row class="mt10">
                        <a-button round>圆角按钮</a-button>
                        <a-button type="primary" round>主要按钮</a-button>
                        <a-button type="success" round>成功按钮</a-button>
                        <a-button type="info" round>信息按钮</a-button>
                        <a-button type="warning" round>警告按钮</a-button>
                        <a-button type="danger" round>危险按钮</a-button>
                    </a-row>
                </a-col>
            </a-row>
            <a-divider />
            <a-row :gutter="20">
                <a-col :span="12">
                    <a-table :data="tableData" style="width: 100%">
                        <a-table-column prop="date" label="日期"></a-table-column>
                        <a-table-column prop="name" label="姓名"></a-table-column>
                        <a-table-column prop="address" label="地址"></a-table-column>
                    </a-table>
                    <a-col class="mt10">
                        <a-pagination layout="prev, pager, next" :total="1000"></a-pagination>
                        <a-pagination background layout="prev, pager, next" :total="1000"></a-pagination>
                    </a-col>
                </a-col>
                <a-col :span="12">
                    <div>
                        <a-tag>标签一</a-tag>
                        <a-tag type="success">标签二</a-tag>
                        <a-tag type="info">标签三</a-tag>
                        <a-tag type="warning">标签四</a-tag>
                        <a-tag type="danger">标签五</a-tag>
                    </div>
                    <div class="demo-progress">
                        <a-progress :percentage="50" />
                        <a-progress :percentage="100" status="success" />
                        <a-progress :percentage="100" status="warning" />
                        <a-progress :percentage="50" status="exception" />
                    </div>
                    <div class="demo-progress">
                        <a-progress :percentage="50" :indeterminate="true" />
                        <a-progress :percentage="100" status="success" :indeterminate="true" :duration="5" />
                        <a-progress :percentage="100" status="warning" :indeterminate="true" :duration="1" />
                        <a-progress :percentage="50" status="exception" :indeterminate="true" />
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
    import {
        defineComponent,
        computed,
        ref,
    } from 'vue'
    import store from "@/store";
    export default defineComponent({
        components: {
        },
        setup() {
            // 白天/黑夜模式
            const themes = computed({
                get: () => store.getters.themes,
                set: (value) => {
                    console.log(value)
                    store.commit("baseinfo/SET_THEMES", value)
                    window.localStorage.setItem("themes", value)
                }
            })
            const tableData = ref([{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                },
                {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                },
            ])
            return {
                themes,
                tableData,
            }
        }
    })
</script>