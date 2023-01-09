<template>
    <div>
        <img src="../../assets/images/init.png" alt="" class="baseImg" @click="visible=true">
        <el-drawer v-model="visible" :direction="direction?'rtl':'ltr'" title="个人信息" :with-header="false" size="340px">
            <div class="baseUserInfo ">
                <div class="userbox">
                    <div class="infoBox">
                        <img src="../../assets/images/ranadmin.png" alt="" class="userIcon">
                        <div class="display:flex">
                            <div class="username">{{system[systemIndex].en}}</div>
                            <div class="userTitle">管理员角色</div>
                        </div>
                    </div>
                </div>
                <div class="userContent">
                    <el-form :model="form" label-width="100px" size="small">
                        <div class="form-item">
                            <div class="form-key">系统主题</div>
                            <div class="form-vakue">
                                <el-radio-group v-model="themes" class="ml-4">
                                    <el-radio label="defaultTheme" size="large">白天</el-radio>
                                    <el-radio label="darkTheme" size="large">黑夜</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">系统主题</div>
                            <div class="form-vakue">
                                <el-color-picker v-model="themesColor" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">国际化</div>
                            <div class="form-vakue">
                                <el-radio-group v-model="locales" class="ml-4">
                                    <el-radio label="zh-cn" size="large">中文</el-radio>
                                    <el-radio label="en" size="large">English</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">菜单类型</div>
                            <div class="form-vakue">
                                <!-- 如果页面固定菜单 直接锁死 -->
                                <el-radio-group v-model="isMenu" class="ml-4" :disabled="router.currentRoute.value.meta.menu">
                                    <el-radio :label="true" size="large">菜单Y</el-radio>
                                    <el-radio :label="false" size="large">菜单X</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">面包屑</div>
                            <div class="form-vakue">
                                <el-switch v-model="isBreadcrumb" class="mb-2" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">菜单导航</div>
                            <div class="form-vakue">
                                <el-switch v-model="isPathbar" class="mb-2" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">组件大小</div>
                            <div class="form-vakue">
                                <el-radio-group v-model="modulesSize" class="ml-4">
                                    <el-radio label="large" size="large">大</el-radio>
                                    <el-radio label="default" size="large">中</el-radio>
                                    <el-radio label="small" size="large">小</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">配置信息位置</div>
                            <div class="form-vakue">
                                <el-switch v-model="direction" class="mb-2" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">切换系统</div>

                        </div>
                        <div class="form-item">
                            <div class="form-vakue  ">
                                <el-scrollbar>
                                    <div class="systemBox">
                                        <div v-for="(item,index) in system" :key="index" @click="checkSystem(index)"
                                            :class="systemIndex==index ? 'systemListAction':''" class="systemList">
                                            <el-avatar :size="50"
                                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                            <div>{{item.en}}</div>
                                        </div>
                                    </div>
                                </el-scrollbar>
                            </div>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-drawer>
    </div>
</template>
<script>
    import {
        computed,
        ref,
    } from "@vue/reactivity";
    import store from "@/store";
    import {
        colorChange,
        changeTheme
    } from "@/common/themes/index"
    import {
        useI18n
    } from 'vue-i18n'
    import {
        ResetRouter
    } from "@/store/modules/userinfo";
    import { useRouter } from 'vue-router';

    export default {
        components: {},
        setup() {
            // 个人信息
            const visible = ref(false)
            const form = ref(true)
            const router=useRouter()
            const system = computed(() => store.getters.routerAll)
            const systemIndex = computed(() => store.getters.systemIndex)
            const checkSystem = (index) => {
                ResetRouter(index)
                store.commit("baseinfo/SET_ALL_LOADING", true)
                setTimeout(() => {
                    store.commit("baseinfo/SET_ALL_LOADING", false)
                }, 2000)
            }
        
            // 白天/黑夜模式
            const themes = computed({
                get: () => store.getters.themes,
                set: (value) => {
                    changeTheme(value)
                    store.commit("baseinfo/SET_THEMES", value)
                    store.commit("baseinfo/SET_THEMES_COLOR", "")
                    window.localStorage.setItem("themes", value)
                    window.localStorage.removeItem("themesColor", "")
                }
            })
            const themesColor = computed({
                get: () => store.getters.themesColor,
                set: (value) => {
                    colorChange(value)
                    window.localStorage.setItem("themesColor", value)
                    store.commit('baseinfo/SET_THEMES_COLOR', value);

                    store.commit("baseinfo/SET_THEMES", 'defaultTheme')
                    window.localStorage.setItem("themes", 'defaultTheme')
                }
            })
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
            const isMenu = computed({
                get: () => store.getters.isMenu,
                set: (value) => {
                    console.log(router)
                    console.log(useRouter)
                    window.localStorage.setItem("isMenu", value)
                    store.commit('baseinfo/SET_IS_MENU', value);
                }
            })
            const isBreadcrumb = computed({
                get: () => store.getters.isBreadcrumb,
                set: (value) => {
                    window.localStorage.setItem("isBreadcrumb", value)
                    store.commit('baseinfo/SET_IS_BREADCRUMB', value);
                }
            })

            const modulesSize = computed({
                get: () => store.getters.modulesSize,
                set: (value) => {
                    window.localStorage.setItem("modulesSize", value)
                    store.commit('baseinfo/SET_MODULES_SIZE', value)
                }
            })
            const isPathbar = computed({
                get: () => store.getters.isPathbar,
                set: (value) => {
                    window.localStorage.setItem("isPathbar", value)
                    store.commit('baseinfo/SET_IS_PATH_BAR', value)
                }
            })
            const direction = computed({
                get: () => store.getters.direction,
                set: (value) => {
                    window.localStorage.setItem("direction", value)
                    store.commit('baseinfo/SET_DIRECTION', value);
                }
            })





            return {
                router,
                visible,
                system,
                systemIndex,
                form,
                isMenu,
                locales,
                isBreadcrumb,
                isPathbar,
                direction,
                themes,
                themesColor,
                modulesSize,


                checkSystem,
            }
        },
    }
</script>
<style scoped lang="less">
    .baseImg {
        position: fixed;
        right: 10px;
        top: 40%;
        z-index: 10;
        width: 50px;
        height: 30px;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    .baseUserInfo {
        color: #000;
        background: #F9F9F9;
        box-shadow: var(--el-box-shadow-dark);
        height: 100%;

        .userbox {
            width: 100%;
            height: 150px;
            background: var(--el-color-primary-light-6);
            padding: 40px 20px;
            box-sizing: border-box;

            .infoBox {
                display: flex;
                align-items: center;
                padding-bottom: 4px;
                border-bottom: 1px solid #EEE;

                .username {
                    color: #FFf;
                    font-size: 20px;
                    font-weight: 600;
                    margin-left: 20px;
                    margin-top: 30px;
                }

                .userTitle {
                    color: #FFF;
                    margin-left: 20px;
                }

                .userIcon {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
        }

        .el-radio {
            margin-right: 10px;
        }

        .userContent {
            width: 100%;
            
            .form-item {
                padding: 10px 20px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-sizing: border-box;
                border-bottom: #eee 1px solid;
            }
        }

        .systemBox {
            display: flex;
            width: 100%;
            .systemList {
                width: 100px;
                text-align: center;
                cursor: pointer;
            }

            .systemListAction {
                color: aqua;
            }
        }



    }
</style>