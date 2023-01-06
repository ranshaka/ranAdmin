<template>
    <div >
        <div class="margin-bottom">
            <a-button type="primary" @click="Exports('Export','table',true)">原生js 导出table 不带样式 </a-button>
            <a-button type="primary" @click="Exports('Export','table')" class="margin-lr-2x">原生js 导出table 自定义样式 </a-button>
            <a-button type="primary" @click="ExportsStyle('Export','table')">xlsx 导出table </a-button>
        </div>
        <a-table :columns="columns" :data-source="data" id="table">

        </a-table>

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


            const columns = [{
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                    width: 80,
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address 1',
                    ellipsis: true,
                },
                {
                    title: 'Long Column Long Column Long Column',
                    dataIndex: 'address',
                    key: 'address 2',
                    ellipsis: true,
                },
                {
                    title: 'Long Column Long Column',
                    dataIndex: 'address',
                    key: 'address 3',
                    ellipsis: true,
                },
                {
                    title: 'Long Column',
                    dataIndex: 'address',
                    key: 'address 4',
                    ellipsis: true,
                },
            ];

            const data = [{
                    key: '1',
                    name: 'John Brown',
                    age: 32,
                    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
                    tags: ['nice', 'developer'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '2',
                    name: 'Jim Green',
                    age: 42,
                    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
                    tags: ['loser'],
                },
                {
                    key: '3',
                    name: 'Joe Black',
                    age: 32,
                    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
                    tags: ['cool', 'teacher'],
                },
            ];

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
                console.log(document.getElementByTagName('table'))
                // 一.导出的表格名
                let dateVal = name + '.xlsx'
                // 二.获取DOM上的表格并生成表格对象
                let workbook = utils.table_to_book(document.getElementByTagName('table'))
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
                columns,
                data,
                PageSize,
                currentPage,

            }
        }
    })
</script>