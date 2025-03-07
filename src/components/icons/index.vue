<template>
  <svg :style="{ width, height }">
    <use :href="prefix + name" :fill="color"></use>
  </svg>
</template>

<script setup>
  // 接收父组件传递过来的参数
  defineProps({
    prefix: {
      type: String,
      default: "#icon-"
    },
    // svg名称
    name: String,
    // svg颜色
    color: {
      type: String,
      default: "#0fffff"
    },
    // svg宽度
    width: {
      type: String,
      default: "15px"
    },
    // svg高度
    height: {
      type: String,
      default: "15px"
    }

  });
</script>
