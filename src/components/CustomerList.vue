<script setup>
const props = defineProps({
    tableColumnArr:{
        type:Array,
        required:true
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

</script>

<template>
   <div class="">
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
   </div>
</template>

<style scoped>
</style>