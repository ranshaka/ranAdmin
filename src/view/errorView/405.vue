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
    <div class="bg-white width100 height100 flex">
      <img src="../../assets/images/404.png"  style="width:500px;height:500px" alt="">
      <div>
        <a-result icon="error" title="404  页面找不到了" sub-title="上回上一个页面">
          <template #extra>
            <a-button type="primary">Back</a-button>
          </template>
        </a-result>
      </div>
    </div>

  </div>
</template>

<script>
  import {
    computed,
    defineComponent,
    onMounted, //响应式
    ref,
    watch,
    nextTick
  } from 'vue';
  import {
    useStore
  } from "vuex";
  import {
    roles
  } from "@/router/role"
  export default defineComponent({
    name: 'BusinessManagement',
    components: {},
    setup() {

      return {


      }
    }
  });
</script>
<style>

</style>