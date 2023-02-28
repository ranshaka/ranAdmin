<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->


<template>
    <div class="background"  >
        <div class="a-menu-vertical-demo scrollBox ">
            <div class="logo" />
            <a-menu mode="inline"  
            @select="selectChange" 
            v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
                <template v-for="(value,index) in munePath" :key="index" >
                    <template v-if="value && value.children">
                        <a-sub-menu  :key="value.path" >
                        <template #title>
                            <span class="anticon anticon-desktop">
                                <svg class="icon-2x margin-right-1x" aria-hidden="true">
                                    <use :xlink:href="value.icon"></use>
                                </svg>
                            </span>
                            <span>{{ $t(`menu.${value.path}`)}}</span>
                        </template>
                        <a-menu-item v-for="(item) in value.children" :key="item.path">
                            <span class="anticon anticon-desktop">
                                <svg class="icon-2x margin-right-1x" aria-hidden="true">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                            </span>
                            <span>{{ $t(`menu.${item.path}`)}}</span>
                        </a-menu-item>
                    </a-sub-menu>
                    </template>
                    <template v-else>
                        <a-menu-item :key="value.path" >
                        <span class="anticon anticon-desktop">
                            <svg class="icon-2x margin-right-1x" aria-hidden="true">
                                <use :xlink:href="value.icon"></use>
                            </svg>
                        </span>
                        <span>{{ $t(`menu.${value.path}`)}}</span>
                    </a-menu-item>
                    </template>
                   
                  
                </template>
            </a-menu>
        </div>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        reactive,
        
    } from "@vue/reactivity";
    import store from "@/store";

    import { useRouter,onBeforeRouteUpdate } from 'vue-router';
    export default {
        setup() {
            const router=useRouter()
            const selectedKeys=ref([])
            const openKeys=ref([])
            const activeTagView = computed(() => store.getters.activeTagView)
            selectedKeys.value=[activeTagView.value]
            const munePath = computed(() => store.getters.allMenu)
            const isCollapse = ref(false)
            openKeys.value=[router.currentRoute.value.matched[1].path]
            const selectChange=(item)=>{
                router.push(item.key)
            }

            // 监听路由变化
            onBeforeRouteUpdate(e=>{
                selectedKeys.value=[e.path]
                openKeys.value=[e.matched[1].path]
            })
           
            return {
                munePath,
                isCollapse,
                selectedKeys,
                openKeys,
                selectChange,
            }
        },
    }
</script>
<style>
    .layout-Aside {
        /* height: 100%;
        position: fixed; */
    }

    .a-menu-vertical-demo {
  
        max-height: calc(100vh - 60px);
        height: calc(100vh - 60px);
        overflow-y: hidden;
        background: var(--a-fill-color-blank);
    }

   body  .ant-layout-sider-children .ant-menu.ant-menu-inline-collapsed{
        width: 80px !important;
    }
</style>