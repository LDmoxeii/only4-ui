<template>
    <svg :class="svgClass" aria-hidden="true">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  const props = defineProps({
    iconClass: { type: String, required: true },
    color: { type: String, default: 'currentColor' },
    size: { type: String, default: '1em' }
  });
  const symbolId = computed(() => `#icon-${props.iconClass}`);
  const svgClass = computed(() => `svg-icon ${props.className || ''}`);
  </script>
  
  <style scoped>
  .svg-icon {
    width: v-bind('props.size');
    height: v-bind('props.size');
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  </style>