<!--
 * @name: name
 * @description: 角色权限管理
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="height100">
        <el-card class="box-card height100" >
                    <template #header>
                        <div class="card-header">
                            <span>{{selectItem.label}}</span>
                            <el-button class="button" text>添加菜单</el-button>
                        </div>
                    </template>
                    <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column prop="date" label="Date" width="180" />
                <el-table-column prop="name" label="Name" width="180" />
                <el-table-column prop="address" label="Address" />
            </el-table>
                </el-card>
        <div>
          
        </div>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        watch,
        reactive
    } from "@vue/reactivity";
    import router from "@/router";
    import store from "@/store";
    export default {
        props:["selectItem"],
        setup(props) {
            console.log(props)
            console.log(props.selectItem)
            const selectItem=computed(()=>props.selectItem)
            const tableRowClassName = ({
                row,
                rowIndex,
            }) => {
                if (rowIndex === 1) {
                    return 'warning-row'
                } else if (rowIndex === 3) {
                    return 'success-row'
                }
                return ''
            }
            const tableData = ref([{
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ])

            return {
                selectItem,
                tableData,
                tableRowClassName
            }
        },
    }
</script>
<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>