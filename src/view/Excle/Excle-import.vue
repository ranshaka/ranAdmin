<template>
    <div >
        <a-row :gutter="20" style="min-height:200px;" class="margin-bottom-2x">
            <a-col :span="12">
                <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true" 
                action="//jsonplaceholder.typicode.com/posts/"
                @change="fileChange"
                 @drop="fileChange">
                    <p class="ant-upload-drag-icon">
                        <inbox-outlined></inbox-outlined>
                    </p>
                    <p class="ant-upload-text">Click or drag file to this area to upload</p>
                    <p class="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </a-upload-dragger>
              
            </a-col>
            <a-col :span="6">
                <a-upload ref="uploadRef" class="upload-demo" @change="fileChange"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    :auto-upload="false">
                    <template #trigger>
                        <a-button type="primary">选择文件</a-button>
                    </template>
                    <template #tip>
                        <div class="a-upload__tip">
                            excel files with a size less than 500kb
                        </div>
                    </template>
                </a-upload>
            </a-col>
            <a-col :span="6">
                <a-button type="success" @click="CommitEcel">调用原生input 上传excle </a-button>
            </a-col>
        </a-row>

        <a-table :columns="columns" :data-source="data">

        </a-table>
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
    import {
        notification
    } from 'ant-design-vue';
    import { message } from 'ant-design-vue';
    export default defineComponent({
        components: {},
        setup() {
            const data = ref([])
            const columns = ref([])
            const currentPage = ref(1)
            const PageSize = ref(10)
            /**
             * @description:  获取input 上传excel 内容
             * @param {*} e
             * @return {*}
             */
            const fileChange = (e, f) => {
                console.log(e)
                let files = e && e.target && e.target.files ? e.target.files : e.file.originFileObj
                if (!files) return
                var fileReader = new FileReader();

                fileReader.onload = function (ev) {
                    try {
                        var datas = ev.target.result,
                            workbook = read(datas, {
                                type: 'binary'
                            }), // 以二进制流方式读取得到整份excel表格对象
                            persons = []; // 存储获取到的数据
                    } catch (e) {
                        console.log(e)
                        return;
                    }
                    // 遍历每张表读取
                    for (var sheet in workbook.Sheets) {
                        if (workbook.Sheets.hasOwnProperty(sheet)) {
                            // fromTo = workbook.Sheets[sheet]['!ref'];
                            persons = persons.concat(utils.sheet_to_json(workbook.Sheets[sheet]));
                        }
                    }
                    try {
                        if(persons.length<=0)return message.success("数据未空 || 数据不对")
                        // excel 数据再处理
                        let columnArr = [] // 定义表头
                        let i = 0
                        for (let x in persons[0]) {
                            console.log(x)
                            columnArr.push({
                                title: x,
                                key: "ranAdmin" + i,
                                dataIndex: "ranAdmin" + i,

                            })
                            i++
                        }
                        columns.value = columnArr
            
                        let result = persons.map(v => {
                            let i = 0
                            let json = {}
                            for (let x in v) {
                                json["ranAdmin" + i] = v[x]
                                i++
                            }
                            return json
                        })
                        data.value = result // 定义数据
                    
                    } catch {

                    }
                };
                // 以二进制方式打开文件
                console.log(files)
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


            const currentPageChange = (e) => {
                currentPage.value = e
            }
            const fileList = ref([])





            notification.open({
                message: 'excel 导入',
                description: '请先上传excle 文件，自动读取文件内容输出到table表格',
                duration: 3,
                style: {
                    'background-image': 'linear-gradient(45deg, #ec008c, #6739b6)',
                    color: '#ffffff'
                }
            });

            return {
                fileChange,
                CommitEcel,
                currentPageChange,
                fileList,
                data,
                columns,
                PageSize,
                currentPage,
            }
        }
    })
</script>