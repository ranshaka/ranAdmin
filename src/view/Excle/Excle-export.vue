
<template>
    <div class="content minHeight100 ">
        <div class="margin-bottom">
            <el-button type="primary" @click="Exports('Export','table',true)">原生js 导出table 不带样式 </el-button>
            <el-button type="primary" @click="Exports('Export','table')">原生js 导出table 自定义样式 </el-button>
            <el-button type="primary" @click="ExportsStyle('Export','table')">xlsx 导出table </el-button>
        </div>
        <el-table :data="dataTable.slice((currentPage - 1) * PageSize, currentPage * PageSize)" border
            style="width: 100%" class="width100" id="Export">
            <el-table-column prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column label="Address">
                <template #default="scope">
                    <div v-if="scope.row.flag" class="flex space-between">
                        <el-input v-model="scope.row.address" placeholder="Please input" clearable />
                        <div>
                            <el-link link type="success" @click="scope.row.flag=false" style="width:30px;">保存</el-link>
                        </div>
                    </div>
                    <div v-else class="flex space-between">
                        <span>{{scope.row.address}}</span>
                        <el-link link type="primary" @click="scope.row.flag=true">修改</el-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zip" label="Zip" width="120" />
        </el-table>
        <div class="flex space-between margin-top">
            <div></div>
            <el-pagination background :current-page="currentPage" @current-change="currentPageChange"
                layout="prev, pager, next" :total="dataTable.length" />
        </div>
    </div>
</template>
<script>
    import {
        defineComponent,
        computed,
        ref,
    } from 'vue'
    import {
        writeFile,
        utils
    } from 'xlsx'
    export default defineComponent({
        components: {},
        setup() {
            const dataTable = [{
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
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    state: 'California',
                    city: 'Los Angeles',
                    address: 'No. 189, Grove St, Los Angeles',
                    zip: 'CA 90036',
                    tag: 'Office',
                },
            ]
            const column = ref([])
            const currentPage = ref(1)
            const PageSize = ref(10)


            const currentPageChange = (e) => {
                currentPage.value = e
            }



            /**
             * @description:  原生js 导出表格
             * @param {*} id   原速id
             * @param {*} name   导出文件名称
             * @return {*}
             */
            const Exports = (id, name, falg) => {
                var uri = 'data:application/vnd.ms-excel;base64,';
                var template =
                    '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>' +
                    '<x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets>' +
                    '</x:ExcelWorkbook></xml><![endif]-->' +
                    ' <style type="text/css">' +
                    'table td {' +
                    'border: 1px solid #000000;' +
                    'width: 200px;' +
                    'height: 30px;' +
                    ' text-align: center;' +
                    'background-color: #4f891e;' +
                    'color: #ffffff;' +
                    ' }' +
                    '</style>' +
                    '</head><body ><table class="excelTable">{table}</table></body></html>';
                if (falg) {
                    template =
                        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'

                }

                var base64 = function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)));
                    },
                    format = function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        });
                    };

                var table = document.getElementById(id);

                //console打印出table.innerHTML出则是table的页面代码
                //根据正则表达式，把style='mso-number-format:"\@"' 塞入td中,将数据转成String
                table.innerHTML = table.innerHTML.replace(
                    /<td/g,
                    "<td STYLE='MSO-NUMBER-FORMAT:\\@'"
                );

                var ctx = {
                    worksheet: name || "Worksheet",
                    table: table.innerHTML,
                }; //此时的innerHTML数据可以自己自定义 比如json转化 只要值要数据符合即可
                var link = document.createElement("A");
                link.href = uri + base64(format(template, ctx));
                link.download = name + ".xls";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }

            /**
             * @description:   xlsx 导出表格 并修改样式
             * @param {*} id   原速id
             * @param {*} name   导出文件名称
             * @return {*}
             */
            const ExportsStyle = (id, name) => {
                // 一.导出的表格名
                let dateVal = name + '.xlsx'
                // 二.获取DOM上的表格并生成表格对象
                let workbook = utils.table_to_book(document.getElementById(id))
                // 三.调整样式---下面我只是调整了前五列的宽度，其他的样式调整请参考https://www.npmjs.com/package/xlsx
                let wscols = [{
                        wch: 40
                    },
                    {
                        wch: 10
                    },
                    {
                        wch: 10
                    },
                    {
                        wch: 10
                    },
                    {
                        wch: 150
                    }
                ];
                // workbook.SheetNames[0]获取到到是文件里的到第一个表格
                workbook.Sheets[workbook.SheetNames[0]]['!cols'] = wscols
                // 四.导出表格
                try {
                    writeFile(workbook, dateVal);
                } catch (e) {
                    console.log(e, workbook);
                }
            }




            return {
                currentPageChange,
                Exports,
                ExportsStyle,
                dataTable,
                column,
                PageSize,
                currentPage,
            }
        }
    })
</script>