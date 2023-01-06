<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
  <div  class="vfCodeComponents" title="点击切换验证码">
      <identify :identifyCode="identifyCode"></identify>
    </div>

</template>
<script>
  import {
        computed,
        watch,
        ref,
    } from 'vue';
    import identify from "@/publicView/login/identifyCode"
  export default {
    components:{
      identify
    },
      setup() {
          const isSidentify = ref(4)
          const sidentifyMode = ref("")
          const identifyCode = ref("1111")
          const identifyCodes = ref(['0', '1', '2', '3', 'a', 'b', 'c', 'z'])
          const randomNum=(min, max)=> {
              max = max + 1
              return Math.floor(Math.random() * (max - min) + min)
          }
          // 更新验证码
          const refreshCode=()=> {
              identifyCode.value = ''
              makeCode(identifyCodes.value, 4)
              // console.log('当前验证码:', this.identifyCode)
          }
          // 随机生成验证码字符串
          const makeCode=(data, len)=> {
              // console.log('data, len:', data, len)
              for (let i = 0; i < len; i++) {
                  identifyCode.value += identifyCodes.value[randomNum(0, identifyCodes.value.length - 1)]
              }
          }
          const getCode=()=>{
            return identifyCode.value
          }
          return{
              isSidentify,
              identifyCode,
              identifyCodes,
              makeCode,
              refreshCode,
              randomNum,
              getCode,
          }
      },
  }
</script>
<style lang="less">
  .vfCodeComponents {
    position: relative;
    bottom: 43px;
    left: 219px;
    cursor: pointer;
  
}

</style>