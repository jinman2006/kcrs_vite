<script setup>
import { ref, defineProps } from 'vue'

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
    },
    currentPage:{
        type:Number,
        required:true
    },
    pageSize:{
        type: Number,
        required:true
    }
})

const emit = defineEmits(['passClick','rejectClick','resetStatus'])
function passClick(){
    emit('passClick',dialogData.value)
}
function rejectClick(){
    emit('rejectClick',dialogData.value)
}
function resetStatus(){
    emit('resetStatus',dialogData.value)
}

// 分页数据

const size = ref('default')
const background = ref(false)
const disabled = ref(false)


// 对话框
const isShow = ref(false)
const dialogData = ref([])

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

// 修改分页大小
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  currentPage.value = 1
  customer.getCustomerData(currentPage.value, val).then( res => {
   firstReportingData.value = res.data
    }).catch( err => {
        console.log('home', err)
    }) 
}
// 分页，更改当前页
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  customer.getCustomerData(val, pageSize.value).then( res => {
   firstReportingData.value = res.data
    }).catch( err => {
        console.log('home', err)
    })  
}

const test = () => {
    console.log('isShow',isShow.value)
}
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
                v-model:current-page="props.currentPage"
                v-model:page-size="props.pageSize"
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
    <div class="">
        <el-dialog v-model="isShow" width='60%'>
            <el-descriptions
                :column="2"
                border
            >
                <el-descriptions-item :span="2">
                    <template #label>区域</template>
                    {{ dialogData.provinces }}
                </el-descriptions-item>
                <el-descriptions-item :span="2">
                    <template #label>客户名称</template>
                    {{ dialogData.ccompany }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>别名</template>
                    {{ dialogData.cacompany }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>机型</template>
                    {{ dialogData.cmodel }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>联系人</template>
                    {{ dialogData.ccontact }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>电话</template>
                    {{ dialogData.ctel }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>职位</template>
                    {{ dialogData.cdept }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>报备时间</template>
                    {{ dialogData.date2 }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>地址</template>
                    {{ dialogData.caddresss }}
                </el-descriptions-item>
            </el-descriptions>

            <el-descriptions
            class="margin-top"
            direction="vertical"
            :column="2"
            border
            >
                <el-descriptions-item>
                        <template #label>状态</template>
                        <!-- 这个显示方式，参照前面，后面有更好方法时，会更改 -->
                        <el-tag v-if="dialogData.status === '0'">待审核</el-tag>
                        <el-tag type="success" v-else-if="dialogData.status === '1'">已通过</el-tag>
                        <el-tag type="danger" v-else>已驳回</el-tag>                       
                    
                </el-descriptions-item>
                <el-descriptions-item v-if="dialogData.status === '2'">
                        <template #label>驳回原因</template>                  
                        {{ dialogData.nopass_reason }}
                </el-descriptions-item>

            </el-descriptions>
            <div class="btn_group">
                <el-button type="success"  @click="passClick(dialogData)">通过</el-button>
                <el-button type="danger"  @click="rejectClick(dialogData)">驳回</el-button>
                <el-button type="primary">结案</el-button>
                <el-button type="info" @click="resetStatus(dialogData)">重置</el-button>
            </div>

        </el-dialog>    
   </div>
    
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