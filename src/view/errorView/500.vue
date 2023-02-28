<!--
 * @name: name
 * @description: Description00
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
  <div class="content ">
    <div class="bg-white width100 height100 flex errorBox">
      <div>
        <a-result icon="error" title="500 服务器错误" sub-title="上回上一个页面">
          <template #extra>
            <a-button type="primary" @click="toback">Back</a-button>
          </template>
        </a-result>
      </div>
      <img src="../../assets/images/500.png"  style="width:500px;height:500px" alt="">
      
    </div>

  </div>
</template>

<script>
  import {
    defineComponent,
  } from 'vue';
  import {
        useRouter
    } from 'vue-router';
  export default defineComponent({
    name: 'BusinessManagement',
    components: {},
    setup() {
      const router = useRouter()
      const toback=()=>{
        // router.back()
        router.go(-1)
      }
      return {
        toback

      }
    }
  });
</script>
<style>
.errorBox{
  width: 1000px;
  margin:0 auto;
}
</style>