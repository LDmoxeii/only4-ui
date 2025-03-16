<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import a11Img from '@/assets/a11.jpeg'  // 导入assets下的图片，自己喜欢啥图加啥图就行
import { dynamicRoutes } from '@/router';
import { watch } from 'vue';

// 获得当前路由的路径
import { useRoute } from 'vue-router';

let routerList = () => {
  return Object.entries(dynamicRoutes).map(([role, roleRoutes]) => {
    return {
      role,
      roleRoutes
    }
  })
}
// 所有的路由信息
const list = routerList()[0].roleRoutes.map(item => {
    return {
        title: item.meta?.title,
        path: item.path,
        name: item.name,
        children: item.children?.map(child => {
            return {
                title: child.meta?.title,
                path: child.path
            }
        })
    }
})
const isCollapse = ref(false)

// 获取父组件传递过来的数据 
const showIcon = defineProps({
    isCollapse: Boolean,
    a: String,
})

// 获取父组件自定义的事件
const emit = defineEmits(['changeAside'])

// 自定义按钮点击事件，侧边栏的收缩按钮
const collapseAside = () => {
    isCollapse.value = !isCollapse.value; // 切换 isCollapse 的值
    emit('changeAside', isCollapse.value); // 触发父组件的事件，并传递当前状态
}

// 获得当前路由的路径
const route = useRoute();
const currentRoutePath = ref('')  // 使用 ref 创建响应式状态
onMounted(() => {
    
    // 监听路由变化
    currentRoutePath.value = route.fullPath;
})
// 监听路由变化
watch(
  () => route.fullPath,
  (newPath) => {
    currentRoutePath.value = newPath;
  }
);

const goHome = () => {
    //路由跳转到首页
    window.location.href = '/'; // 直接重定向到首页
};

// 退出登录
const LogOut = () => {
  ElMessage.success('登出成功！');
  // 在这里可以添加处理登出的逻辑，比如清除 token、重定向到登录页
};
</script>


<template>
    <div>
        <el-header style="display: flex;font-size: 16px;">
            <div style="display: inline-flex;flex: 1; align-items: center;justify-content: left;">
                <el-icon v-show="!showIcon.isCollapse" @click="collapseAside" style="color: #303133;">
                    <Fold />
                </el-icon>
                <el-icon v-show="showIcon.isCollapse" @click="collapseAside" style="color: #303133;">
                    <Expand />
                </el-icon>
                <div style="margin-left:10px">
                    <span class="gohome" @click="goHome">首页</span>
                    <span>{{ route.meta.mark }}</span>
                </div>
            </div>
            <div class="toolbar">
                <div class="block" style="margin-right: 10px;">
                    <el-avatar :size="40" :src="a11Img" />
                </div>
                <span>管理员</span>
                <el-dropdown trigger="click">
                    <el-icon style="margin-left: 18px; margin-top: 1px;color: #303133;">
                        <setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>View</el-dropdown-item>
                            <el-dropdown-item>Add</el-dropdown-item>
                            <el-dropdown-item @click="LogOut">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </el-header>
    </div>
</template>



<style scoped>
.el-header {
    width: 100%;
    background-color: #fff;
    color: var(--el-text-color-primary);
    box-shadow: var(--el-box-shadow);
}

.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
    text-align: right;
}

.el-dropdown-menu__item {
    width: 120px;
}

.icon-color {
    color: white;
}
.gohome{
    margin-right:10px;
    color:blue;
    cursor: pointer;
}

</style>
