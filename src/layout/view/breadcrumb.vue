<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
    <div class="breadcrumb background">
        <a-breadcrumb>
            <template v-for="(value) in breadcrumb" :key="value.path">
                <!-- <a-breadcrumb-item v-if="index==0">
                    <span style="font-weight: 700;color:#303133">{{ $t(`menu.${value.meta.en}`)}}</span>
                </a-breadcrumb-item> -->
                <a-breadcrumb-item  :to="{ path:value.path}">
                    {{ $t(`menu.${value.path}`)}}
                </a-breadcrumb-item>
            </template>
        </a-breadcrumb>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        reactive
    } from "@vue/reactivity";
    import router from "@/router";
    import store from "@/store";
    export default {
        components: {},
        setup() {
            const breadcrumb = computed(() => router.currentRoute.value.matched)
            console.log(breadcrumb)
            return {
                breadcrumb,

            }
        },
    }
</script>
<style scoped>
    .breadcrumb {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ccc;
    }
    .custom-dark .breadcrumb {
        border-bottom: 1px solid #303030;
    }
</style>