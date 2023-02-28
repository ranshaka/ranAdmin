<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="ant-content ">
        <a-row type="flex">
            <a-col flex="auto">
                <a-form type="flex" layout="inline">
                    <a-form-item label="名称">
                        <a-input v-model:value="search.name" placeholder="名称" />
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col flex="150px" type="flex" justify="space-around">
                <a-space size="large" align="end">
                    <a-button  type="primary">查询</a-button>
                    <a-button @click="extendAdd" type="primary" style="background:#3EBEC0;border-color:#3EBEC0" >添加子菜单
                    </a-button>
                </a-space>
            </a-col>
        </a-row>
        <div class="margin-top-2x padding-2x background">
            <div>父菜单</div>
            <a-table :columns="columns" :data-source="datainfo" :pagination="false" :childrenColumnName="'children2'" :indentSize="100" border style="width: 100%" class="width100"
                id="Export">
                <template #bodyCell="{ column, record }">

                    <template v-if="column.dataIndex == 'icon' ">
                        <svg v-if="record.icon" class="icon-4x " aria-hidden="true">
                                <use :xlink:href="record.icon">
                                </use>
                            </svg>
                            <span v-else>---</span>
                    </template>
                    <template v-if="column.dataIndex == 'operation' ">
                        <span>
                            <a-button class="ml10 margin-right-1x" size="small" @click="extendUpdate(false,record)">
                                <FormOutlined title="编辑"  />
                            </a-button>
                            <a-popconfirm title="是否删除？" ok-text="是" cancel-text="否"
                                @confirm="personDelete(record.boxId)">
                                <a-button class="ml10" size="small">
                                    <CloseCircleOutlined title="删除" />
                                </a-button>
                            </a-popconfirm>
                        </span>
                    </template>
                </template>
            </a-table>

            <div class="margin-top-2x">子菜单</div>
            <a-table :columns="columns" :data-source="tableData" border style="width: 100%" class="width100"
                id="Export">
                <template #bodyCell="{ column, record }">

                    <template v-if="column.dataIndex == 'icon' ">
                        <svg v-if="record.icon" class="icon-4x " aria-hidden="true">
                                <use :xlink:href="record.icon">
                                </use>
                            </svg>
                            <span v-else>---</span>
                    </template>
                    <template v-if="column.dataIndex == 'operation' ">
                        <span>
                            <a-button class="ml10 margin-right-1x" size="small" @click="extendUpdate(true,record)" >
                                <EyeOutlined title="查看" />
                            </a-button>
                            <a-button class="ml10 margin-right-1x" size="small" @click="extendUpdate(false,record)">
                                <FormOutlined title="编辑"  />
                            </a-button>
                            <a-popconfirm title="是否删除？" ok-text="是" cancel-text="否"
                                @confirm="personDelete(record.boxId)">
                                <a-button class="ml10" size="small">
                                    <CloseCircleOutlined title="删除" />
                                </a-button>
                            </a-popconfirm>
                        </span>
                    </template>
                </template>
            </a-table>
        </div>
        <menuExt_Model ref="menuExt_Model_ref"></menuExt_Model>
    </div>
</template>

<script setup>
    import {
        computed,
        defineComponent,
        reactive, //响应式
        ref,
    } from 'vue';
    import {
        EyeOutlined,
        CloseCircleOutlined,
        FormOutlined,
    } from '@ant-design/icons-vue'
    import menuExt_Model from "@/view/admin/menu/menuExt_Model.vue"


            const columns = [{
                title: '序号',
                dataIndex: 'tabIndex',
                customRender: (record) => `${record.index + 1}`
            }, {
                title: '菜单名称-中文',
                dataIndex: 'cn',
            }, {
                title: '菜单名称-英文',
                dataIndex: 'en',
            }, {
                title: '路由',
                dataIndex: 'path',

            }, {
                title: '图标',
                dataIndex: 'icon',
            }, {
                title: '注册日期',
                dataIndex: 'createTime',
            }, {
                title: '操作',
                dataIndex: 'operation',
            }];
            const datainfo=ref()
            const tableData =ref([])
            const search = reactive({
                name: "",
                phone: ""
            })
      
            const init=(item)=>{
                datainfo.value=[item]
                tableData.value=item.children
        
            }

            const menuExt_Model_ref=ref()


            const extendUpdate=(falg,item)=>{
                menuExt_Model_ref.value.init(falg,item)
            }
            const extendAdd=(item)=>{
                menuExt_Model_ref.value.add(item)
            }



            defineExpose({
                init,
                extendAdd,
            })



</script>
<style lang="less" scoped>
    /deep/.ant-select {
        min-width: 160px;
    }

    /deep/.ant-input {
        min-width: 160px;
    }

</style>