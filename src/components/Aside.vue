<script setup lang="ts">
import { ref } from 'vue'
import { constantRoutes } from '@/router';

// 所有的路由信息
//console.log(constantRoutes);
const list = constantRoutes.map(item => {
  return {
    title: item.meta?.title,
    path: item.path,
    name: item.name,
    hidden: item.meta?.hidden,
    children: item.children?.map(child => {
      return {
        title: child.meta?.title,
        path: child.path
      }
    })
  }
})
// console.log(list);


const settings = defineProps({
  collapse: Boolean,
  width: String
})
const iconColor = ref('color:#fff000')
import iconvue from '@/components/icons/index.vue'
</script>


<template>
  <el-aside :width="settings.width" >
    <el-scrollbar>
      <el-menu :collapse="settings.collapse" active-text-color="#F8FAFB"
        background-color="#1A1C1E" text-color="#74767A" router="true">
        <template v-for="(subItem, subIndex) in list" :key="subIndex">
          <el-sub-menu v-if="subItem.children && subItem.children.length > 0"  :index="subItem.path">
            <template #title>
              <iconvue :name="subItem.name" color="#74767A"></iconvue>
              <span style="margin-left:10px">{{ subItem.title }}</span>
            </template>
            <el-menu-item v-for="(childItem, childIndex) in subItem.children" :key="childIndex" :index="childItem.path">
              {{ childItem.title }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="subItem.path">
            <iconvue :name="subItem.name" color="#74767A"></iconvue>
            <span style="margin-left:10px">{{ subItem.title }}</span>
          </el-menu-item>
        </template>
        <!-- <el-sub-menu v-for="(subItem, subIndex) in list" :key="subIndex" :index="subItem.path">
          <template #title>
            <el-icon>
              <House />
            </el-icon><span>{{ subItem.title }}</span>
          </template>
          <el-menu-item v-for="(childItem, childIndex) in subItem.children" :key="childIndex" :index="childItem.path">{{
            childItem.title
            }}</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>


<style scoped>
.el-aside {
  height: 100vh;
  overflow: hidden;
  box-shadow: var(--el-box-shadow-lighter);
}

.el-scrollbar {
  height: 100vh;
  overflow: hidden;
  background-color: #1A1C1E;
}

.el-menu {
  border-right: none;
}
</style>
