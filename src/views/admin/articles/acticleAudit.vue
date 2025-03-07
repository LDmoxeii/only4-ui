<script setup>
import { ref } from 'vue'
import {computed} from 'vue'

const asideSettings = ref({
  isCollapse: false,
  width: '220'
})
let tableData = [
  {
    date: '2016-05-03',
    name: 'q',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'q1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'q12',
    address: 'No. 189, Grove St, Los Angeles',
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
  {
    date: '2016-05-02',
    name: 'q2345',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'q3',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'q34',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'q345',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'q3456',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'q4',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'q45',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'q456',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'q4567',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'q5',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'q56',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'q567',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'q5678',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-07',
    name: 'Tom111',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(false)
const total = computed(() => tableData.length) // 使用 computed 计算总条数

// 分页器页面变化时触发
function handleCurrentChange(val) {
  currentPage.value = val
}
import { useRouter } from 'vue-router';
const router = useRouter();
const currentComponent = ref(null);
function onRowClick(row){
  console.log(row)
  //根据组件路径跳转页面
  currentComponent.value = () => import('@/views/admin/articles/acticleContent.vue');
  router.push('acticleContent.vue');
}
</script>
<template>
  <div>
  <el-table @row-click="onRowClick" :table-layout="tableLayout" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%;height: 515px;margin-top: 10px;border: 1px solid gainsboro;">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
  </el-table>
  <div class="pagination">
    <el-pagination v-model-currentPage="currentPage" v-model-pageSize="pageSize" 
      :size="size" :background="background" :total="total" @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
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

.pagination {
  display: flex;
  align-self: center;
  justify-content: center;
  margin-top: 10px;
}
::v-deep th {
  text-align: center !important;
}

/* 数据居中 */
::v-deep td {
  text-align: center !important;
}
</style>
