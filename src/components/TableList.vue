<script setup>
import { reactive, ref } from 'vue'
import  customer from '@/api/customer.js'


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

const detail = (row) => {
    isShow.value = true
    dialogData.value = row
    console.log('row',row)
}

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
          <el-table-column  label="快捷操作" fixed="right">
             <template #default="{row}">
                <el-button link type="primary" size="small">通过</el-button>
                <el-button link type="primary" size="small">驳回</el-button>
             </template>
          </el-table-column>
       </el-table>
    </div>
    <el-dialog v-model="isShow">
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
        <div class="btn_group">
            <el-button type="success">通过</el-button>
            <el-button type="danger">驳回</el-button>
            <el-button type="info">结案</el-button>
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
</style>