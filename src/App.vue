<script setup>
import { RouterView } from 'vue-router'
import Aside from './components/Aside.vue';
import Header from './components/Header.vue';
import { useRoute } from 'vue-router'
import { watch, ref } from 'vue'

const asideSettings = ref({
    isCollapse:false,
    width:'220'
})

// 给子组件绑定事件，通过子组件emit从而改变父组件的值
const changeAside = ()=>{
   asideSettings.value.isCollapse = !asideSettings.value.isCollapse
   if(asideSettings.value.isCollapse){
    asideSettings.value.width = "64"
   }else{
    asideSettings.value.width = "220"
   }
}

const route = useRoute()
console.log(route);

const showComponent = ref(true)
// 监听路由变化
watch(
  () => route.path,
  () => {
    // 根据路由的 meta.hidden 判断是否隐藏 Aside 和 Header
    const hidden = route.meta.hidden
    showComponent.value = !hidden
  },
  { immediate: true } // 立即执行一次
)


</script>

<template>
  
  <div>
    <title>sssss</title>
    <el-container style="min-height: 100vh;min-width: 100vw;overflow: hidden;">
      <Aside :collapse="asideSettings.isCollapse" :width="asideSettings.width" v-if="showComponent"></Aside>
      <el-container style="height: 100vh;width:100%;display: flex;flex-direction: column;">
        <Header :isCollapse="asideSettings.isCollapse" @changeAside="changeAside" v-if="showComponent"></Header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style scoped>
</style>
