<template>
    <div>
        <div class="common-layout " @dblclick="sizeBtn"
    @mousedown.self="winDown"
    @mousemove.self="winMove"
    @mouseup.self="winUp">
            <a-row>
                <a-col :span="6">
                    <div class="layoutheader_Title">
                        <img v-maxImg src="../images/1.jpg" class="header_logo" :tatile="appName" />
                        <span class="project-name">
                            <span class="dynamicText" v-for="(item,index) in appName" :key="index">{{item}}</span>
                        </span>
                    </div>
                </a-col>
                <a-col :span="14">
                    <template v-if="!isMenu">
                        <a-config-provider  prefixCls="ant">
                            <a-menu mode="horizontal" @select="selectChange" v-model:selectedKeys="selectedKeys">
                                <template v-for="(value,index) in munePath" :key="index">
                                    <template :index="value.path" v-if="value && value.children">
                                        <a-sub-menu :key="value.path" :index="value.path"
                                            v-if="value && value.children">
                                            <template #title>
                                                <span class="anticon anticon-desktop">
                                                    <svgView :svg="value.icon" ></svgView> 
                                                </span>
                                                <span>{{ $t(`menu.${value.path}`)}}</span>
                                            </template>
                                            <a-menu-item v-for="(item) in value.children" :key="item.path">
                                                <span class="anticon anticon-desktop">
                                                    <svgView :svg="item.icon" ></svgView> 

                                                </span>
                                                <span>{{ $t(`menu.${item.path}`)}}</span>
                                            </a-menu-item>
                                        </a-sub-menu>
                                    </template>
                                    <template v-else>
                                        <a-menu-item :key="value.path">
                                            <span class="anticon anticon-desktop">
                                                <svgView :svg="value.icon" ></svgView> 
                                            </span>
                                            <span>{{ $t(`menu.${value.path}`)}}</span>
                                        </a-menu-item>
                                    </template>


                                </template>
                            </a-menu>
                        </a-config-provider>

                    </template>
                </a-col>
                <a-col :span="4">
                    <div class="flex row-reverse">
                        <div class="layout-header-userBox">
                            <a-dropdown>
                                <div class="layout-header-user">
                                    <span>ranAdmin</span>
                                    <img src="../images/1.jpg" class="header_logo" tatile="VUE自定义后台管理模板" />
                                </div>
                                <template #overlay>
                                    <a-menu>
                                        <a-menu-item>个人信息</a-menu-item>
                                        <a-menu-item>修改密码</a-menu-item>
                                        <a-menu-item @click="LogOut">退出登录</a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </div>
                        <a-dropdown>
                            <svgView svg="yingwen" v-if="locales =='en'"  />
                            <svgView svg="zhongwen" v-else />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="locales='zh-cn'">
                                        <svgView svg="yingwen" />
                                        中文
                                    </a-menu-item>
                                    <a-menu-item @click="locales='en'">
                                        <svgView svg="zhongwen" />
                                        英文
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <div style="20px;width:20px;"></div>
                        <a-dropdown>
                            <svgView svg="baitian"  v-if="themes" />
                            <svgView svg="heiyemoshi1" v-else />
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="themes=false">
                                        <svgView svg="baitian"   />
                                        白天模式
                                    </a-menu-item>
                                    <a-menu-item @click="themes=true">
                                        <svgView svg="heiyemoshi1" />
                                        黑夜模式
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script>
    import {
        computed,
        ref,
        reactive
    } from "@vue/reactivity";
    import baseInfo from "@/layout/view/baseInfo.vue"
    import store from "@/store";
    import {
        useI18n
    } from 'vue-i18n'
    import {
        useRouter
    } from 'vue-router';
    import svgView from "@/common/svg/svg.vue"
    import {sizeBtn,winDown,winMove,winUp} from "@/electron_layout/border.js"
    export default {
        components: {
            baseInfo,
            svgView
        },
        setup() {
            
            const router = useRouter()
            const appName = ref(store.getters.appName)
            // 菜单类型
            const isMenu = computed(() => store.getters.isMenu)
            // 菜单列表
            const munePath = computed(() => store.getters.allMenu)

            // 系统设置
            const direction = computed(() => store.getters.direction ? 'rtl' : 'ltr')
            const visible = ref(false)

            // 国际化

            const {
                locale
            } = useI18n();
            const locales = computed({
                get: () => store.getters.locales,
                set: (value) => {
                    locale.value = value
                    store.commit("baseinfo/SET_LOCALES", value)
                    window.localStorage.setItem("locales", value)
                }
            })
            const selectedKeys = ref([])
            const activeTagView = computed(() => store.getters.activeTagView)
            selectedKeys.value = [activeTagView.value]
            const selectChange = (item) => {
                router.push(item.key)
            }
            // 白天/黑夜模式
            const themes = computed({
                get: () => store.getters.themes,
                set: (value) => {
                    store.commit("baseinfo/SET_THEMES", value)
                    window.localStorage.setItem("themes", value ? value : false)
                }
            })

            const LogOut = () => {
                window.localStorage.removeItem("token")
                router.push("/")
                // window.location.reload()
            }
            return {
                appName,
                appName,
                isMenu,
                munePath,
                visible,
                locales,
                themes,
                direction,
                selectChange,
                selectedKeys,
                LogOut,
            }
        },
    }
</script>
<style scoped>
    .a-drawer {
        padding: 0 !important;
    }

    body .a-drawer {
        padding: none;
        /* --a-drawer-padding-primary:none;1 */
    }

    .common-layout>>>.ant-menu {

        background: none !important;
        color: #FFF;
        line-height: inherit;
    }
    .common-layout>>>.ant-menu-horizontal {
        border: none;
    }
</style>
<style scoped lang="less">
    .common-layout {
        // width: 100%;
        height: 64px;
        max-height: 64px;
        overflow: hidden;
        background: url(../images/header.png) 100% 100%;
        background-size: 100% 100%;
        color: #FFF;
        z-index: 1;
    }

    .layoutheader_Title {
        display: flex;
        align-items: center;
        height: 64px;
        overflow: hidden;
    }



    .a-menu-demo {
        background: none;
        color: #FFF !important;
        height: 62px;
        border: none;
        margin: 0 auto;
        justify-content: center;
    }




    .header_logo {
        height: 40px;
        width: auto;
        margin: 10px;
    }

    .project-name {
        font-size: 20px;
        cursor: pointer;
        font-family: 'Microsoft YaHei', '微软雅黑', ;
    }


    .layout-header-userBox {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        padding-right: 10px;

        span {
            color: #FFF;
        }
    }

    .layout-header-user {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        cursor: pointer;
        padding-left: 12px;
    }
</style>