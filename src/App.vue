<script setup>
import { RouterView } from 'vue-router'
import hlbtaside from './components/hlbt-aside/index.vue';// 这个使用
import Header from './components/hlbt-header/hlbt-header.vue';
import { useRoute } from 'vue-router'
import { watch, ref,provide } from 'vue'
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

//提供 Header 组件实例
const headerComponent = ref(null);
provide('Header',headerComponent)

</script>

<template>
  
  <div>
    <title>sssss</title>
    <el-container style="min-height: 100vh;min-width: 100vw;overflow: hidden;">
      <hlbtaside :collapse="asideSettings.isCollapse" :width="asideSettings.width" v-if="showComponent"></hlbtaside>
      <el-container style="height: 100vh;width:100%;display: flex;flex-direction: column;">
        <Header ref="headerComponent" :isCollapse="asideSettings.isCollapse" @changeAside="changeAside" v-if="showComponent"></Header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style scoped>
</style>
