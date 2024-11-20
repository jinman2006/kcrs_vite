<script setup>
import { ref, provide, inject } from 'vue'
import DetailDialog from './DetailDialog.vue';

const props = defineProps({
    firstReportingData:{
        type: Array,
        required: true
    },
    paginationShow:{
        type: Boolean,
        required: true
    },
    total:{
        type:Number,
        required:true
    }
})

const emit = defineEmits(['passClick', 'rejectClick', 'resetStatus', 'handleSizeChange', 'handleCurrentChange'])
function passClick(){
    emit('passClick', dialogData.value)
}
function rejectClick(){
    emit('rejectClick', dialogData.value)
}
function resetStatus(){
    emit('resetStatus', dialogData.value)
}
function handleCurrentChange( val){
    emit('handleCurrentChange', val)
}
function handleSizeChange(val){
    emit('handleSizeChange',val)
}

// 分页数据

const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const { currentPage, pageSize } = inject('pagination')

// 对话框
const isShow = ref(false)
const dialogData = ref([])
provide('isShow',{
    isShow
})

//单击名称弹出详情对话页
const cellClick = (row, column, cell, event) => {
    if(column.property !== 'ccompany') return
    isShow.value = true
    dialogData.value = row
    console.log('row',row)
}
// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'ccompany'){
        return {"cursor": 'pointer',"color":'rgb(51.2, 126.4, 204)',"font-weight":'bolder'}
        // rgb(51.2, 126.4, 204)
    }
}

// // 修改分页大小
// const handleSizeChange = (val) => {
//   console.log(`${val} items per page`)
//   pageSize.value = val
//   currentPage.value = 1
//   customer.getCustomerData(currentPage.value, val).then( res => {
//    firstReportingData.value = res.data
//     }).catch( err => {
//         console.log('home', err)
//     }) 
// }
// // 分页，更改当前页
// const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`)
//   customer.getCustomerData(val, pageSize.value).then( res => {
//    firstReportingData.value = res.data
//     }).catch( err => {
//         console.log('home', err)
//     })  
// }
</script>

<template>
   <div class="_table">
       <el-table 
            :data="firstReportingData" 
            border 
            style="width: 98%;"
            @cell-click="cellClick"
            :cell-style = "mousePointer"
        >
          <el-table-column prop="provinces" width="60" label="区域" show-overflow-tooltip/>
          <el-table-column prop="ccompany" min-width="150" label="名称" show-overflow-tooltip />
          <el-table-column prop="ccontact" label="联系人" />
          <el-table-column prop="ctel" label="电话" show-overflow-tooltip />
          <el-table-column prop="cdept" label="职位" width="80" show-overflow-tooltip/>
          <el-table-column prop="cmodel" label="机型" show-overflow-tooltip />
          <!-- <el-table-column prop="caddress" label="地址" show-overflow-tooltip /> -->
          <el-table-column prop="status" label="状态" >

            <!-- 状态以标签显示的这种方式，修改时会有明显动作，再没有找到合适解决办法前选用v-if -->
            <template #default="{row}">
              <el-tag v-if="row.status === '0'">待审核</el-tag>
              <el-tag type="success" v-else-if="row.status === '1'">已通过</el-tag>
              <el-tag type="danger" v-else>已驳回</el-tag>        
            </template>

          </el-table-column>
          <el-table-column  label="快捷操作" fixed="right" min-width="100">
             <template #default="{row}">
                <el-button link type="primary" size="small" @click="passClick(row)">通过</el-button>
                <el-button link type="primary" size="small" @click="rejectClick(row)">驳回</el-button>
             </template>
          </el-table-column>
       </el-table>
       <div class="pagination-container" v-show="paginationShow">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="props.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>      
    </div>
    <detail-dialog
    :dialogData="dialogData"
    :isShow="isShow"
    @passClick="passClick"
    @rejectClick="rejectClick"
    @resetStatus="resetStatus"
    ></detail-dialog>
</template>

<style lang="scss" scoped>
._table {
    height: calc(100% - 70px);
    width: 100%;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    .btn {
        height: 50px;
        width: 100%;
        display: flex;
        box-sizing: border-box;
        // margin-left: 10px;
        padding-left: 20px;
        justify-content: flex-start;
        align-items: center;
    }
    .pagination-container{
       box-sizing: border-box;
       height: 80px;
       width: 100%;
       margin-top: 10px;
       padding-left: 20px;
       
      
    }
}
</style>