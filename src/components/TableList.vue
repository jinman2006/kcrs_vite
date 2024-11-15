<script setup>
import { computed, reactive, ref } from 'vue'
import  customer from '@/api/customer.js'
import { ElMessage, ElMessageBox} from 'element-plus';


// 数据
const firstReportingData = ref([])

customer.getCustomerData().then( res => {
   console.log('home',res.data)
   firstReportingData.value = res.data
}).catch( err => {
   console.log('home', err)
})

// 对话框
const isShow = ref(false)
const dialogData = ref()

//单击名称弹出详情对话页
const cellClick = (row, column, cell, event) => {
    if(column.property !== 'ccompany') return
    isShow.value = true
    dialogData.value = row
    // console.log('row',row)
}




// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'ccompany'){
        return {"cursor": 'pointer',"color":'rgb(51.2, 126.4, 204)',"font-weight":'bolder'}
        // rgb(51.2, 126.4, 204)
    }
}


// 审批操作
const passClick = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('passed failed'.indexOf(row.status) !== -1){
        ElMessage.error('已审批，请勿重复操作')
        return 
    }
    ElMessageBox.confirm(
        '确认通过这条信息吗？',
        '操作提醒',
        {
            confirmButtonText:'确认通过',
            cancelButtonText:'取消操作',
            type: 'warning'
        }
    ).then(() => {
        
        // console.log('dialogdata',firstReportingData.value)
        
        customer.approveCustomer(row.id, 'passed').then((res) => {
            if(res.success){
                ElMessage.success(res.message)
             
                row.status='passed'
            }else{
                ElMessage.error(res.message)
                return
            }
        }).catch(err => {
            ElMessage.error(err)
            // console.log('tablelist err',err)
        })
    }).catch(() => {
        console.log('取消')
    })
}

const rejectClick = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('passed failed'.indexOf(row.status) !== -1){
        ElMessage.error('已审批，请勿重复操作')
        return 
    }
    ElMessageBox.prompt(
        '请输入驳回的原因',
        '驳回原因',
        {
            confirmButtonText:'确认驳回',
            cancelButtonText:'取消操作',
            inputPattern:/^.+$/,
            inputErrorMessage:'原因不能为空'
        }
    ).then(({value}) => {
        console.log('value',value)
        customer.approveCustomer(row.id, 'failed', value).then((res) => {
            if(res.success){
                ElMessage.success(res.message)
                row.status='failed'
            }else{
                ElMessage.error(res.message)
                return
            }
        }).catch(err => {
            ElMessage.error(err)
            // console.log('tablelist err',err)
        })        
    })    
}

const resetStatus = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('pending'.indexOf(row.status) !== -1){
        ElMessage.error('初始状态，无法重置')
        return 
    }  
    ElMessageBox.confirm(
        '重置后，本条将回到待审核状态，确认重置这条信息吗？',
        '操作提醒',
        {
            confirmButtonText:'确认重置',
            cancelButtonText:'取消操作',
            type: 'warning'
        }
    ).then(() => {
        customer.resetStatus(row.id).then( res => {
            console.log('rest res',res)
            if(res.success){
                ElMessage.success(res.message)
                row.status='pending'
            }else{
                ElMessage.error(res.message)
                return
            }
        })
    }).catch( err => {
        // console.log('rest err',err)
        ElMessage.error(err)
    }) 
}

// 分页
const currentPage1 = ref(5)
const currentPage2 = ref(5)
const currentPage3 = ref(5)
const currentPage4 = ref(4)
const pageSize2 = ref(100)
const pageSize3 = ref(100)
const pageSize4 = ref(100)
const size = ref('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
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
          <el-table-column prop="ctel" label="电话" />
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
       <div class="pagination-container">
            <el-pagination
                v-model:current-page="currentPage4"
                v-model:page-size="pageSize4"
                :page-sizes="[100, 200, 300, 400]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>      
    </div>




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
            <el-descriptions-item :span="2">
                    <template #label>备注</template>
                    {{ dialogData.contact }}
            </el-descriptions-item>
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
        width: 100%;
        margin-top: 10px;
        padding-left: 20px;
        
       
     }
 }
 .btn_group{
    display: flex;
    // justify-content: flex-end;
    margin-top: 20px;
 }
 .margin-top{
    margin-top: 10px;
 }

</style>