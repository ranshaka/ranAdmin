<!--
 * @Description: Description
 * @Date: 2022-03-24 21:14:42
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-02-17 14:09:27
 * @FilePath: \daobao-web\src\views\modelInfo\userInfoExt.vue
-->
<template>
    <div >
        <a-modal v-model:visible="modelFlag" :title="modelInfo.boxId?disableds?'查看':'编辑':'新增'"
            :ok-button-props="{ disabled: disabledButton }" @ok="submit" width="900px" wrapClassName="full-modal">
            <div class="roleInfoExt">
                <a-row type="flex" :gutter="20">
                <a-col :span="14">
                    <a-row type="flex">
                        <a-form ref="ruleForm" style="width:100%;" :label-col="{span:8}" :wrapper-col="{span:20}"
                            :model="modelInfo">
                            <a-row>
                                <a-col :span="12">
                                    <a-form-item has-feedback label="名称:" style="width:100%" name="name"
                                        :rules="[{ required: true, message: '请填写-名称' }]">
                                        <a-input v-model:value="modelInfo.name" :disabled="disableds" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item has-feedback label="编号:" style="width:100%" name="number"
                                        :rules="[{ required: true, message: '请填写-编号' }]">
                                        <a-input v-model:value="modelInfo.number" :disabled="disableds" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    <a-form-item has-feedback label="负责人姓名:" style="width:100%" name="role"
                                        :rules="[{ required: true, message: '请填写-负责人姓名' }]">
                                        <a-input v-model:value="modelInfo.role" :disabled="disableds" />
                                    </a-form-item>
                                </a-col>
                                <a-col :span="12">
                                    <a-form-item has-feedback label="负责人电话:" style="width:100%" name="phone"
                                        :rules="[{ required: true, message: '请填写-负责人电话' }]">
                                        <a-input v-model:value="modelInfo.phone" :disabled="disableds" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                            <a-row>
                                <a-col :span="12">
                                    <a-form-item has-feedback label="注册日期:" style="width:100%">
                                        <a-date-picker v-model:value="modelInfo.createTime" :disabled="disableds"
                                            valueFormat="YYYY-MM-DD" placeholder="Start" style="width:100%;" />
                                    </a-form-item>
                                </a-col>
                            </a-row>
                        </a-form>
                    </a-row>
                </a-col>
                <a-col :span="10">
                <div class="style">
                    <div class="flex space-between margin-bottom-1x">
                        <div>角色成员：</div>
                        <div>已选 <span class="cyan">{{checkedValue.length}}</span> 位成员</div>
                    </div>
                  
                    <div class="checkedBox scrollBox">
                        <a-checkbox-group v-model:value="checkedValue" style="width: 100%">
                            <template v-for="value in 10" :key="value">
                                <a-checkbox :value="value"  :disabled="disableds">
                                        <div class="flex  margin-bottom-1x">
                                        <div class="userName">张三</div>
                                        <div class="phone">15646123 + {{ value }}</div>
                                        </div>
                                    </a-checkbox>
                                    <a-tag color="green">查看信息</a-tag>
                            </template>
                          
                    </a-checkbox-group>
                    </div>
                 
                </div>
            </a-col>
            </a-row>
            </div>
            
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
            const checkedValue=ref([1,2,3,5])
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
                checkedValue,


                add,
                submit,
                seeOrUpdate,





            }
        },
    });
</script>

<style lang="less">
.roleInfoExt{
    .checkedBox{
        overflow-y: scroll;
        height: 280px;
        padding:10px;
        .userName{
            width:60px;
        }
        .phone{
            width:120px;
            margin:0 10px;
        }
    }
    .ant-checkbox-wrapper+.ant-checkbox-wrapper{
        margin-left:0;
    }
    .ant-tag{
        cursor: pointer;
    }
}

</style>