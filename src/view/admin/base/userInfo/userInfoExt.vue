<!--
 * @Description: Description
 * @Date: 2022-03-24 21:14:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-17 13:43:17
 * @FilePath: \daobao-web\src\views\modelInfo\userInfoExt.vue
-->
<template>
    <div>
        <a-modal v-model:visible="modelFlag" :title="modelInfo.boxId?disableds?'查看':'编辑':'新增'"
            :ok-button-props="{ disabled: disabledButton }" @ok="submit" width="800px" wrapClassName="full-modal">
            <div class="select-range-time">
            </div>
            <a-row type="flex">
                <a-form ref="ruleForm" style="width:100%;" :label-col="{span:8}" :wrapper-col="{span:20}"
                    :model="modelInfo">
                    <a-row>
                        <a-col :span="12">
                            <a-form-item has-feedback label="姓名:" style="width:100%" name="name"
                                :rules="[{ required: true, message: '请填写-姓名' }]">
                                <a-input v-model:value="modelInfo.name" :disabled="disableds" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item has-feedback label="性别:" style="width:100%" name="sex"
                                :rules="[{ required: true, message: '请填写-姓名' }]">
                                <a-select default-value="部门" v-model:value="modelInfo.sex" :disabled="disableds">
                                    <a-select-option value="女" key="女" />
                                    <a-select-option value="男" key="男" />
                                </a-select>
                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :span="12">
                            <a-form-item has-feedback label="电话:" style="width:100%" name="phone"
                                :rules="[{ required: true, message: '请填写-电话' }]">
                                <a-input v-model:value="modelInfo.phone" :disabled="disableds" />
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item has-feedback label="角色:" style="width:100%" name="role"
                                :rules="[{ required: true, message: '请填写-角色' }]">
                                <a-select v-model:value="modelInfo.role" :disabled="disableds" mode="multiple"
                                    style="width: 100%" :options="roleOptions" />

                            </a-form-item>
                        </a-col>
                    </a-row>
                    <a-row>

                        <a-col :span="12">
                            <a-form-item has-feedback label="部门:" style="width:100%">
                                <a-select default-value="部门" v-model:value="modelInfo.department" :disabled="disableds">
                                    <a-select-option value="部门1" key="部门1" />
                                    <a-select-option value="部门2" key="部门2" />
                                    <a-select-option value="部门3" key="部门3" />
                                    <a-select-option value="部门4" key="部门4" />
                                </a-select>
                            </a-form-item>
                        </a-col>
                        <a-col :span="12">
                            <a-form-item has-feedback label="注册日期:" style="width:100%">
                                <a-date-picker v-model:value="modelInfo.createTime" :disabled="disableds"
                                    valueFormat="YYYY-MM-DD" placeholder="Start" style="width:100%;" />
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
    import {
        EyeOutlined,
        CloseCircleOutlined,
    } from '@ant-design/icons-vue'
    import {
        computed,
        defineComponent,
        reactive, //响应式
        watch, //响应式
        ref,
    } from 'vue';
    import {
        message
    } from 'ant-design-vue';
    import {
        parseTime,
    } from "@/utils"
    import store from "@/store"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            EyeOutlined,
            CloseCircleOutlined,
        },
        setup(props, context) {
            const submitFlag = ref(true)
            const ruleForm = ref()
            const
                modelFlag = ref(false),
                disableds = ref(true),
                modelInfo = ref({
                    createTime: parseTime(new Date())
                }),
                roleOptions = [{
                        value: "管理员"
                    },
                    {
                        value: "管理员1"
                    },
                    {
                        value: "管理员2"
                    },
                    {
                        value: "管理员3"
                    },
                    {
                        value: "管理员4"
                    },
                ]
            const add = async (res) => {
                modelFlag.value = true
                disableds.value = false
                modelInfo.value = {
                    createTime: new Date(),
                    role: []
                }
            }

            const submit = () => {
                ruleForm.value.validate().then(res => {
                    modelFlag.value = false
                }).catch(err => {
                    submitFlag.value = true
                    if (err && err.errorFields && err.errorFields.length) {
                        message.error('请填写' + err.errorFields[0].errors[0])
                    }
                })
            }


            const seeOrUpdate = (item, flag) => {
                modelFlag.value = true
                disableds.value = flag
                item.role = item.role ? item.role.split(",") : []
                modelInfo.value = item
            }





            return {
                ruleForm,
                modelFlag,
                modelInfo,
                disableds,
                roleOptions,


                add,
                submit,
                seeOrUpdate,





            }
        },
    });
</script>