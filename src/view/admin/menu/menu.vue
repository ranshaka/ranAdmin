
<template>
    <div class="ant-content ">
        <a-row type="flex" :gutter="20">
            <a-col :span="8">
                <div class="flex ">
                    <a-input-search v-model:value="searchValue" style="margin-bottom: 8px" placeholder="Search" class="margin-bottom-1x" />
                    <a-button type="primary" class="margin-bottom-1x margin-left-3x" @click="addMenu">新增系统</a-button>
                </div>
                
                <a-tree :blockNode="true"  :showLine="true" 
                :draggable="true"
                @click="selectTree"
                :tree-data="treeData" :fieldNames="{children:'children', title:'cn', key:'id' }">
                <template  #title="item">
                    <a-dropdown :trigger="['contextmenu']">
                        <div style="width:100%;">
                            <span v-if="searchValue && item.cn.indexOf(searchValue) > -1">
                                {{ item.cn.substr(0, item.cn.indexOf(searchValue)) }}
                                <span class="red">{{ searchValue }}</span>
                                {{ item.cn.substr(item.cn.indexOf(searchValue) + searchValue.length) }}
                            </span>
                            <span v-else>{{ item.cn }}</span>
                        </div>
                        <template #overlay>
                        <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                            <a-menu-item key="1">修改信息</a-menu-item>
                            <a-menu-item key="2">添加子菜单</a-menu-item>
                            <a-popconfirm title="是否删除？" ok-text="是" cancel-text="否"
                                @confirm="personDelete(record.boxId)">
                                <a-menu-item key="2">删除菜单</a-menu-item>
                            </a-popconfirm>
                        </a-menu>
                        </template>
                    </a-dropdown>
                    </template>
            </a-tree>
            </a-col>
            <a-col :span="16">
                <extendView ref="extendRef" ></extendView>
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
    import extendView from "@/view/admin/menu/menuExt.vue"
    import {
        roles
    } from "@/router/role"
    import {Guid} from "@/utils/index.js"


    const treeData=ref(roles)
    const extendRef=ref()
   
    onMounted(()=>{
        extendRef.value.init( roles[0])
    })
  
    const addMenu=()=>{
        extendRef.value.extendAdd()
    }
  
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