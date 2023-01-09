
<template>
    <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
            <template v-for="(value,index) in breadcrumb" :key="value.path">
                <el-breadcrumb-item v-if="index==0">
                    <span style="font-weight: 700;color:#303133">{{value.meta.title}}</span>
                </el-breadcrumb-item>
                <el-breadcrumb-item v-else :to="{ path:value.path}">
                    {{value.meta.title}}
                </el-breadcrumb-item>
            </template>
        </el-breadcrumb>
    </div>
</template> 
<script>
    import {
        ArrowRight
    } from '@element-plus/icons-vue'
    import {
        computed,
        ref,
        reactive
    } from "@vue/reactivity";
    import router from "@/router";
    import store from "@/store";
    export default {
        components: {
            ArrowRight
        },
        setup() {
            const breadcrumb = computed(() => router.currentRoute.value.matched)
            return {
                breadcrumb,
 
            }
        },
    }
</script>
<style scoped>
    .breadcrumb{
        height: 16px;;
        line-height:16px;
        padding:10px;
        overflow: hidden;
    }
</style>