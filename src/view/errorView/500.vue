
<template>
  <div class="content ">
    <div class="bg-white width100 height100 flex errorBox">
      <div>
        <a-result icon="error" title="500 服务器错误" sub-title="上回上一个页面">
          <template #extra>
            <a-button type="primary">Back</a-button>
          </template>
        </a-result>
      </div>
      <img src="../../assets/images/500.png"  style="width:500px;height:500px" alt="">
      
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
.errorBox{
  width: 1000px;
  margin:0 auto;
}
</style>