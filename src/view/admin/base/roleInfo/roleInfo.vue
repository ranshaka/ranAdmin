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
                    <a-form-item label="姓名">
                        <a-input v-model:value="search.name" placeholder="姓名" />
                    </a-form-item>
                    <a-form-item label="电话">
                        <a-input v-model:value="search.phone" placeholder="电话" />
                    </a-form-item>
                    <a-form-item label="部门">
                        <a-select default-value="部门" allowClear v-model:value="search.carType">
                            <a-select-option value="部门1" key="部门1">部门1</a-select-option>
                            <a-select-option value="部门2" key="部门2">部门2</a-select-option>
                            <a-select-option value="部门3" key="部门3">部门3</a-select-option>
                            <a-select-option value="部门4" key="部门4">部门4</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col flex="150px" type="flex" justify="space-around">
                <a-space size="large" align="end">
                    <a-button  type="primary">查询</a-button>
                    <a-button @click="extendAdd" type="danger" style="background:#D96565;border-color:#D96565">新增
                    </a-button>
                    <a-button @click="download" type="primary" style="background:#3EBEC0;border-color:#3EBEC0">导出
                    </a-button>
                </a-space>
            </a-col>
        </a-row>
        <div class="margin-top-2x padding-2x background">
            <a-table :columns="columns" :data-source="tableData" border style="width: 100%" class="width100"
                id="Export">
                <template #bodyCell="{ column, record }">

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
        <extendView ref="extendRef" @update:getlist="list"></extendView>
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
    import {
        EyeOutlined,
        CloseCircleOutlined,
        FormOutlined,
    } from '@ant-design/icons-vue'
    import extendView from "@/view/admin/base/roleInfo/roleInfoExt.vue"
    import userInfoExtView from "@/view/admin/base/userInfo/userInfoExt.vue"
    export default defineComponent({
        components: {
            EyeOutlined,
            FormOutlined,
            CloseCircleOutlined,
            extendView
        },
        setup() {
            const columns = [{
                title: '序号',
                dataIndex: 'tabIndex',
                customRender: (record) => `${record.index + 1}`
            }, {
                title: '名称',
                dataIndex: 'name',
            }, {
                title: '编号',
                dataIndex: 'number',
            }, {
                title: '负责人电话',
                dataIndex: 'phone',
            }, {}, {
                title: '负责人',
                dataIndex: 'role',
            }, {
                title: '注册日期',
                dataIndex: 'createTime',
            }, {
                title: '操作',
                dataIndex: 'operation',
            }];
            const tableData = [
                {
                    name: "admin",
                    number:15001,
                    phone: "1311521523",
                    department: "部门2",
                    role: "管理员",
                    createTime: "2023-01-01 00:00:00",
                },
                {
                    name: "李四",
                    number:15001,
                    phone: "1311521523",
                    department: "部门3",
                    role: "管理员",
                    createTime: "2023-01-01 00:00:00",
                },
                {
                    name: "王二",
                    number:15001,
                    phone: "1311521523",
                    department: "部门1",
                    role: "管理员",
                    createTime: "2023-01-01 00:00:00",
                },
                {
                    name: "麻子",
                    number:15001,
                    phone: "1311521523",
                    department: "部门3",
                    role: "管理员",
                    createTime: "2023-01-01 00:00:00",
                },
            ];
            const search = reactive({
                name: "",
                phone: ""
            })
            const extendRef=ref(null)
            const extendUpdate=(flag,item)=>{
                console.log(extendRef)
                extendRef.value.seeOrUpdate(item, flag)
            }
            const extendAdd=()=>{
                extendRef.value.add()
            }
            return {
                columns,
                tableData,
                search,
                extendRef,
                extendUpdate,
                extendAdd,

            }
        },
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