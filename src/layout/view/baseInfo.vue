<template>
    <div class="drawer" ref="drawer">
        <img src="../../assets/images/init.png" alt="" class="baseImg" @click="visible=true">
        <a-drawer :visible="visible" :closable="false" :getContainer="() => $refs.drawer"
            :placement="direction?'right':'left'" @close="visible=false" :with-header="false" size="340px">
            <div class="baseUserInfo background">
                <div class="userbox">
                    <div class="infoBox">
                        <img src="../../assets/images/user.jpg" alt="" class="userIcon">
                        <div class="display:flex">
                            <div class="username">{{ $t(`menu.${system[systemIndex].path}`)}}</div>
                            <div class="userTitle">ranAdmin</div>
                        </div>
                    </div>
                </div>
                <div class="userContent">
                    <a-form :model="form" laba-width="100px" size="small">
                        <div class="form-item">
                            <div class="form-key">顶部边框</div>
                            <div class="form-vakue">
                                <a-radio-group v-model:value="borderTop" class="ml-4">
                                    <a-radio :value="true" size="large">是</a-radio>
                                    <a-radio :value="false" size="large">否</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">主题风格</div>
                            <div class="form-vakue">
                                <a-radio-group v-model:value="themes" class="ml-4">
                                    <a-radio :value="false" size="large">白天</a-radio>
                                    <a-radio :value="true" size="large">黑夜</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">动态主题</div>
                            <div class="form-vakue themesColorBox flex">
                                <colorPicker v-model="themesColor.primaryColor" result="#1890ff" title="asda">
                                </colorPicker>
                                <colorPicker v-model="themesColor.errorColor" result="#ff4d4f"></colorPicker>
                                <colorPicker v-model="themesColor.warningColor" result="#faad14"></colorPicker>
                                <colorPicker v-model="themesColor.successColor" result="#52c41a"></colorPicker>
                                <colorPicker v-model="themesColor.infoColor" result="#909399"></colorPicker>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">国际化</div>
                            <div class="form-vakue">
                                <a-radio-group v-model:value="locales" class="ml-4">
                                    <a-radio value="zh-cn" size="large">中文</a-radio>
                                    <a-radio value="en" size="large">English</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">固定header</div>
                            <div class="form-vakue">
                                <a-radio-group v-model:value="fixedTop" class="ml-4">
                                    <a-radio :value="true" size="large">是</a-radio>
                                    <a-radio :value="false" size="large">否</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">菜单类型</div>
                            <div class="form-vakue">
                                <!-- 如果页面固定菜单 直接锁死 -->
                                <a-radio-group v-model:value="isMenu" class="ml-4"
                                    :disabled="router.currentRoute.value.meta.menu">
                                    <a-radio :value="true" size="large">菜单Y</a-radio>
                                    <a-radio :value="false" size="large">菜单X</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">面包屑</div>
                            <div class="form-vakue">
                                <a-switch v-model:checked="isBreadcrumb" checked-children="开" un-checked-children="关" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">菜单导航</div>
                            <div class="form-vakue">
                                <a-switch v-model:checked="isPathbar" checked-children="开" un-checked-children="关" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">组件大小</div>
                            <div class="form-vakue">
                                <a-radio-group v-model:value="modulesSize" class="ml-4">
                                    <a-radio value="large" size="large">大</a-radio>
                                    <a-radio value="default" size="large">中</a-radio>
                                    <a-radio value="small" size="large">小</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">配置信息位置</div>
                            <div class="form-vakue">
                                <a-switch v-model:checked="direction" checked-children="开" un-checked-children="关" />
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="form-key">切换系统</div>

                        </div>
                        <div class="form-item">
                            <div class="form-vakue  ">
                                <a-scrollbar>
                                    <div class="systemBox">
                                        <div v-for="(item,index) in system" :key="index" @click="checkSystem(index)"
                                            :class="systemIndex==index ? 'systemListAction':''" class="systemList">
                                            <a-avatar :size="50"
                                                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                                            <div>{{ $t(`menu.${item.path}`)}}</div>
                                        </div>
                                    </div>
                                </a-scrollbar>
                            </div>
                        </div>
                    </a-form>
                </div>
            </div>
        </a-drawer>
    </div>
</template>
<script setup>
    import {
        computed,
        ref,
        watch,
    } from "vue";
    import store from "@/store";
    import {
        useI18n
    } from 'vue-i18n'
    import {
        ResetRouter
    } from "@/store/modules/userinfo";
    import {
        useRouter
    } from 'vue-router';
    import {
        ConfigProvider,
    } from 'ant-design-vue';
    import colorPicker from "@/components/colorPicker"

    // 个人信息
    const visible = ref(false)
    const form = ref(true)
    const router = useRouter()
    const system = computed(() => store.getters.routerAll)
    const systemIndex = computed(() => store.getters.systemIndex)
    const checkSystem = (index) => {
        ResetRouter(index)
        store.commit("baseinfo/SET_ALL_LOADING", true)
        setTimeout(() => {
            store.commit("baseinfo/SET_ALL_LOADING", false)
            visible.value = false
        }, 2000)
    }

    // 白天/黑夜模式
    const borderTop = computed({
        get: () => store.getters.borderTop,
        set: (value) => {
            store.commit("baseinfo/SET_BORDERTOP", value)
            window.localStorage.setItem("borderTop", value)
        }
    })
    const themes = computed({
        get: () => store.getters.themes,
        set: (value) => {
            store.commit("baseinfo/SET_THEMES", value)
            window.localStorage.setItem("themes", value)
        }
    })
    const themesColor = computed(() => store.getters.themesColor)
    watch(
        themesColor, (newval, oldval) => {
            window.localStorage.setItem("themes", false)
            window.localStorage.removeItem("themesColor", )
            ConfigProvider.config({
                theme: newval,
            });
            window.localStorage.setItem("themesColor", JSON.stringify(newval))
            store.commit('baseinfo/SET_THEMES_COLOR', newval);
        },
        // 第三个参数，监视的配置
        {
            // immediate: true,
            deep: true,
        }
    );

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
    const fixedTop = computed({
        get: () => store.getters.fixedTop,
        set: (value) => {
            window.localStorage.setItem("fixedTop", value)
            store.commit('baseinfo/SET_FIXEDTOP', value);
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
            console.log(value)
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
</script>
<style scoped lang="less">
    .baseImg {
        position: fixed;
        right: 10px;
        top: 40%;
        z-index: 10;
        width: 30px;
        height: 30px;
        cursor: pointer;

        img {
            width: 100%;
        }
    }

    .baseUserInfo {
        box-shadow: var(--a-box-shadow-dark);
        height: 100%;

        .userbox {
            width: 100%;
            height: 150px;
            background: var(--a-color-primary-light-6);
            padding: 40px 20px;
            box-sizing: border-box;

            .infoBox {
                display: flex;
                align-items: center;
                padding-bottom: 4px;
                border-bottom: 1px solid #EEE;

                .username {
                    // color: #FFf;
                    font-size: 20px;
                    font-weight: 600;
                    margin-left: 20px;
                    margin-top: 30px;
                }

                .userTitle {
                    // color: #FFF;
                    margin-left: 20px;
                }

                .userIcon {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                }
            }
        }

        .a-radio {
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

                .themesColorBox {
                    input {
                        width: 20px;
                        margin-left: 20px;
                    }
                }
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