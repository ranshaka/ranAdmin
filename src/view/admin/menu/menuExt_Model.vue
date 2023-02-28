<!--
 * @Description: Description
 * @Date: 2022-03-24 21:14:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-20 16:17:35
 * @FilePath: \daobao-web\src\views\modelInfo\userInfoExt.vue
-->
<template>
    <div>
        <a-modal v-model:visible="modelFlag" :title="modelInfo.boxId?disableds?'查看':'编辑':'新增'"
            :ok-button-props="{ disabled: disabledButton }" @ok="submit" width="600px" wrapClassName="full-modal">
            <div>
                <a-row type="flex">
                    <a-form ref="ruleForm" style="width:100%;" :label-col="{span:8}" :wrapper-col="{span:20}"
                        :model="modelInfo">
                        <a-row>
                            <a-col :span="12">
                                <a-form-item has-feedback label="名称-中文:" style="width:100%" name="cn"
                                    :rules="[{ required: true, message: '请填写-名称-中文' }]">
                                    <a-input v-model:value="modelInfo.cn" :disabled="disableds" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item has-feedback label="名称-英文:" style="width:100%" name="en"
                                    :rules="[{ required: true, message: '请填写-名称-英文' }]">
                                    <a-input v-model:value="modelInfo.en" :disabled="disableds" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-item has-feedback label="路由:" style="width:100%" name="path"
                                    :rules="[{ required: true, message: '请填写-路由' }]">
                                    <a-input v-model:value="modelInfo.path" :disabled="disableds" />
                                </a-form-item>
                            </a-col>
                            <a-col :span="12">
                                <a-form-item has-feedback label="注册日期:" style="width:100%">
                                    <a-date-picker v-model:value="modelInfo.createTime" :disabled="disableds"
                                        valueFormat="YYYY-MM-DD" placeholder="Start" style="width:100%;" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                        <a-row>
                            <a-col :span="12">
                                <a-form-item has-feedback label="图标:" style="width:100%">
                                    <FileUpload :fileArr="imgUrlList" :disabled="disableds" :disabledFile="disableds" :maxs="1" ref="fileUploadRef" />
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </a-form>
                </a-row>
            </div>

        </a-modal>
    </div>
</template>

<script setup>
    import {
        ref,
    } from 'vue';
    import {
        message
    } from 'ant-design-vue';
    import {
        parseTime,
    } from "@/utils"
    import store from "@/store"
    import FileUpload from "@/publicView/FileUpload.vue"


    const submitFlag = ref(true)
    const ruleForm = ref()
    const
        modelFlag = ref(false),
        disableds = ref(true),
        modelInfo = ref({
            createTime: parseTime(new Date())
        })
        const imgUrlList=[
        // {
        //     uid: "12313123",
        //     name: "图片",
        //     type: 'image',
        //     url: "https://cdn.wwads.cn/creatives/SsLRqW5x8HX42nfLIJArRIdXPducqk5yb9kPXe1h.png",
        // }
    ]
    const fileUploadRef=ref(null)

    const add = async (res) => {
        modelFlag.value = true
        disableds.value = false
        modelInfo.value = {
            createTime: parseTime(new Date())
        }
    }

    const submit = () => {
        // 获取附件
        console.log(fileUploadRef.value.getFile())
        ruleForm.value.validate().then(res => {
            modelFlag.value = false
        }).catch(err => {
            submitFlag.value = true

            if (err && err.errorFields && err.errorFields.length) {
                message.error('请填写' + err.errorFields[0].errors[0])
            }
        })
    }


    const init = (flag, item) => {
        modelFlag.value = true
        disableds.value = flag
        modelInfo.value = item
    }



    defineExpose({
        init,
        add
    })
</script>