
<template>
    <div class="content minHeight100">

            <div class="header">
            <div>
                <el-select v-model="currentSkinName" style="width: 120px" placeholder="请选择" @change="switchTheme">
                    <el-option v-for="(item,index) in Object.keys(themeColorObj)" :key="index"
                        :label="themeColorObj[item].title" :value="item">
                    </el-option>
                </el-select>
            </div>
            <el-divider />
            <el-row :gutter="20">
                <el-col :span="12">
                    <div class="grid-content ep-bg-purple" />
                    <el-alert title="成功提示的文案" type="success" effect="dark"> </el-alert>
                    <el-alert title="消息提示的文案" type="info" effect="dark"> </el-alert>
                    <el-alert title="警告提示的文案" type="warning" effect="dark"> </el-alert>
                    <el-alert title="错误提示的文案" type="error" effect="dark"> </el-alert>
                </el-col>
                <el-col :span="12">
                    <el-row>
                        <el-button>默认按钮</el-button>
                        <el-button type="primary">主要按钮</el-button>
                        <el-button type="success">成功按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                        <el-button type="warning">警告按钮</el-button>
                        <el-button type="danger">危险按钮</el-button>
                    </el-row>
                    <el-row class="mt10">
                        <el-button plain>朴素按钮</el-button>
                        <el-button type="primary" plain>主要按钮</el-button>
                        <el-button type="success" plain>成功按钮</el-button>
                        <el-button type="info" plain>信息按钮</el-button>
                        <el-button type="warning" plain>警告按钮</el-button>
                        <el-button type="danger" plain>危险按钮</el-button>
                    </el-row>

                    <el-row class="mt10">
                        <el-button round>圆角按钮</el-button>
                        <el-button type="primary" round>主要按钮</el-button>
                        <el-button type="success" round>成功按钮</el-button>
                        <el-button type="info" round>信息按钮</el-button>
                        <el-button type="warning" round>警告按钮</el-button>
                        <el-button type="danger" round>危险按钮</el-button>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider />
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="date" label="日期"></el-table-column>
                        <el-table-column prop="name" label="姓名"></el-table-column>
                        <el-table-column prop="address" label="地址"></el-table-column>
                    </el-table>
                    <el-col class="mt10">
                        <el-pagination layout="prev, pager, next" :total="1000"></el-pagination>
                        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                    </el-col>
                </el-col>
                <el-col :span="12">
                    <div>
                        <el-tag>标签一</el-tag>
                        <el-tag type="success">标签二</el-tag>
                        <el-tag type="info">标签三</el-tag>
                        <el-tag type="warning">标签四</el-tag>
                        <el-tag type="danger">标签五</el-tag>
                    </div>
                    <div class="demo-progress">
                        <el-progress :percentage="50" />
                        <el-progress :percentage="100" status="success" />
                        <el-progress :percentage="100" status="warning" />
                        <el-progress :percentage="50" status="exception" />
                    </div>
                    <div class="demo-progress">
                        <el-progress :percentage="50" :indeterminate="true" />
                        <el-progress :percentage="100" status="success" :indeterminate="true" :duration="5" />
                        <el-progress :percentage="100" status="warning" :indeterminate="true" :duration="1" />
                        <el-progress :percentage="50" status="exception" :indeterminate="true" />
                    </div>
                </el-col>
            </el-row>
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
    import {
        changeTheme
    } from "@/common/themes/index"
    export default defineComponent({
        components: {},
        setup() {
            console.log(store.getters.themes)
            const currentSkinName = ref(store.getters.themes)
            const themeColorObj = ref({
                defaultTheme: {
                    title: '浅色主题'
                },
                darkTheme: {
                    title: '深色主题'
                }
            })
            //themes 
            // 根据不同的主题类型 获取不同主题数据
            const switchTheme = (type=currentSkinName.value) => {
                changeTheme(type)
            }
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
                currentSkinName,
                themeColorObj,
                switchTheme,
    

                // 
                tableData,
            }
        }
    })
</script>