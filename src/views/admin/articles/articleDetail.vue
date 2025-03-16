<script setup>

import router from '@/router/index';
import { ref, inject, onMounted, computed } from 'vue'

const rowInfo = ref(JSON.parse(router.currentRoute.value.query.rowInfo))

const headerComponent = inject('Header');
const rightElementRef = ref(null);
const rightTableRef = ref(null);
let rightRectWidth = ref('0px');
let rightRectHeight = ref('0px');
/*
 * 获取头部组件的位置信息，并设置右侧元素的样式
 */
const initRightStyle = () => {
  if (headerComponent.value) {
    console.log(headerComponent.value);
    const headeRect = headerComponent.value.$el.getBoundingClientRect();
    let rightHeight = headeRect.y + headeRect.height + 20
    if (rightElementRef.value) {
      rightElementRef.value.style.top = `${rightHeight}px`;
      rightElementRef.value.style.right = `0px`;
      console.log(rightHeight);
    }
    const rightRect = rightElementRef.value.getBoundingClientRect();
    rightRectWidth.value = `${rightRect.width}px`;
    rightRectHeight.value = `${rightRect.height * 0.4}px`;

    rightTableRef.value.style.width = rightRectWidth.value;
    rightTableRef.value.style.height = rightRectHeight.value;
  }
};
onMounted(() => {
  initRightStyle();
  console.log(rightRectWidth);
});

let tableData = [
  {
    date: '2016-05-03',
    name: 'q',
    address: 'No. 189, Grove St, Los Angeles',
    title: "1212"
  },
  {
    date: '2016-05-02',
    name: 'q1',
    address: 'No. 189, Grove St, Los Angeles',
    title: "1212"
  },
  {
    date: '2016-05-04',
    name: 'q12',
    address: 'No. 189, Grove St, Los Angeles',
    title: "1212"
  },
  {
    date: '2016-05-01',
    name: 'q123',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'q1234',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'q2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'q23',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'q234',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const currentPage = ref(1)
const pageSize = ref(3)
const background = ref(false)
const total = computed(() => tableData.length) // 使用 computed 计算总条数

// 分页器页面变化时触发
function handleCurrentChange(val) {
  currentPage.value = val
}
const currentComponent = ref(null);
function onRowClick(rowInfo) {
  console.log(rowInfo)
  //根据组件路径跳转页面
  //currentComponent.value = () => import('@/views/admin/articles/acticleContent.vue');
  router.push({ path: '/articles/audit/detail', query: { rowInfo: JSON.stringify(rowInfo) } })
}


//页面内更换文章
function changeActicle(row) {
  rowInfo.value = row;
  
}
</script>
<template>
  <div class="content">
    <div class="left">
      <div class="title">
        <span>文章标题：</span>
        <span>{{ rowInfo.name }}</span>
      </div>
      <div class="detail">
        <span>文章内容：</span>
        <div>{{ rowInfo.address }}</div>
      </div>
    </div>
    <!-- :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
    <div class="right" ref="rightElementRef">
      <el-table ref="rightTableRef" @row-click="changeActicle" :table-layout="tableLayout" :data="tableData"
        :row-style="{ height: '0px' }" :cell-style="{
          height: '0px',
        }" style="border: 2px solid #111;">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <el-button @click="passActice">通过</el-button>
    </div>
  </div>
</template>



<style scoped>
body {
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

.content {
  display: flex;

}

.left {
  width: 70%;
  height: 110vh;
  background-color: #fff;
  border: 1px solid black;
  margin: 15px;
}

.right {
  width: 25%;
  height: 80vh;
  background-color: #fff;
  border: 1px solid black;
  margin: 15px;
  position: absolute;

}

.detail {
  display: flex;
}
</style>
