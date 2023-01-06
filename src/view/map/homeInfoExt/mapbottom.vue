<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-22 13:24:13
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapbottom">
        <div class="mapbottom_box">
            <a-table :data="tableData"  style="width: 100%" class="width100" id="Export">
                <a-table-column prop="date" label="Date" width="150" />
                <a-table-column prop="name" label="Name" width="120" />
                <a-table-column prop="state" label="State" width="120" />
                <a-table-column prop="city" label="City" width="120" />
                <a-table-column label="Address" :show-overflow-tooltip="true">
                    <template #default="scope">
                        <div v-if="scope.row.flag" class="flex space-between">
                            <a-input v-model="scope.row.address" placeholder="Please input" clearable />
                            <div>
                                <a-link link type="success" @click="scope.row.flag=false" style="width:30px;">保存
                                </a-link>
                            </div>
                        </div>
                        <div v-else class="flex space-between">
                            <span>{{scope.row.address}}</span>
                            <a-link link type="primary" @click="scope.row.flag=true">修改</a-link>
                        </div>
                    </template>
                </a-table-column>
                <a-table-column prop="zip" label="Zip" width="120" />
                <a-table-column label="Operations" width="220">
                    <template #default>
                        <a-button type="primary" size="small" text bg>Detail</a-button>
                        <a-button type="success" size="small" text bg>Edit</a-button>
                    </template>
                </a-table-column>
            </a-table>
        </div>
    </div>
</template>

<script>
    import {
        defineComponent,
    } from 'vue';
    export default defineComponent({
        name: 'BusinessManagement',
        components: {},
        setup() {
            const tableData = [{
                    date: '2016-05-03',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Home',
                },

            ]
            return {
                tableData
            }
        }
    });
</script>
<style lang="less" scoped>
    .mapbottom {
        position: absolute;
        right: 31%;
        // top:37%;
        bottom: 0;
        height: 30%;
        width: 38%;
        color: #FFF;
        // background: url("../images/view/right.png");
        background-size: 100% 100%;
        z-index: 1;
        
        .mapbottom_box {
            background: url("../images/view/model.bg.png") ;
            background-size: 100% 100%;
            // background-size: cover cover;
            padding: 20px 10px;
            box-sizing: content-box;

            // 表格部分样式
            // 最外层透明
            /deep/ .a-table,

            /deep/ .a-table__expanded-cell {
                background-color: transparent;
                border-color: transparent !important;
                border: none !important;
                color: #fff;
                font-size: 24px;
                border: none !important;
            }
            /deep/ .a-table__inner-wrapper::before,
            /deep/ .a-table__inner-wrapper::after{
              display: none;
            }
            /deep/ .a-table::before,
            /deep/ .a-table::after{
              display: none;
            }

            /deep/  .a-table__border-left-patch{
                display: none;
            }
            /deep/ .a-table--border {
                border: none;
            }

            // 表格内背景颜色
            /deep/ .a-table th {
                background-color: transparent;
                border: 0px;
                color: #fff;
                font-size: 16px;
                height: 5px;
                font-family: Source Han Sans CN Normal, Source Han Sans CN Normal-Normal;
                font-weight: Normal;
            }

            /deep/ .a-table tr,
            /deep/ .a-table td {
                background-color: transparent;
                border: 0px;
                color: #aaa;
                font-size: 14px;
                height: 5px;
                font-family: Source Han Sans CN Normal, Source Han Sans CN Normal-Normal;
                font-weight: Normal;
            }

            // 去掉最下面的那一条线
            .a-table::before {
                height: 0px;
            }

            // 设置表格行高度
            /deep/ .a-table__body tr,
            /deep/ .a-table__body td {
                padding: 10px;
                // height: px;
            }

            // 修改高亮当前行颜色
            /deep/ .a-table tbody tr:hover>td {
                background: #063570 !important;
                color: #fff !important;
            }

            // 取消当前行高亮
            // /deep/ .a-table tbody tr {
            // pointer-events: none;
            // }

            // 修改表头样式-加边框
            /deep/ .a-table__header-wrapper {
                // border: solid 1px #04c2ed;
                // box-sizing: border-box;
            }

            // 表格斑马自定义颜色
            /deep/ .a-table__row.warning-row {
                background: #063570;
            }

            // 滚动条样式
            /deep/ .a-table__body-wrapper::-webkit-scrollbar-track {
                background-color: #063570;
            }

            /deep/ .a-table__body-wrapper::-webkit-scrollbar {
                width: 10px;
                opacity: 0.5;
            }

            /deep/ .a-table__body-wrapper::-webkit-scrollbar-thumb {
                border-radius: 15px;
                background-color: #0257aa;
            }

        }
    }
</style>