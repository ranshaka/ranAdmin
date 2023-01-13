<template>
    <div class="common-layout ">
        <a-layout >
            <a-layout-header style="background: #fff; padding: 0">
                    <layoutHeader :style="fixedTop?'position: fixed;zIndex:10;width:100%;':''" ></layoutHeader>
                </a-layout-header>
            <a-layout>
                <a-layout-sider   v-if="isMenu">
                    <layoutAside :style="fixedTop?'position: fixed;width: 200px;':''" ></layoutAside>
                </a-layout-sider>
                <a-layout-content>
                    <pathBar v-if="isPathbar" :style="fixedTop?{position:'fixed',zIndex: 10}:null"></pathBar>
                    <breadcrumb v-if="isBreadcrumb" :style="fixedTop?{ position: 'fixed', zIndex: 10, width: '100%',  marginTop:isPathbar?'40px':'0'}:null"></breadcrumb>
                    <div  class=" content background " :style="maxHeidht">
                        <router-view></router-view>
                    </div>
                </a-layout-content>
            </a-layout>
        </a-layout>
        <baseInfo></baseInfo>
    </div>
</template>
<script>
    import layoutHeader from '@/layout/view/layout-header.vue'
    import layoutAside from '@/layout/view/layout-Aside.vue'
    import breadcrumb from '@/layout/view/breadcrumb.vue'
    import pathBar from '@/layout/view/pathBar.vue'
    import baseInfo from "@/layout/view/baseInfo.vue"
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
    import {
        useRouter
    } from 'vue-router';
    import {
        Layout,

    } from 'ant-design-vue';
    export default defineComponent({
        name: "index",
        components: {
            Layout,
            layoutHeader,
            layoutAside,
            breadcrumb,
            pathBar,
            baseInfo,
        },
        computed: {
            // 动态计算 功能页面 高度
            maxHeidht() {
                let height = 80
                height -= isPathbar.value ? 45 : 0
                height -= isBreadcrumb.value ? 36 : 0
                // return `height:calc(100vh - ${height}px)`
                console.log(height,"**************************")
                return `margin:${height}px 10px 10px 10px;`
                
            }
        },
        setup() {
            const router = useRouter()
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
            const fixedTop = computed(() => store.getters.fixedTop)
            // 菜单类型
            const isMenu = computed(() => store.getters.isMenu)

            const  maxHeidht=computed(()=>{
                let height = 80
                height -= isPathbar.value ? 0 : 45
                height -= isBreadcrumb.value ? 0 : 25
                return `margin:${height}px 10px 10px 10px;`
            })
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
                router,
                loading,
                isRouterAlive,
                isMenu,
                isBreadcrumb,
                isPathbar,
                fixedTop,
                transitionNames,
                maxHeidht,
            }
        },
    })
</script>
<style scoped>
    .common-layout>>>.ant-layout-sider-has-trigger {
        padding-bottom: 0 !important;
    }
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
        background: var(--ran-content-border);
        width: 100%;
        overflow-y: scroll;
        overflow-y: overlay;
        box-sizing: border-box;
    }

    .layout-body{
        margin:80px 10px 10px 10px;
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