<!--
 * @Author: 41
 * @Date: 2021-11-15 10:48:28
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-10-14 16:56:48
 * @Description:
-->

<template>
  <div>
    <div :id="uuid" style="height: 100%; width: 100%"></div>
  </div>

  </template>
  
  <script >
  import { defineComponent, onMounted, watch,nextTick } from "vue";
  import * as echarts from "echarts";
  export default defineComponent({
    name: "App",
    props: {
      options: {
        type: Object,
        default: null,
      },
    },
    setup(props,{emit}) {
      const idGen = () => {
        return new Date().getTime()+(Math.random()*500+500);
      };
      let uuid = idGen();
      let myChart = null
      const initEcharts = () => {
        if (!myChart) {
          const dom = document.getElementById(uuid.toString());
          myChart = echarts.init(dom);
        } else {
          return;
        }
        if (!props.options) return;
        myChart.setOption(props.options);
        myChart.resize();
        // 封装监听点击事件
        myChart.on('click',  function(params) {
          emit("change",params)
          // 关系图的节点被点击时此方法被回调。
        })
        window.addEventListener("resize", function () {
         myChart.resize();         
      });


      };

      watch(
        props.options,
        () => {
          if (myChart) {
            myChart.setOption(props.options);
          }
        },
        { deep: true }
      );
      onMounted(() => {
        initEcharts();

      });
      return {
        uuid,
      };
    },
  });
  </script>
  
  <style>
  </style>
  