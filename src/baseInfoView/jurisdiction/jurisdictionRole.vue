<!--
 * @name: name
 * @description: 角色权限管理
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="jurisdictionRole">
        <el-row :gutter="20" class="height100">
            <el-col :span="8">
                <el-card class="box-card height100">
                    <template #header>
                        <div class="card-header">
                            <span style="height:32px;">菜单列表</span>
                            <div></div>
                            <!-- <el-button class="button" text>Operation button</el-button> -->
                        </div>
                    </template>
                    <el-input v-model="filterText" placeholder="Filter keyword" />
                    <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
                        :filter-node-method="filterNode" @current-change="getCheckedNodes">
                     
                    </el-tree>
                </el-card>
            </el-col>

            <el-col :span="16" class="height100">
                <jurisdictionRoleExt :selectItem="selectItem"></jurisdictionRoleExt>

            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        reactive
    } from "@vue/reactivity";
    import {
        watch
    } from 'vue'
    import {
        ElTree
    } from 'element-plus'
    import jurisdictionRoleExt from "@/baseInfoView/jurisdiction/jurisdictionRoleExt"
    import store from "@/store";
    export default {
        components: {
            jurisdictionRoleExt
        },
        setup() {
            const filterText = ref("")
            const treeRef = ref(ElTree)
            const defaultProps = {
                children: 'children',
                label: 'label',
            }
            watch(filterText, (val) => {
                if (treeRef.value) treeRef.value.filter(val)
            })
            const filterNode = (value, data) => {
                if (!value) return true
                return data.label.includes(value)
            }
            const getCheckedNodes = (value, data) => {
                let item = JSON.parse(JSON.stringify(value))
                selectItem.value = item
            }

            // 放ajax 去除路由  序列化
            var aamenu = JSON.parse(JSON.stringify(store.getters.allMenu))
            const initArray = (array) => {
                if (!array) return
                if (Array.isArray(array)) {
                    return array.map(x => {
                        return {
                            ...x,
                            id: x.path,
                            label: x.meta.title,
                            children: initArray(x.children)
                        }
                    })
                } else {
                    return {
                        ...array,
                        id: array.path,
                        label: array.meta.title,
                        children: initArray(array.children)
                    }
                }

            }
            const data = ref(initArray(aamenu))
            const selectItem = ref("")
            selectItem.value = data.value[0]
            return {
                filterText,
                treeRef,
                data,
                defaultProps,
                filterNode,
                getCheckedNodes,

                // jurisdictionRoleExt
                selectItem,
                initArray,
            }
        },
    }
</script>
<style scoped lang="less">
    .jurisdictionRole {
        /deep/.el-tree-node__content {
            height: 34px;
        }
    }

    .card-header {

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>