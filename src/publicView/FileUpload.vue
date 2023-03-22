<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-20 16:11:59
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div>
        <div class="clearfix">
            <a-upload v-model:file-list="fileList" :action="actionURL"  :headers="headers"
                list-type="picture-card" @preview="handlePreview" 
                @change="fileChange"
                @remove="remove"
                :before-upload="beforeUpload"
                :data="()=>{return {type:fileType}}" 
                :showUploadList="{showRemoveIcon: !disableds,showDownloadIcon:true}"
                >
               <!-- :data="()=>{setFeomdataQuery}"       :customRequest="customRequest"        -->
                <div v-if="fileList.length < maxs && disableds==false">
                    <PlusOutlined />
                    <div style="margin-top: 8px">Upload</div>
                </div>
            </a-upload>
            <a-modal :visible="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
                <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
        </div>
    </div>
</template>

<script setup>
    import {
        computed,
        defineComponent,
        defineProps ,
        ref,
        watchEffect
    } from 'vue';

    import {
        PlusOutlined
    } from '@ant-design/icons-vue';
            
const props = defineProps({
    fileArr: { //隶属模块列表
                type: Array,
                default: [],
                required: false
            },
            disabledFile: { //隶属模块列表
                type: Boolean,
                default: true,
                required: false
            },
            maxs: { //隶属模块列表
                type: Number,
                default: 8,
                required: false
            },
})

            
          console.log(props)

            const headers=computed(()=>{
                return {
                    // 'XS-AUTH-TOKEN':sessionStorage.getItem("initialHeaderBaseStr"),
                    'XS-AUTH-TOKEN':"https://github.com/ranshaka/ranAdmin",
                }
            })
            const previewVisible = ref(false);
            const previewImage = ref('');
            const previewTitle = ref('');
            const actionURL = ref("https://github.com/ranshaka/ranAdmin")
            const fileList = ref([]);
            const disableds = ref(false);
            const fileType=ref("picture")

            watchEffect(() => {
                fileList.value = JSON.parse(JSON.stringify(props.fileArr))
                disableds.value = JSON.parse(JSON.stringify(props.disabledFile))
            })
            watchEffect(() => {
                disableds.value = JSON.parse(JSON.stringify(props.disabledFile))
            })

            const beforeUpload = (file) => {
               if(file.type.indexOf('image')>=0){
                    fileType.value='picture'
                }else{
                    fileType.value='file' 
                }
            };
            const remove = (file) => {
               console.log(file)
            };
            const handleCancel = () => {
                previewVisible.value = false;
                previewTitle.value = '';
            };

            const handlePreview = async (file) => {
                console.log(file)
                if (!file.url && !file.preview) {
                    // file.preview = (await getBase64(file.originFileObj))
                    file.preview = file.thumbUrl
                }
                previewImage.value = file.url || file.preview;
                previewVisible.value = true;
                previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
            };
            const fileChange = async (file) => {
               
            };
            const getFile =  (file) => {
                let list=fileList.value.map((x)=>{
                    return {
                        fileType:x.type.indexOf('image')>=0 ? 'image' :'file',
                        ...x,
                    }
                })
                return list
            };

            const  clearFormData=(max,type)=>{
                fileList.value=[]
                props.fileArr=[]
                console.log(fileList.value)
            }

            const setFeomdataQuery=()=>{
                let fromdata= new FormData()
                fromdata.append('type', fileType.value)
                return fromdata
            }

            // 自定义在上传附件
            const customRequest=(e)=>{
                console.log(e)
                  let fromdata= new FormData()
                  fromdata.append('file', e.file)
                file_upload(fromdata,{
                    headers:{
                        "Content-Type": "multipart/form-data",
                    }
                }).then(res=>{
                    e.onSuccess(res.data);
                })
                // let fromdata= new FormData()
                // params.append('type', fileType.value)
                return ""
            }
            
        defineExpose({getFile})
</script>
<style lang="less" scoped>
    .treewarp {
        border: 1px solid #dedede;
        height: 500px;
        overflow: auto;
    }
</style>