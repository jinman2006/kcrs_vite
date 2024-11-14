<script setup>
import { computed, reactive, ref } from 'vue'
import  customer from '@/api/customer.js'
import { ElMessage, ElMessageBox } from 'element-plus';


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
// const isPassBtn = ref()

// let isPassBtn = computed(() => {
//     // if(dialogData.value.status === 'passed' || dialogData.value.status)return 'disabled'
//     if('passed failed'.indexOf(dialogData.value.status) > 0)return 'disabled'
// },{ immediate: true }
// )

// const test = () => {
//     console.log('passed failed'.indexOf(dialogData.value.status))
// }


//单击名称弹出详情对话页
const cellClick = (row, column, cell, event) => {
    if(column.property !== 'name') return
    isShow.value = true
    dialogData.value = row
    // console.log('row',row)
}




// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'name'){
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
          <el-table-column prop="area" label="区域" show-overflow-tooltip/>
          <el-table-column prop="name" label="名称" show-overflow-tooltip />
          <el-table-column prop="contact" label="联系人" />
          <el-table-column prop="phone" label="电话" />
          <el-table-column prop="position" label="职位" />
          <el-table-column prop="models" label="机型" />
          <el-table-column prop="addr" label="地址" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" >

            <!-- 状态以标签显示的这种方式，修改时会有明显动作，再没有找到合适解决办法前选用v-if -->
            <template #default="{row}">
              <el-tag v-if="row.status === 'pending'">待审核</el-tag>
              <el-tag type="success" v-else-if="row.status === 'passed'">已通过</el-tag>
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
    </div>
    <el-dialog v-model="isShow" width='60%'>
        <el-descriptions
            :column="2"
            border
        >
            <el-descriptions-item :span="2">
                <template #label>区域</template>
                {{ dialogData.area }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
                <template #label>客户名称</template>
                {{ dialogData.name }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>别名</template>
                {{ dialogData.aliasname }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>机型</template>
                {{ dialogData.models }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>联系人</template>
                {{ dialogData.contact }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>电话</template>
                {{ dialogData.phone }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>职位</template>
                {{ dialogData.position }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>报备时间</template>
                {{ dialogData.create_time }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>地址</template>
                {{ dialogData.addr }}
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
                    <el-tag v-if="dialogData.status === 'pending'">待审核</el-tag>
                    <el-tag type="success" v-else-if="dialogData.status === 'passed'">已通过</el-tag>
                    <el-tag type="danger" v-else>已驳回</el-tag>                       
                  
            </el-descriptions-item>
            <el-descriptions-item v-if="dialogData.status === 'failed'">
                    <template #label>驳回原因</template>                  
                    {{ dialogData.reject_reason }}
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