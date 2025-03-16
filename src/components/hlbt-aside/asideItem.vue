<script setup>
import { onMounted, ref } from 'vue'
import iconvue from '@/components/icons/index.vue';

// 获取父组件传递过来的数据 
const props = defineProps({
  collapse: Boolean,
  a: {},
  item: {},
  basePath: {
    type: String,
    default: ''
  }
})
console.log(props.collapse,  props.basePath);

const resolvePath = (...paths) => {
  let path = paths.join('/').replace(/\/+/g, '/');
  return path;
};
import { resolve } from 'path-browserify'; // 引入路径解析工具
// const resolvePath = (...paths) => {
//   return resolve(...paths); // 自动处理斜杠
// };
</script>


<template>
  <div>
    <!-- 如果有子路由并且不隐藏 -->
    <template v-if="item.children.length > 0 && !item?.hidden">
      <el-sub-menu v-if="!item.allChildrenHidden"  :class="{'collapse-menu': collapse}" :index="item.path" :collapse="props.collapse">
        <template #title>
          <iconvue v-if="item.icon" :name="item.icon" color="#74767A" />
          <span  v-show="!collapse" style="margin-left: 10px">{{ item.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <asideItem :item="child" :base-path="item.path"></asideItem>
        </template>
      </el-sub-menu>

      <el-menu-item v-if="item.allChildrenHidden" :index="item.path">
        <template #title>
          <iconvue v-if="item.icon" :name="item.icon" color="#74767A" />
          <span  v-show="!collapse" style="margin-left: 10px">{{ item.title }}</span>
        </template>
        <template v-for="child in item.children" :key="child.path">
          <asideItem :item="child" :base-path="item.path"></asideItem>
        </template>
      </el-menu-item>

    </template>
    <!-- 如果没有子路由并且不隐藏 -->
    <template v-else-if="item.children.length == 0 && !item?.hidden">
      <el-menu-item :index="item.path">
        <iconvue v-if="item.icon" :name="item.icon" color="#74767A" />
        <span v-show="!collapse" style="margin-left: 10px">{{ item.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>
<style scoped>
:deep(.collapse-menu) .el-sub-menu__icon-arrow {
  display: none !important;
}
</style>
