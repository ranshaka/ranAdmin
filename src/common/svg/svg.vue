<!--
 * @name: name
 * @description: Description
 * @lastEditors: Francis
 * @date: Do not edit
 * @lastEditTime: Do not edit
 * @filePath: Do not edit
-->

<template>
    <svg class="svg-icon " :class="className" :style="size?`width:${size}px;height:${size}px;`:''" aria-hidden="true">
      <use :xlink:href="svgName" />
    </svg>
  </template>
  
  <script setup>
    import { ref,computed } from 'vue';
  // 声明组件要触发的事件
  const emits = defineEmits(['increase']);
  // 声明接收参数
  const props = defineProps({
    svg: String,
    class: String,
    size: Number,
  });
  const svgName=computed(()=>`#icon-${props.svg}` )
  const className=computed(()=>props.class)
  const size=computed(()=>props.size)

  </script>
  
  <style scoped>
  .svg-icon {
    width: 16px;
    height: 16px;
    vertical-align: -0.25em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>
  