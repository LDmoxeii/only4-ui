<script setup>

import router from '@/router/index';
import { ref, inject, onMounted, computed } from 'vue'

// const rowInfo = ref(JSON.parse(router.currentRoute.value.query.rowInfo))

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

});

let tableData = [
  {
    index: 0,
    date: '2016-05-03',
    name: 'q',
    address: 'No. 189, Grove St, Los Angeles,gijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffgijrigjijagiardhnfgjdrfgkjdsrgjiswjgisjriogsjigjsiwgjisdewkgjfiolasewjgiojugioedujigovjwseigjwsiegjiwesjgiwesjgiewjgiwjigjIGJiWESJGIJEwigjeigjiegjIGJIEgjiEJGIEJGiOEJGeioWJGIOWJESOIGJoiJGOIJEIogjaigjijegiaewjigoewjeiawjgaigwejgiowjaeigjiawejgiewajgiojwgiojewgjewaiogjidjjgkDJGKLJDSKLjgklwjeioGJiodjskgjSDKgjdskgjsdkgjsdlkgjasdlkgjsdlkgjsdklgjoskdJGSKLDjgklsdgjlkSDGJkolsgjoie3wsughoiWEjgisdjGkweioghjsdojgskdljgdskljgklDSJFklsJDLKFsjdlkfjlkekfhdsklghklsfJKLSEJfklwajklfjdskljfwjifqjofijDKLSFJkldsjfkwqoifhdsjfKLSJDkfldslkfdjskfdsjffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
    title: "1212"
  },
  {
    index: 1,
    date: '2016-05-02',
    name: 'q1',
    address: 'No. 189, Grove St, Los Angeles',
    title: "1212"
  },
  {
    index: 2,
    date: '2016-05-04',
    name: 'q12',
    address: 'No. 189, Grove St, Los Angeles',
    title: "1212"
  },
  {
    index: 3,
    date: '2016-05-01',
    name: 'q123',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    index: 4,
    date: '2016-05-08',
    name: 'q1234',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    index: 5,
    date: '2016-05-06',
    name: 'q2',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    index: 6,
    date: '2016-05-07',
    name: 'q23',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    index: 7,
    date: '2016-05-03',
    name: 'q234',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const rowInfo = ref(tableData[0])
const currentPage = ref(1)
const pageSize = ref(3)
const background = ref(false)
const total = computed(() => tableData.length) // 使用 computed 计算总条数

// 分页器页面变化时触发
function handleCurrentChange(val) {
  currentPage.value = val
}
const currentComponent = ref(null);
//页面内更换文章
function changeActicle(row) {
  rowInfo.value = row;
}
const passActice = ref(false)
const unPassActice = ref(false)

//上一篇文章
function lastOne() {
  // console.log(rowInfo.value.index);
  let index = rowInfo.value.index
  if (index > 0) {
    rowInfo.value = tableData[index - 1]
  }
  if (index == 0) {
    rowInfo.value = tableData[tableData.length - 1]
  }
}
//下一篇文章
function nextOne() {
  let index = rowInfo.value.index
  if (index < tableData.length - 1) {
    rowInfo.value = tableData[index + 1]
  }
  if (index == tableData.length - 1) {
    rowInfo.value = tableData[0]
  }
}

const isFold = ref(true)
function fold() {
  console.log(isFold.value);
  isFold.value = !isFold.value
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
        <textarea class="info" style="resize:none" disabled>{{ rowInfo.address }}</textarea>
      </div>
      <div class="foldAndExpand">
        <button v-if="isFold" @click="fold">折叠</button>
        <button v-else @click="fold">展开</button>
      </div>
    </div>
    <!-- :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
    <div class="right" ref="rightElementRef" v-show="isFold">
      <el-table ref="rightTableRef" @row-click="changeActicle" :table-layout="flxed" :data="tableData"
        :row-style="{ height: '0px' }" :cell-style="{
          height: '0px',
        }" style="border: 2px solid #111;">
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
      </el-table>
      <div class="btnGroup">
        <el-button plain @click="passActice = true">通过</el-button>
        <el-button plain @click="unPassActice = true">不通过</el-button>
        <el-button plain @click="lastOne">上一个</el-button>
        <el-button plain @click="nextOne">下一个</el-button>
      </div>
    </div>
    <el-dialog v-model="passActice" title="确认通过审核" width="350" align-center>
      <span>确定要通过该文章的审核吗</span>
      <template #footer>
        <div>
          <el-button @click="passActice = false">取消</el-button>
          <el-button type="primary" @click="passActice = false">确认通过</el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="unPassActice" title="确认不通过审核" width="350" align-center>
      <span>确定要不通过该文章的审核吗</span>
      <template #footer>
        <div>
          <el-button @click="unPassActice = false">取消</el-button>
          <el-button type="primary" @click="unPassActice = false">确认不通过</el-button>
        </div>
      </template>
    </el-dialog>
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
  height: 80vh;
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
  transition: opacity 0.3s ease;
}
/* 深度选择器穿透组件作用域 */
:deep(.el-table .cell) {
  white-space: nowrap;
  /* 禁止换行 */
  overflow: hidden;
  /* 隐藏溢出内容 */
  text-overflow: ellipsis;
  /* 显示省略号 */
  max-width: 200px;
  /* 最大宽度（根据列宽调整） */
}

.el-table:hover {
  cursor: pointer;
}
.title {
  height: 50px;
}

.info {
  width: 80%;
  height: 50vh;
}
.foldAndExpand{
  position: absolute;
  right: 430px;
  top: 150px;
}
.foldAndExpand button {
  padding: 8px 16px;
  background: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.foldAndExpand button:hover {
  background: #66b1ff;
}
.detail {
  display: flex;
}

.custom-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.btnGroup {
  display: flex;
  justify-content: space-around;
}
</style>
