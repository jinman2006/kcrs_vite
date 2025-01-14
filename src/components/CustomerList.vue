<script setup>
import { ref, inject, provide } from 'vue';
import DetailDialog from './DetailDialog.vue';

const props = defineProps({
    tableColumnArr:{
        type:Array,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
})

const dataType = "sales"
provide('dataType',dataType)

// 表格数据（注入）
const tableData = inject('tableData')

// 分页组件数据
const size = ref('default')
const background = ref(false)
const disabled = ref(false)
const { currentPage, pageSize, paginationShow } = inject('pagination')

const emit = defineEmits(['delayClick', 'deleteClick', 'handleSizeChange', 'handleCurrentChange'])
function handleCurrentChange( val){
    console.log('table',val)
    emit('handleCurrentChange', val)
}
function handleSizeChange(val){
    emit('handleSizeChange',val)
}
function delayClick(val){
    emit('delayClick',val)
}
function deleteClick(val){
    emit('deleteClick',val)
}


const isShowReason = ref(false)


const isShow = ref(false)
const dialogData = ref([])
provide('isShow',{
    isShow
})
//单击名称弹出详情对话页
const cellClick = (row, column, cell, event) => {
    if(column.property !== 'ccompany') return
    isShow.value = true
    if(row.delay_reason){
        console.log(row.delay_reason)
        isShowReason.value = true
    }else{
        console.log(222)
        isShowReason.value = false
    }
    dialogData.value = row
    console.log('row',row)
    // console.log('tableType',props.tableType)
    console.log('showreasonTb',isShowReason.value)
}
// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'ccompany'){
        return {"cursor": 'pointer',"color":'rgb(51.2, 126.4, 204)',"font-weight":'bolder'}
        // rgb(51.2, 126.4, 204)
    }
}

</script>

<template>
   <div class="_table">
    <el-table 
            :data="tableData" 
            border 
            style="width: 98%;"
            @cell-click="cellClick"
            :cell-style = "mousePointer"
        >

          <el-table-column v-for="item in tableColumnArr" :key="item.key" :width="item.width" :min-width="item.minwidth" :prop="item.key" :label="item.colName" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="caddress" label="地址" show-overflow-tooltip /> -->
          <el-table-column prop="status" label="状态" >

            <!-- 状态以标签显示的这种方式，修改时会有明显动作，再没有找到合适解决办法前选用v-if -->
            <template #default="{row}">
              <el-text type="info" v-if="row.expire">已过期</el-text>   
              <el-text v-else-if="row.status == '0'">待审核</el-text>
              <el-text type="success" v-else-if="row.status == '1'">已通过</el-text>
              <el-text type="danger" v-else-if="row.status == '2'">已驳回</el-text>
              <el-text  v-else-if="row.status == '3'">待续审</el-text>
              <el-text type="success" v-else-if="row.status == '4'">已续期</el-text>
              <el-text type="danger" v-else-if="row.status == '5'">续驳回</el-text>
              <el-text v-else-if="row.status == '9'">已结案</el-text>
                   
            </template>

          </el-table-column>
          <el-table-column  label="快捷操作" fixed="right" min-width="100">
             <template #default="{row}">
                <el-button link type="danger" size="small" @click="deleteClick(row)">删除</el-button>
                <el-button v-show="row.delayenabled" link type="primary" size="small" @click="delayClick(row)">续报</el-button>
                
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
    @deleteClick="deleteClick"
    @delayClick="delayClick"
    :isShowReason="isShowReason"
    ></detail-dialog>
</template>

<style lang="scss" scoped>
._table {
    height: calc(100% - 110px);
    width: 100%;
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 20px 0;
    .pagination-container{
       box-sizing: border-box;
       height: 80px;
       width: 100%;
       margin-top: 10px;
       padding-left: 20px;
       
    }
}
</style>