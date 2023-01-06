<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-22 13:25:59
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="homeInfoSvn">
        <mapleft_top></mapleft_top>
        <mapleft_content></mapleft_content>
        <mapleft_bottom></mapleft_bottom>
    </div>
</template>

<script>
    import {
        defineComponent,
    } from 'vue';
    import mapleft_top from "@/view/map/homeInfoExt/mapleft/mapleft_top.vue"
    import mapleft_content from "@/view/map/homeInfoExt/mapleft/mapleft_content.vue"
    import mapleft_bottom from "@/view/map/homeInfoExt/mapleft/mapleft_bottom.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            mapleft_top,
            mapleft_content,
            mapleft_bottom,
            
        },
       setup(){

       }
    });
</script>
<style lang="less" scoped>
     
</style>