<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 15:51:38
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <a-row type="flex">
                <a-col flex="auto">
                    <a-form type="flex" layout="inline">
                        <a-form-item label="关键字">
                            <a-input v-model:value="query.searchText" placeholder="关键字"
                                style="width: 200px;" />
                        </a-form-item>
                        <a-form-item label="关键字">
                            <a-range-picker style="width: 400px" v-model:value="query.time"  show-time
                            format="YYYY/MM/DD HH:mm:ss"  />
                        </a-form-item>
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
        class="zdytable scroll" :scroll="{ x: 800 }">
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
        watch
    } from 'vue';
    import {
        formatDateTime
    } from "@/utils";
    export default defineComponent({
        name: 'BusinessManagement',
        components: {},
        props: ['infos'],
        setup(props) {
            watch(props,()=>{
                console.log(props)
                query.value.searchText=""
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
                time:[formatDateTime(new Date(),"YYYY")+" 00:00:00",formatDateTime(new Date())],
                searchText:"",
                })
                const     columns = [
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
                    },
                    {
                        title: '公司',
                        dataIndex: 'managementUnitNameStr',
                    },
                    {
                        title: '设备类型',
                        dataIndex: 'vehicleTypeStr',
                    },
                    {
                        title: '处理状态',
                        dataIndex: 'dispositionStatusStr',
                    },
                    {
                        title: '预警时间',
                        dataIndex: 'alarmOccurrenceTime',
                    },
                   
                ];
            const geilist = (index=1) => {
                console.log(12313)
                current.value = index
                big_screen_travel_alarm_list( {
                    "pageNum": current.value,
                    "pageSize": 10,
                    "queryParameter": query.value.searchText,
                    "startTime":formatDateTime(query.value.time[0]),
                    "endTime":formatDateTime(query.value.time[1]),
                    travelFailureType:props.infos.type
                }).then((res) => { 
                    if (res.code== 200) {
                        let list = res.data.list
                        table.value = list
                        total.value = res.data.total
                    }
                })
            }
            const handleTableChange=(page)=>{
                geilist(page.current)
            }
            geilist()
            return {
                table,
                columns,
                pagination,
                query,
                geilist,
                handleTableChange,
            }
        }
    });
</script>
<style lang="less" scoped>

</style>