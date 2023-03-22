<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-01-11 11:37:36
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="mapbottom">
        <div class="mapbottom_box">
            <a-table  :columns="columns" :data-source="tableData" style="width: 98%;margin:0 auto" 
            :scroll="{ x: 'calc(700px + 50%)', y: 140 }"
            class="width100" id="Export">
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
            const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
}, {
  title: 'Platform',
  dataIndex: 'platform',
  key: 'platform',
}, {
  title: 'Version',
  dataIndex: 'version',
  key: 'version',
}, {
  title: 'Upgraded',
  dataIndex: 'upgradeNum',
  key: 'upgradeNum',
}, {
  title: 'Creator',
  dataIndex: 'creator',
  key: 'creator',
}, {
  title: 'Date',
  dataIndex: 'createdAt',
  key: 'createdAt',
}, {
  title: 'Action',
  key: 'operation',
}];
const tableData = [];
for (let i = 0; i < 3; ++i) {
    tableData.push({
    key: i,
    name: `Screem ${i + 1}`,
    platform: 'iOS',
    version: '10.3.4.5654',
    upgradeNum: 500,
    creator: 'Jack',
    createdAt: '2014-12-24 23:12:00',
  });
}
            return {
                tableData,
                columns
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