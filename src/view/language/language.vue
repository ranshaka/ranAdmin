<template>
    <div >
        <div class="change-locale">
            <span style="margin-right: 16px">Change Language:</span>
            <a-select ref="select" v-model:value="locales" style="width: 120px" >
                <a-select-option value="en">English</a-select-option>
                <a-select-option value="zh-cn">中文</a-select-option>
            </a-select>
        </div>
        <a-row>
            <a-col :span="16">
                <a-alert :message="$t('language.tips')" type="success" />
                <div class="padding-2x flex space-between ">
                    <a-button type="primary">{{$t('message.Primary')}}</a-button>
                    <a-button type="success">{{$t('message.Success')}}</a-button>
                    <a-button type="info">{{$t('message.Info')}}</a-button>
                    <a-button type="warning">{{$t('message.Warning')}}</a-button>
                    <a-button type="danger">{{$t('message.Danger')}}</a-button>
                </div>
                <div class="locale-components">
                    <div class="example">
                        <a-pagination :total="50" show-size-changer />
                    </div>
                    <div class="example">
                        <a-select show-search style="width: 200px">
                            <a-select-option value="jack">jack</a-select-option>
                            <a-select-option value="lucy">lucy</a-select-option>
                        </a-select>
                        <a-date-picker />
                        <a-time-picker />
                        <a-range-picker style="width: 200px" />
                    </div>

                    <div class="example">
                        <a-button type="primary" @click="visible = true">Show Modal</a-button>
                        <a-button @click="info">Show info</a-button>
                        <a-button @click="confirm">Show confirm</a-button>
                    </div>
                    <div class="example">
                        <a-transfer :data-source="[]" show-search :target-keys="[]" :render="item => item.title" />
                    </div>
                    <div class="site-config-provider-calendar-wrapper">
                        <a-calendar :fullscreen="false" />
                    </div>
                    <a-modal v-model:visible="visible" title="Locale Modal">
                        <p>Locale Modal</p>
                    </a-modal>
                </div>
            </a-col>
            <a-col :span="8">
                <div class="example">
                    <a-button type="primary" @click="visible = true">Show Modal</a-button>
                    <a-button @click="info">Show info</a-button>
                    <a-button @click="confirm">Show confirm</a-button>
                </div>
                <div class="example">
                    <a-transfer :data-source="[]" show-search :target-keys="[]" :render="item => item.title" />
                </div>
                <div class="site-config-provider-calendar-wrapper">
                    <a-calendar :fullscreen="false" />
                </div>
                <a-modal v-model:visible="visible" title="Locale Modal">
                    <p>Locale Modal</p>
                </a-modal>
            </a-col>
        </a-row>
    </div>

</template>
<script>
    import {
        Modal
    } from 'ant-design-vue';
    import {
        defineComponent,
        ref,
        computed
    } from 'vue';
    import {
        useI18n
    } from 'vue-i18n'
    import store from "@/store";
    export default defineComponent({
        setup() {
            const visible = ref(false);
            const info = () => {
                Modal.info({
                    title: 'some info',
                    content: 'some info',
                });
            };
            const confirm = () => {
                Modal.confirm({
                    title: 'some info',
                    content: 'some info',
                });
            };


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
            return {
                locales,
                visible,
                info,
                confirm,
            };
        },
    });
</script>
<style scoped>
    .site-config-provider-calendar-wrapper {
        width: 319px;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
    }

    .locale-components {
        border-top: 1px solid #d9d9d9;
        padding-top: 16px;
    }

    .example {
        margin: 16px 0;
    }

    .example>* {
        margin-right: 8px;
    }

    .change-locale {
        margin-bottom: 16px;
    }

    [data-theme='dark'] .locale-components {
        border-top: 1px solid #303030;
    }

    [data-theme='dark'] .site-config-provider-calendar-wrapper {
        border: 1px solid #303030;
    }
</style>