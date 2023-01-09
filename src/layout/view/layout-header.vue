<template>
    <div>
        <div class="common-layout ">
            <el-row>
                <el-col :span="6">
                    <div class="layoutheader_Title">
                        <img v-maxImg src="../images/1.jpg" class="header_logo" :tatile="appName" />
                        <span class="project-name">
                            <span class="dynamicText" v-for="(item,index) in appName" :key="index">{{item}}</span>
                        </span>
                    </div>
                </el-col>
                <el-col :span="14">
                    <template v-if="!isMenu">
                        <el-scrollbar>
                            <el-menu class="el-menu-demo" :default-active="$router.currentRoute.value.path" router
                                mode="horizontal">
                                <template v-for="value in munePath" :key="value.apth">
                                    <el-sub-menu :index="value.path" v-if="value.children && value.children.length">
                                        <template #title>
                                            <el-icon>
                                                <svg class="icon-md" aria-hidden="true">
                                                    <use :xlink:href="value.icon"></use>
                                                </svg>
                                            </el-icon>
                                            <span>{{ $t(`menu.${value.en}`)}}</span>
                                        </template>
                                        <template v-for="item in value.children" :key="item.path">
                                            <el-sub-menu :index="item.path"
                                                v-if="item.children && item.children.length">
                                                <template #title>
                                                    <el-icon>
                                                        <svg class="icon-md" aria-hidden="true">
                                                            <use :xlink:href="item.icon"></use>
                                                        </svg>
                                                    </el-icon>
                                                    <span>{{ $t(`menu.${item.en}`)}}</span>
                                                </template>
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
                        </el-scrollbar>
                    </template>
                </el-col>
                <el-col :span="4">
                    <div class="flex row-reverse">
                        <div class="layout-header-userBox">
                            <el-dropdown trigger="click">
                                <div class="layout-header-user">
                                    <!-- <span class="project-name">
                            <span class="dynamicText" v-for="(item,index) in 'ranAdmin'" :key="index">{{item}}</span>
                        </span> -->
                                    <span>ranAdmin</span>
                                    <img src="../images/1.jpg" class="header_logo" tatile="VUE自定义后台管理模板" />
                                </div>
                                <template #dropdown>
                                    <el-dropdown-menu style="width:100px">
                                        <el-dropdown-item>个人信息</el-dropdown-item>
                                        <el-dropdown-item>修改密码</el-dropdown-item>
                                        <el-dropdown-item>退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                        <el-dropdown trigger="click">
                            <svg class="icon-4x" aria-hidden="true">
                                <use
                                    :xlink:href="locales =='en'?'#icon-zhongyingwenqiehuan-yingwen':'#icon-zhongyingwenqiehuan-zhongwen'">
                                </use>
                            </svg>
                            <template #dropdown>
                                <el-dropdown-menu style="width:100px">
                                    <el-dropdown-item @click="locales='zh-cn'">中文</el-dropdown-item>
                                    <el-dropdown-item @click="locales='en'">英文</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <el-dropdown trigger="click">
                            <svg class="icon-4x margin-right-2x" aria-hidden="true">
                                <use :xlink:href="themes =='defaultTheme'?'#icon-qingtian-baitian':'#icon-heiyemoshi1'">
                                </use>
                            </svg>
                            <template #dropdown>
                                <el-dropdown-menu style="width:100px">
                                    <el-dropdown-item @click="themes='defaultTheme'">白天模式</el-dropdown-item>
                                    <el-dropdown-item @click="themes='darkTheme'">黑夜模式</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>
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
        changeTheme
    } from "@/common/themes/index"
    export default {
        components: {
            baseInfo
        },
        setup() {
            const appName = ref(store.getters.appName)
            // 菜单类型
            const isMenu = computed(() => store.getters.isMenu)
            // 菜单列表
            const munePath = ref([])
            munePath.value = store.getters.allMenu

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

            // 白天/黑夜模式
            const themes = computed({
                get: () => store.getters.themes,
                set: (value) => {
                    if (value == 'darkTheme') {

                    }
                    changeTheme(value)
                    store.commit("baseinfo/SET_THEMES", value)
                    store.commit("baseinfo/SET_THEMES_COLOR", "")
                    window.localStorage.setItem("themes", value)
                    window.localStorage.removeItem("themesColor", "")
                }
            })

            return {
                appName,
                isMenu,
                munePath,
                visible,
                locales,
                themes,
                direction,
            }
        },
    }
</script>
<style scoped>
    .el-drawer {
        padding: 0 !important;
    }

    body .el-drawer {
        padding: none;
        /* --el-drawer-padding-primary:none;1 */
    }

    .common-layout>>>.el-menu-item {

        /* background-color: none !important; */
        color: #FFF;
    }

    .common-layout>>>.el-sub-menu__title {

        background: none !important;
        color: #fff;
    }

    .common-layout>>>.el-sub-menu__title:hover {

        background-color: none !important;
        color: #12a3f5 !important;
    }

    .common-layout>>>.el-menu-item:hover {
        outline: 0 !important;
        background: none;
        color: #12a3f5 !important;

    }

    .common-layout>>>.el-menu-item.is-active {
        color: #12a3f5 !important;
        background-color: none !important;
    }

    .common-layout>>>.is-opened {
        background-color: none !important;
        color: red;
    }

    .common-layout>>>.el-sub-menu.is-active .el-sub-menu__title {
        color: #12a3f5 !important;
        background-color: none !important;
    }
</style>
<style scoped lang="less">
    .common-layout {
        height: 60px;
        max-height: 60px;
        overflow: hidden;
        background: url(../images/header.png) 100% 100%;
        background-size: 100% 100%;
        color: #FFF;
    }

    .layoutheader_Title {
        display: flex;
        align-items: center;
        height: 60px;
        overflow: hidden;
    }



    .el-menu-demo {
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