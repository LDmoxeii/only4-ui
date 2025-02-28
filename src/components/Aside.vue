<script setup>
import { ref } from 'vue'

const settings = defineProps({
  collapse: Boolean,
  width: String
})

const iconColor = ref('color:#F8FAFB')
</script>


<template>
  <el-aside :width="settings.width">
    <el-scrollbar>
      <el-menu :default-openeds="['1', '3']" 
      :collapse="settings.collapse" active-text-color="#F8FAFB"
        background-color="#1A1C1E" text-color="#74767A" router="true">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <House />
            </el-icon><span>首页</span>
          </template>
          <el-menu-item index="/admin/echatsIndex">首页</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Menu />
            </el-icon><span>文章管理</span>
          </template>
          <el-menu-item index="/admin/articles">文章管理列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Message />
            </el-icon><span>评论管理</span>
          </template>
          <el-menu-item index="/admin/comments">评论管理列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <Files />
            </el-icon><span>模块管理</span>
          </template>
          <el-menu-item index="/admin/blocks">模块管理列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon>
              <User />
            </el-icon><span>用户管理</span>
          </template>
          <el-menu-item index="/admin/users">用户管理列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon>
              <Watermelon />
            </el-icon><span>资源管理</span>
          </template>
          <el-menu-item index="/admin/filesAdmin">资源管理列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="7">
          <template #title>
            <el-icon>
              <Edit />
            </el-icon><span>编辑器</span>
          </template>
          <el-menu-item index="/admin/md">markdown</el-menu-item>
          <el-menu-item index="/admin/richText">富文本</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="8">
          <template #title>
            <el-icon>
              <setting />
            </el-icon><span>系统设置</span>
          </template>
          <el-menu-item index="/admin/light">背景色</el-menu-item>
        </el-sub-menu>
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
