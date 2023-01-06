<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->



<template>
    <div class="content minHeight100">
        <div>
            <p class="margin-bottom">选择语言</p>
            <a-select size="media" v-model="locale" style="200px" @change="changeLanguage" class="margin-bottom">
                <a-option :key="value.value" :value="value.value" :label="value.name" v-for="value in languageList">
                </a-option>
            </a-select>
            <a-alert :title="$t('language.tips')" type="success" />
        </div>
        <a-divider />
        <a-row class="mb-4">
            <a-button type="primary">{{$t('message.Primary')}}</a-button>
            <a-button type="success">{{$t('message.Success')}}</a-button>
            <a-button type="info">{{$t('message.Info')}}</a-button>
            <a-button type="warning">{{$t('message.Warning')}}</a-button>
            <a-button type="danger">{{$t('message.Danger')}}</a-button>
        </a-row>
        <a-button mb-2 @click="toggle">Switch Language</a-button>
        <br />
        <a-table mb-1 :data="[]" />
        <a-pagination :total="100" />
    </div>
</template>
<script>
    import {
        defineComponent,
        computed,
        ref,
    } from 'vue'
    import {
        useI18n
    } from 'vue-i18n'
    import store from "@/store";
    export default defineComponent({
        components: {},
        setup() {
            const {
                locale,
                messages
            } = useI18n();
            const languageList = ref([{
                    name: "中文",
                    value: "zh-cn"
                },
                {
                    name: "English",
                    value: "en"
                },
            ])
            const changeLanguage = (lang) => {
                locale.value = lang;
                store.commit("baseinfo/SET_LOCALES", lang)
                window.localStorage.setItem("locales", lang)
            }

            return {
                locale,
                languageList,
                changeLanguage,
            }
        }
    })
</script>