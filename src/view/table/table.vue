
<template>
    <div class="content">
        <div class="flexis space-between padding-box">
            <el-form :inline="true" label-position="left" :model="formInline" class="demo-form-inline">
                <el-form-item label="Approved by">
                    <el-input v-model="formInline.user" placeholder="Approved by" />
                </el-form-item>
                <el-form-item label="Activity zone">
                    <el-select v-model="formInline.region" placeholder="Activity zone">
                        <el-option label="Zone one" value="shanghai" />
                        <el-option label="Zone two" value="beijing" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div>
                <el-button type="primary" @click="onSubmit">搜索</el-button>
                <el-button type="warning" @click="Export('Export','Export')">下载</el-button>
            </div>
        </div>
        
        <el-table :data="tableData" border style="width: 100%" class="width100" id="Export">
            <el-table-column prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column label="Address" :show-overflow-tooltip="true" >
                <template #default="scope">
                    <div v-if="scope.row.flag" class="flex space-between">
                        <el-input v-model="scope.row.address" placeholder="Please input" clearable />
                        <div><el-link link type="success" @click="scope.row.flag=false" style="width:30px;">保存</el-link></div>
                    </div>
                    <div v-else class="flex space-between">
                        <span>{{scope.row.address}}</span>
                        <el-link link  type="primary" @click="scope.row.flag=true">修改</el-link>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="zip" label="Zip" width="120" />
            <el-table-column label="Operations" width="220">
                <template #default>
                    <el-button type="primary" size="small" text bg>Detail</el-button>
                    <el-button type="success" size="small" text bg>Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="tableData" stripe style="width: 100%" class="width100 margin-top-2x">
            <el-table-column prop="date" label="Date" width="150" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="state" label="State" width="120" />
            <el-table-column prop="city" label="City" width="120" />
            <el-table-column prop="address" label="Address" />
            <el-table-column prop="zip" label="Zip" width="120" />
            <el-table-column label="Operations" width="220">
                <template #default>
                    <el-tag type="primary">查看</el-tag>
                    <el-tag type="success">修改</el-tag>
                    <el-tag type="danger">删除</el-tag>
                </template>
            </el-table-column>
        </el-table>
        <el-table :data="tableData2" border show-summary style="width: 100%" class="margin-top-2x">
            <el-table-column prop="id" label="ID" width="180" />
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="amount1" sortable label="Amount 1" />
            <el-table-column prop="amount2" sortable label="Amount 2" />
            <el-table-column prop="amount3" sortable label="Amount 3" />
        </el-table>
 

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
    export default {
        name: "publicView",
        setup() {
            const search=ref("")
            const formInline = ref({
                user: "",
                region: "",
            })
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
            const tableData2 =[
  {
    id: '12987122',
    name: 'Tom',
    amount1: '234',
    amount2: '3.2',
    amount3: 10,
  },
  {
    id: '12987123',
    name: 'Tom',
    amount1: '165',
    amount2: '4.43',
    amount3: 12,
  },
  {
    id: '12987124',
    name: 'Tom',
    amount1: '324',
    amount2: '1.9',
    amount3: 9,
  },
  {
    id: '12987125',
    name: 'Tom',
    amount1: '621',
    amount2: '2.2',
    amount3: 17,
  },
  {
    id: '12987126',
    name: 'Tom',
    amount1: '539',
    amount2: '4.1',
    amount3: 15,
  },
]


        const Export=(id, name)=> {
            var uri = "data:application/vnd.ms-excel;base64,",
                    template =
                        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                    base64 = function (s) {
                        return window.btoa(unescape(encodeURIComponent(s)));
                    },
                    format = function (s, c) {
                        return s.replace(/{(\w+)}/g, function (m, p) {
                            return c[p];
                        });
                    };

                var table = document.getElementById("tables");

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
            return {
                search,
                tableData,
                tableData2,
                formInline,
                Export,
            }
        },
    }
</script>