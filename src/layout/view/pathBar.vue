<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="pathBar">
        <el-scrollbar>
            <div style="display:flex">
                 <el-tag size="Default" :type="value.path==activeTagView?'success':''" v-for="(value,index) in tagView"
                    :key="value.path">
                    <span @click="changeTag(value)" > {{ $t(`menu.${value.en}`)}}</span>
                    <el-icon style="margin-left: 10px;" v-if="value.path==activeTagView">
                        <Refresh @click="Refresh" />
                    </el-icon>
                    <el-icon  style="margin-left:10px;" v-if="tagView.length>=2">
                        <CloseBold @click="deleteTag(index)" />
                    </el-icon>
                </el-tag>
            </div>
        </el-scrollbar> 
    </div>

</template>
<script>
    import {
        CloseBold,
        Refresh
    } from '@element-plus/icons-vue'
    import {
        computed,
        watch,
    } from 'vue';
    import router from "@/router";
    import store from "@/store";
    import {
        inject
    } from "vue";
    export default {
        components: {
            CloseBold,
            Refresh,
        },
        setup() {
            // 刷新页面
            const Refresh = inject("reload");
            // 监听获取选中菜单
            const activeTagView = computed(() => store.getters.activeTagView)
            // 监听获取历史菜单路由列表
            const tagView = computed(() => store.getters.tagView)
            // 点击历史菜单
            const changeTag = (item) => {
                router.push(item.path)
            }
            // 删除历史菜单
            const deleteTag = (index) => {
                store.commit("baseinfo/DELETE_TAG_VIEW", index)
            }
            return {
                tagView,
                activeTagView,
                changeTag,
                Refresh,
                deleteTag,
            }
        },
    }
</script>
<style scoped>
    .pathBar {
        height: 24px !important;
        padding: 10px 10px;
        border-bottom: 1px solid #ccc;
        background:var(--ran-content-bg);
    }
</style>