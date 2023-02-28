
<template>
    <div class="ant-content ">
        <a-row type="flex" :gutter="20">
            <a-col :span="8">
                <div class="style">
                    <div>

                    </div>
                    <div class="flex space-between margin-bottom-1x">
                        <div>用户列表：</div>
                    </div>
                    <div class="checkedBox scrollBox">
                        <a-form-item label="名称">
                        <a-input v-model:value="search" placeholder="名称" />
                    </a-form-item>
                        <a-radio-group v-model:value="value">
                            <a-radio :style="radioStyle" :value="value" v-for="value in 10" :key="value">用户 {{value}}</a-radio>
                        </a-radio-group>
                    </div>
                 
                </div>
            </a-col>
            <a-col :span="16">
                <extendView ref="extendRef" :treeData="treeData" :editKey="onetreeData" :userid="userid"></extendView>
            </a-col>
        </a-row>
           
    </div>
</template>

<script setup>
    import {
        computed,
        defineComponent,
        reactive, //响应式
        watch, //响应式
        ref,
        nextTick,
        onMounted,
    } from 'vue';
    import extendView from "@/view/admin/menuPermission/menuPermissionExd.vue"
    import {
        roles
    } from "@/router/role"
    import {Guid} from "@/utils/index.js"

    
  

    const deepArray=(list,parentId)=>{
        return list.map(x=>{
            return {
                ...x,
                parentId:parentId?parentId:0,
                title:x.cn,
                key:x.id,
                children:x.children?deepArray(x.children,x.id):[]
            }
        })
    }

    const treeData=deepArray(roles)
    const onetreeData=[]
    const userid=ref("")
    const extendRef=ref()
   
    const value=ref(2)
    const addMenu=()=>{
        extendRef.value.extendAdd()
    }
    const radioStyle = reactive({
      display: 'flex',
      height: '30px',
      lineHeight: '30px',
    });
    const selectTree=(checkedKeys, e)=>{
        extendRef.value.init(e)
    }
</script>
<style lang="less" scoped>
    /deep/.ant-select {
        min-width: 160px;
    }

    /deep/.ant-input {
        min-width: 160px;
    }

</style>