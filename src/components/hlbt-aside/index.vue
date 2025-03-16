<!-- 父组件模板 -->
<template>
  <div>

    <el-aside :width="width">
      <el-scrollbar>
        <el-menu :collapse="collapse" active-text-color="#F8FAFB" background-color="#1A1C1E" text-color="#74767A"
          :router="true">
          <!-- 
          rl[0].routes 
          rl : {
            role: '',
            routes: []
          } 
          -->
          <div v-for="i in rl[0].routes" :key="i.path">
            <AsideItem :a="a" :item="i" :collapse="collapse"></AsideItem>
          </div>

        </el-menu>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script lang="ts" setup>
import AsideItem from './asideItem.vue';
import { dynamicRoutes } from '@/router';
import { resolve } from 'path-browserify';
const a = {
  title: "首页",
  path: "",
  name: "名字"
}
const props = defineProps({
  collapse: Boolean,
  width: String
});
// 路由处理函数优化
const normalizeRoutes = (routes, basePath = ''): any[] => {
  
  return routes
    // .filter(route => !route.meta?.hidden)
    .map(route => {
      const allChildrenHidden = (route) => {
        const children = route.children || [];
        return children.length > 0 && children.every(child => child.meta?.hidden === true);
      }
      const fullPath = resolve(basePath, route.path)
        .replace(/\/+/g, '/')
        .replace(/\/$/, ''); // 移除结尾斜杠
      return {
        title: route.meta?.title,
        hidden: route.meta?.hidden,
        allChildrenHidden: allChildrenHidden(route),
        icon: route.meta?.icon,
        path: fullPath,
        name: route.name,
        children: route.children
          ? normalizeRoutes(route.children, fullPath)
          : [] // 保持空数组而不是undefined
      };
    });
};
let routerList = (basePath='') => {
  return Object.entries(dynamicRoutes).map(([role, roleRoutes]) => {
    return {
      role,
      routes: normalizeRoutes(roleRoutes, basePath) || []
    }
  })
}
const rl = routerList()
// console.log(rl);



</script>
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