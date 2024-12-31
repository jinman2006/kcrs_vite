<script setup>
import { ref, provide, inject, computed } from 'vue'
import DetailDialog from './DetailDialog.vue';
import customer from '@/api/customer';
import { ElMessage } from 'element-plus';

const props = defineProps({
    paginationShow:{
        type: Boolean,
        required: true
    },
    total:{
        type:Number,
        required:true
    },
    tableColumnArr:{
        type:Array,
        required:true
    },
    tableType:{
        type:String
    }
})

console.log(props.selectable)

const emit = defineEmits(['passClick', 'rejectClick', 'resetStatus', 'handleSizeChange', 'handleCurrentChange'])
function passClick(data){
    emit('passClick', data)
}

function rejectClick(data){
    emit('rejectClick', data)
}
function resetStatus(data){
    emit('resetStatus', data)
}
function handleCurrentChange( val){
    console.log('table',val)
    emit('handleCurrentChange', val)
}
function handleSizeChange(val){
    emit('handleSizeChange',val)
}

// 表格数据
const tableData = inject('tableData')

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

const isShowReason = computed(() => {
    if(props.tableType === 'renewal'){
        return true
    }else{
        return false
    }
})


//单击名称弹出详情对话页
const cellClick = (row, column, cell, event) => {
    if(column.property !== 'ccompany') return
    isShow.value = true
    dialogData.value = row
    console.log('row',row)
    console.log('tableType',props.tableType)
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

const getRowKeys = row => {
    return row.id
}

// const multipleSelection = ref([])
// const select_order_number = ref('')
const select_Id = ref([])
const handleSelectionChange = (val) => {
    console.log(val)
    // multipleSelection.value = val
    // select_order_number.value = multipleSelection.value.length
    select_Id.value = []
    if (val) {
        val.forEach((row) => {
          if (row) {
            select_Id.value.push(row.id);
          }
        });
    }
    console.log(select_Id.value)
}

const selectable = (row,index) => {
    return row.status==3?true:false
}

const batch_pass = () => {
    customer.batch_pass(select_Id.value).then( res => {
        console.log('batch_pass res',res)
        if(res.success){
            handleCurrentChange(currentPage.value) //修改成功后，刷新当前面，更新表单
            ElMessage.success(res.message)

        }
    }).catch( err => {
        console.log('batch_pass err',err)
    })
}

</script>

<template>

   <div class="_table">
       <div class="tb_btn" v-show="isShowReason">
            <el-button type="primary" @click="batch_pass">批量通过</el-button>
       </div>
       <el-table 
            :data="tableData" 
            border 
            style="width: 98%;"
            @cell-click="cellClick"
            :cell-style = "mousePointer"
            :row-key="getRowKeys"
            @selection-change = "handleSelectionChange"
        >
          <el-table-column type="selection" :selectable="selectable"  :reserve-selection="true" width="55"  />
          <el-table-column v-for="item in tableColumnArr" :key="item.key" :width="item.width" :min-width="item.minwidth" :prop="item.key" :label="item.colName" show-overflow-tooltip></el-table-column>
          <!-- <el-table-column prop="caddress" label="地址" show-overflow-tooltip /> -->
          <el-table-column prop="status" label="状态" >

            <!-- 状态以标签显示的这种方式，修改时会有明显动作，再没有找到合适解决办法前选用v-if -->
            <template #default="{row}">
              <el-text type="info" v-if="row.expire">已过期</el-text>   
              <el-text v-else-if="row.status === '0'">待审核</el-text>
              <el-text type="success" v-else-if="row.status === '1'">已通过</el-text>
              <el-text type="danger" v-else-if="row.status === '2'">已驳回</el-text>
              <el-text  v-else-if="row.status === '3'">待续审</el-text>
              <el-text type="success" v-else-if="row.status === '4'">已续期</el-text>
              <el-text type="danger" v-else-if="row.status === '5'">续驳回</el-text>
              <el-text v-else-if="row.status === '9'">已结案</el-text>
                   
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
    :isShowReason="isShowReason"
    @passClick="passClick"
    @rejectClick="rejectClick"
    @resetStatus="resetStatus"
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
    .tb_btn{
        height: 40px;
        width: 100%;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0 10px;
        padding-left: 10px;
    }
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