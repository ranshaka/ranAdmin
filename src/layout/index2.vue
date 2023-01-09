<template>
    <div class="common-layout">
        <el-container>
            <el-header class="layoutheader">
                <layoutHeaderut></layoutHeaderut>
            </el-header>
            <el-container>
                <!-- 菜单列表 -->
                <el-aside width="200px" v-if="isMenu">
                    <layoutAside></layoutAside>
                </el-aside>
                <el-main>
                    <!-- 历史菜单导航 -->
                    <pathBar v-if="isPathbar"></pathBar>
                    <!-- 菜单路径 -->
                    <breadcrumb v-if="isBreadcrumb"></breadcrumb>
                    <!-- 功能页面 -->
                    <div class="homeMainBox">
                        <div class="homeMain scrollBox " v-loading="loading" :style="maxHeidht"
                            element-loading-text="拼命加载中....." element-loading-background="rgba(255, 255, 255, 3)">
                            <template v-if="isRouterAlive">
                                    <transition name="el-fade-in-linear">
                                        <transition :name="transitionNames">
                                            <keep-alive>
                                                <router-view class=""></router-view>
                                            </keep-alive>
                                        </transition>
                                    </transition>
                            </template>
                        </div>
                    </div>

                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
    import layoutHeaderut from '@/layout/view/layout-header.vue'
    import layoutAside from '@/layout/view/layout-Aside.vue'
    import breadcrumb from '@/layout/view/breadcrumb.vue'
    import pathBar from '@/layout/view/pathBar.vue'
    import {
        defineComponent,
        provide,
        nextTick,
        watch
    } from "vue"
    import {
        computed,
        ref,
    } from "@vue/reactivity";
    import store from "@/store";
    import router from "@/router";

    export default defineComponent({
        name: "index",
        components: {
            layoutHeaderut,
            layoutAside,
            breadcrumb,
            pathBar,
        },
        computed: {
            // 动态计算 功能页面 高度
            maxHeidht() {
                let height = 60
                height += this.isPathbar ? 45 : 0
                height += this.isBreadcrumb ? 36 : 0
                return `height:calc(100vh - ${height}px)`
            }
        },
        setup() {

            // 页面刷新
            const loading = ref(false)
            const isRouterAlive = ref(true);
            const reload = () => {
                loading.value = true
                isRouterAlive.value = false;
                nextTick(() => {
                    isRouterAlive.value = true;
                    loading.value = false
                });
            };
            provide("reload", reload);

            const isBreadcrumb = computed(() => store.getters.isBreadcrumb)
            const isPathbar = computed(() => store.getters.isPathbar)
            // 菜单类型
            const isMenu = computed(() => store.getters.isMenu)
            


            //  页面切换效果 左---右
            const tagView = computed(() => store.getters.tagView)
            const transitionNames = ref("slide-right")
            watch(
                () => router.currentRoute.value,
                (to, from) => {
                    if (tagView.value.some(x => x.path == from.path)) {
                        if (tagView.value.findIndex(x => x.path == to.path) < tagView.value.findIndex(x => x
                                .path == from.path)) {
                            transitionNames.value = 'slide-left';
                        } else {
                            transitionNames.value = 'slide-right';
                        }
                    } else {
                        transitionNames.value = 'slide-right';
                    }
                }
            );
            return {
                loading,
                isRouterAlive,
                isMenu,
                isBreadcrumb,
                isPathbar,
                transitionNames,
            }
        },
    })
</script>
<style scoped>

</style>
<style scoped>
    .layoutheader {
        background: #12a3f5;
        padding: 0;
        margin: 0;
    }

    .homeMainBox {
        background: #F0F1F5;
        width: 100%;
        overflow: hidden;
    }

    .homeMain {
        background: #F0F1F5;
        width: 100%;
        overflow-y: scroll;
        overflow-y: overlay;
        box-sizing: border-box;
        padding: 20px;
    }



    .slide_left-enter-active,
    .slide_left-leave-active,
    .slide_right-enter-active,
    .slide_right-leave-active {
        transition: all 0.3s;
        position: absolute !important;
        background-color: white;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
    }

    .slide_left-enter-from,
    .slide_right-leave-to {
        opacity: 1;
        transform: translateX(100%);
    }

    .slide_right-enter-from,
    .slide_left-leave-to {
        opacity: 1;
        transform: translateX(-100%);
    }

    .slide_left-leave-to,
    .slide_right-leave-to {
        opacity: 0.3;
    }
</style>
<style>
    .scrollBox:hover {
        overflow-y: overlay;
    }

    .scrollBox::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 2px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 1px;
    }

    .scrollBox::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background-color: skyblue;
        background-image:val(    --el-color-primary-light-7);
    }

    .scrollBox::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        background: #ededed;
        border-radius: 10px;
    }
</style>