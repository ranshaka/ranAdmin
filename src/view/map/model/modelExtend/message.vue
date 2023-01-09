<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-22 13:28:23
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <a-row type="flex">
            <a-col flex="auto">
                <a-form type="flex" layout="inline">
                    <a-form-item label="关键字">
                        <a-input v-model:value="query" placeholder="关键字" style="width: 200px;" />
                    </a-form-item>

                </a-form>
            </a-col>
            <a-col flex="80px" type="flex" justify="space-around">
                <a-space size="large" align="end">
                    <a-button @click="geilist(1)" type="primary">查询</a-button>
                </a-space>
            </a-col>
        </a-row>

        <a-table :columns="columns" :data-source="table" :rowKey="record=>record.numberPlate" :pagination="pagination"
            @change="handleTableChange" class="zdytable scroll">
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
            watch(props, () => {
                query.value.plateNumber = ""
                geilist()
            })
            const total = ref(0),
                current = ref(1),
                pageSize = ref(10),
                tableIndex = ref(1)
            const table = ref([])
            const pagination = computed(() => ({
                total: total.value,
                current: current.value,
                pageSize: pageSize.value,
            }));

            return {
       
            }
        }
    });
</script>
<style lang="less" scoped>

</style>