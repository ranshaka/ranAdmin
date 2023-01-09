<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-19 16:56:24
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="homeRight">
        <mapright_top></mapright_top>
        <mapright_content></mapright_content>
        <mapright_bottom></mapright_bottom>
 
    </div>
</template>

<script>

    import {
        defineComponent,
    } from 'vue';
    // import mapright_tips from "@/view/map/homeInfoExt/mapright/mapright_tips.vue"
    import mapright_top from "@/view/map/homeInfoExt/mapright/mapright_top.vue"
    import mapright_content from "@/view/map/homeInfoExt/mapright/mapright_content.vue"
    import mapright_bottom from "@/view/map/homeInfoExt/mapright/mapright_bottom.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            // mapright_tips,
            mapright_top,
            mapright_content,
            mapright_bottom,
        },
       setup(){
        
       }
    });
</script>
<style lang="less" scoped>

</style>