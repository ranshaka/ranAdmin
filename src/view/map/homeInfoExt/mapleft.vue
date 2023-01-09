<!--
 * @Description: Description
 * @Date: 2022-03-25 16:05:57
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-11-18 17:39:57
 * @FilePath: \daobao-web\src\views\userInfo\userInfo.vue
-->
<template>
    <div class="homeInfoSvn">
        <mapleftCar></mapleftCar>
        <mapleft_move></mapleft_move>
        <mapleft_bottom></mapleft_bottom>
    </div>
</template>

<script>
    import {
        defineComponent,
    } from 'vue';
    import mapleftCar from "@/view/map/homeInfoExt/mapleft/mapleft_car.vue"
    import mapleft_move from "@/view/map/homeInfoExt/mapleft/mapleft_move.vue"
    import mapleft_bottom from "@/view/map/homeInfoExt/mapleft/mapleft_bottom.vue"
    export default defineComponent({
        name: 'BusinessManagement',
        components: {
            mapleftCar,
            mapleft_move,
            mapleft_bottom,
            
        },
       setup(){

       }
    });
</script>
<style lang="less" scoped>
     
</style>