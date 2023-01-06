<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
    <div class="pathBar background scrollBox ">
        <div style="display:flex" class="pointer">
            <a-tag size="Default" :color="value.path !=activeTagView?'green':'cyan'" v-for="(value,index) in tagView"
                :key="value.path + index">
                <template #icon>
                    <sync-outlined :spin="true"  v-if="value.path ==  activeTagView"  @click="Refresh"  />
                    <close-circle-outlined  @click="deleteTag(index)" />
                </template>
                <span @click="changeTag(value)"> {{ $t(`menu.${value.path}`)}}</span>
                
            </a-tag>
        </div>
    </div>

</template>
<script>
    import {
        computed,
        watch,
    } from 'vue';
    import router from "@/router";
    import store from "@/store";
    import {
        CheckCircleOutlined,
        SyncOutlined,
        CloseCircleOutlined,
        ExclamationCircleOutlined,
        ClockCircleOutlined,
        MinusCircleOutlined,
    } from '@ant-design/icons-vue';
    import {
        inject
    } from "vue";
    export default {
        components: {
            SyncOutlined,
            CloseCircleOutlined

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
        width:100%;
        overflow-x: scroll;
        height: 40px !important;
        padding: 10px 10px;
    }
</style>