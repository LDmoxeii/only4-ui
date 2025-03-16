<script setup>
import { ref } from 'vue'


// 组件注册
import Header from '@/components/hlbt-header/hlbt-header.vue'
import Aside from '@/components/hlbt-aside/asideItem.vue'


const asideSettings = ref({
    isCollapse:false,
    width:'200'
})

// 给子组件绑定事件，通过子组件emit从而改变父组件的值
const changeAside = ()=>{
   asideSettings.value.isCollapse = !asideSettings.value.isCollapse
   if(asideSettings.value.isCollapse){
    asideSettings.value.width = "64"
   }else{
    asideSettings.value.width = "200"
   }
}
import iconvue from '@/components/icons/index.vue'

</script>

<template>
  <div>
    <p>首页</p>
    <!-- <iconvue name="home"></iconvue> -->
  </div>
</template>



<style scoped>

body{
  background-color: #eee;
  max-width: 100vw;
  overflow: hidden;
}

.el-main {
  width: 100%;
  padding: 0;
  height: 100vh;
  overflow-x: hidden;
}

</style>
