
<template>
    <div class="content width100 minHeight100">
        <el-row :gutter="20">
            <el-col :span="12">
                <el-upload class="upload-demo" drag @change="fileChange" :auto-upload="false"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    multiple>
                    <el-icon class="el-icon--upload">
                        <upload-filled />
                    </el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            上传excel 获取文件里面内容
                        </div>
                    </template>
                </el-upload>
            </el-col>
            <el-col :span="6">
                <el-upload ref="uploadRef" class="upload-demo" @change="fileChange"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    :auto-upload="false">
                    <template #trigger>
                        <el-button type="primary">选择文件</el-button>
                    </template>
                    <template #tip>
                        <div class="el-upload__tip">
                            excel files with a size less than 500kb
                        </div>
                    </template>
                </el-upload>
            </el-col>
            <el-col :span="6">
                <el-button type="success" @click="CommitEcel">调用原生input 上传excle  </el-button>
            </el-col>
        </el-row>
        <el-table :data=" dataTable.slice((currentPage - 1) * PageSize, currentPage * PageSize)" stripe
            style="width: 100%" class="width100">
            <el-table-column :prop="value.prop" :label="value.label" v-for="(value) in column" :key="value.prop">
            </el-table-column>
        </el-table>
        <div class="flex space-between margin-top">
            <div></div>
            <el-pagination background :current-page="currentPage" @current-change="currentPageChange"
                layout="prev, pager, next" :total="dataTable.length" />
        </div>
        <input id="UpdataExcel2" @change="fileChange" type="file" name="file" style="display:none"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    </div>
</template>
<script>

import {
        defineComponent,
        computed,
        ref,
    } from 'vue'
    import {
        read,
        utils
    } from 'xlsx'
    export default defineComponent({
        components: {},
        setup() {
            const dataTable = ref([])
            const column = ref([])
            const currentPage = ref(1)
            const PageSize = ref(10)
            /**
             * @description:  获取input 上传excel 内容
             * @param {*} e
             * @return {*}
             */
            const fileChange = (e, f) => {
                let files = e && e.target && e.target.files ? e.target.files : e.target
                if (!files) return
                var fileReader = new FileReader();
                fileReader.onload = function (ev) {
                    try {
                        var data = ev.target.result,
                            workbook = read(data, {
                                type: 'binary'
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        console.log(e)
                        return;
                    }
                    // 遍历每张表读取
                    var fromTo = '';
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            fromTo = workbook.Sheets[sheet]['!ref'];
                            persons = persons.concat(utils.sheet_to_json(workbook.Sheets[sheet]));
                        }
                    }
                    try {
                        // excel 数据再处理
                        let columnArr = [] // 定义表头
                        let i = 0
                        for (let x in persons[0]) {
                            columnArr.push({
                                prop: "ranAdmin" + i,
                                label: x
                            })
                            i++
                        }
                        column.value = columnArr
                        let result = persons.map(v => {
                            let i = 0
                            let json = {}
                            for (let x in v) {
                                json["ranAdmin" + i] = v[x]
                                i++
                            }
                            return json
                        })
                        dataTable.value = result // 定义数据

                    } catch {

                    }
                };
                // 以二进制方式打开文件
                fileReader.readAsBinaryString(files && files.length ? files[0] : files);
            }

            /**
             * @description:  原生js 调用input 上传事件
             */
            const CommitEcel = (e) => {
                let _file = document.getElementById("UpdataExcel2")
                if (_file.files) {
                    _file.value = "";
                } else {
                    if (typeof _file != "object") return null;
                    var _span = document.createElement("span");
                    _span.id = "__tt__";
                    _file.parentNode.insertBefore(_span, _file);
                    var tf = document.createElement("form");
                    tf.appendChild(_file);
                    document.getElementsByTagName("body")[0].appendChild(tf);
                    tf.reset();
                    _span.parentNode.insertBefore(_file, _span);
                    _span.parentNode.removeChild(_span);
                    _span = null;
                    tf.parentNode.removeChild(tf);
                }
                _file.click()
            }

            const currentPageChange=(e)=>{
                currentPage.value=e
            }
            const fileList = ref([])
            return {
                fileChange,
                CommitEcel,
                currentPageChange,
                fileList,
                dataTable,
                column,
                PageSize,
                currentPage,
            }
        }
    })
</script>