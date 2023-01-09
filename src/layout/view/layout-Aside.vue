<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->


<template>
    <div class="">
        <div  class="el-menu-vertical-demo scrollBox " >
                <el-menu :default-active="$router.currentRoute.value.path" style="hegiht:100%;border:none;"
                class="" :collapse="isCollapse" @open="handleOpen" router @close="handleClose">
                <template v-for="(value,index) in munePath" :key="index">
                    <el-sub-menu :index="value.path" v-if="value && value.children">
                        <template #title>
                            <el-icon>
                                <svg class="icon-md" aria-hidden="true">
                                    <use :xlink:href="value.icon"></use>
                                </svg>
                            </el-icon>
                            <span>{{ $t(`menu.${value.en}`)}}</span>
                        </template>
                        <el-menu-item-group>
                            <template v-for="(item,itemIndex) in value.children" :key="itemIndex">
                                <el-sub-menu :index="value.path" v-if="item && item.children">
                                    <template #title><span>{{item.name}}</span></template>
                                    <el-menu-item :index="value.path"
                                        v-for="(childrenItem,childrenIndex) in item.children" :key="childrenIndex">
                                        <span>{{ $t(`menu.${childrenItem.en}`)}}</span>
                                    </el-menu-item>
                                </el-sub-menu>
                                <el-menu-item :index="item.path" v-else>
                                    <template #title>
                                        <el-icon>
                                            <svg class="icon-md" aria-hidden="true">
                                                <use :xlink:href="item.icon"></use>
                                            </svg>
                                        </el-icon>
                                        <span>{{ $t(`menu.${item.en}`)}}</span>
                                    </template>
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="value.path" v-else>
                        <template #title>
                            <el-icon>
                                <svg class="icon-md" aria-hidden="true">
                                    <use :xlink:href="value.icon"></use>
                                </svg>
                            </el-icon>
                            <span>{{ $t(`menu.${value.en}`)}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-menu>
            </div>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        reactive
    } from "@vue/reactivity";
    import store from "@/store";

    import {
        parseTime
    } from "@/utils";
    export default {
        setup() {
            const munePath = computed(() => store.getters.allMenu)
            //  munePath.value = computed(()=>store.getters.allMenu) 
            // munePath.value = store.getters.allMenu
            console.log(munePath)
            const isCollapse = ref(false)
            return {
                munePath,
                isCollapse
            }
        },
    }
</script>
<style>
    .layout-Aside {
        height: 100%;
    }

    .el-menu-vertical-demo {
        max-height: calc(100vh - 60px);
        height: calc(100vh - 60px);
        overflow-y: hidden;
        background: var(--el-fill-color-blank);
    }

    .el-menu-item-group__title {
        display: none;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 100%;
        /* min-height: 400px; */
    }
</style>