


<template>
    <div class="content minHeight100">
        <div>
            <p class="margin-bottom">选择语言</p>
            <el-select size="media" v-model="locale" style="200px" @change="changeLanguage" class="margin-bottom">
                <el-option :key="value.value" :value="value.value" :label="value.name" v-for="value in languageList">
                </el-option>
            </el-select>
            <el-alert :title="$t('language.tips')" type="success" />
        </div>
        <el-divider />
        <el-row class="mb-4">
            <el-button type="primary">{{$t('message.Primary')}}</el-button>
            <el-button type="success">{{$t('message.Success')}}</el-button>
            <el-button type="info">{{$t('message.Info')}}</el-button>
            <el-button type="warning">{{$t('message.Warning')}}</el-button>
            <el-button type="danger">{{$t('message.Danger')}}</el-button>
        </el-row>
        <el-button mb-2 @click="toggle">Switch Language</el-button>
        <br />
        <el-table mb-1 :data="[]" />
        <el-pagination :total="100" />
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