<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 15:52:03
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <a-row type="flex">
                <a-col flex="auto">
                    <a-form type="flex" layout="inline">
                        <a-form-item label="车牌号">
                            <a-input v-model:value="query.plateNumber" placeholder="车牌号"
                                style="width: 200px;" />
                        </a-form-item>
                        <!-- <a-form-item label="驾驶员">
                            <a-input v-model:value="query.sign" placeholder="驾驶员" style="width: 200px;" />
                        </a-form-item>
                        <a-form-item label="车辆类型">
                            <a-select default-value="车辆类型" allowClear style="width: 120px" v-model:value="query.managementUnitName">
                                <a-select-option :value="value.companyId" v-for="value in companyArr" :key="value.companyId">
                                    {{value.companyName}}
                                </a-select-option>
                            </a-select>
                        </a-form-item> -->
                    </a-form>
                </a-col>
                <a-col flex="80px" type="flex" justify="space-around">
                    <a-space size="large" align="end">
                        <a-button @click="geilist(1)" type="primary">查询</a-button>
                    </a-space>
                </a-col>
            </a-row>

        <a-table :columns="columns" :data-source="table" :rowKey="record=>record.numberPlate" 
        :pagination="pagination"  @change="handleTableChange" 
        class="zdytable scroll" >
        <template #tabIndex="{ index }">
                        <span>{{(parseInt(pagination.current)  - 1) * 10 + index + 1}} </span>
                    </template>
    </a-table>
    </div>
   
</template>
<script>
    import {
        defineComponent,
        ref,
        computed,
        watch,
        watchEffect,
    } from 'vue';
    
    export default defineComponent({
        name: 'BusinessManagement',
        components: {},
        props: ['infos'],
        
        setup(props) {
            watch (props,()=>{
                query.value.plateNumber=""
                geilist()
            })
            const total = ref(0),
                current = ref(1),
                pageSize = ref(10),
                tableIndex = ref(1)
            const table =ref([])
            const pagination = computed(() => ({
                total: total.value,
                current: current.value,
                pageSize: pageSize.value,
            }));
            const  query = ref({
                plateNumber:"",
                })
            const  columns =[
                     {
                        title: '序号',
                        dataIndex: 'index',
                        key: 'index',
                        align: 'center',
                        slots: {
                            customRender: 'tabIndex'
                        },
                    },
                    {
                        title: '车牌号',
                        dataIndex: 'numberPlate',
                        slots: {
                            customRender: 'plateNumber',
                        },
                    },
                    {
                        title:"客户单位",
                        dataIndex:'managementUnitNameStr'
                    },
                    {
                        title: '车辆类型',
                        dataIndex: 'vehicleTypeStr',
                    },
                    {
                        title: '车辆型号',
                        dataIndex: 'vehicleModel',
                    },
                    {
                        title: '接入日期',
                        dataIndex: 'accessDateStr',
                    },
                    {
                        title: '车辆在线状态',
                        dataIndex: 'onlineStatus',
                    },
                ]
            const geilist = (index=1) => {
              
                current.value = index
                large_screen_vehicles_list( {
                    "pageNum": current.value,
                    "pageSize": 10,
                    problemType:props.infos.type,
                    "queryParameter": query.value.plateNumber,
                    ...query.value,
                    
                }).then((res) => { 
                    if (res.code== 200) {
                        let list = res.data.list
                        table.value = list
                        total.value = res.data.total

                        console.log(pagination.value)
                    }
                })
            }
            const handleTableChange=(page)=>{
                geilist(page.current)
            }

            
            const init=()=>{
                geilist()
            }
            geilist()
            return {
                table,
                columns,
                pagination,
                query,
                init,
                geilist,
                handleTableChange,
            }
        }
    });
</script>
<style lang="less" scoped>

</style>