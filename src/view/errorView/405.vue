<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
  <div class="content ">
    <div class="bg-white width100 height100 flex errorBox">
      <div>
        <a-result icon="error" title="404 服务器错误" sub-title="上回上一个页面">
          <template #extra>
            <a-button type="primary" @click="toback">Back</a-button>
          </template>
        </a-result>
      </div>
      <img src="../../assets/images/404.png"  style="width:500px;height:500px" alt="">
      
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
        router.back()
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