<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->
<template>
  <div class="content height100 ">
    <div class="bg-white width100 height100 flex">
      <img src="../../assets/images/404.png" class="height100" alt="">
      <div>
        <el-result icon="error" title="404  页面找不到了" sub-title="上回上一个页面">
          <template #extra>
            <el-button type="primary">Back</el-button>
          </template>
        </el-result>
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