<script setup>
import { ref, provide } from 'vue'
import sales from '@/api/sales';
import CustomerList from '@/components/CustomerList.vue';
import TableSearch from '@/components/TableSearch.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const user_id = ref('139')//o_no号

const searchBarHeight = ref('60px')

const dataType = ref('sales')

const searchConditions = ref([
    {optionName:'名称',key:'ccompany'},
    {optionName:'电话',key:'ctel'},
    {optionName:'机型',key:'cmodel'},
    {optionName:'联系人',key:'ccontact'},
])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const paginationShow = ref(true)//分页组件是否显示
provide('pagination',{
    currentPage,
    pageSize,
    paginationShow
})

// 修改分页大小
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  currentPage.value = 1
  sales.getSalesCustomerList(user_id.value, currentPage.value, val).then( res => {
   tableData.value = res.data
//    selectable.value = res.selectable
    }).catch( err => {
        console.log('home', err)
    }) 
}
// 分页，更改当前页
const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`)
console.log('current page',val)
sales.getSalesCustomerList(user_id.value, val, pageSize.value).then( res => {
   tableData.value = res.data
//    selectable.value = res.selectable
    }).catch( err => {
        console.log('home', err)
    })  
}



// 表格数据
const tableData = ref([])
provide('tableData',tableData)

// 获取报备客户列表
sales.getSalesCustomerList(user_id.value,currentPage.value,pageSize.value).then( res => {
   console.log('getsaleslist',res)
   if(res.success){
      tableData.value = res.data
      total.value = res.total
   }
   
}).catch( err => {
   console.log('getsaleslist',err)
})

const tableColumnArr = ref([
    {colName:'区域',key:'provinces',width:60},
    {colName:'名称',key:'ccompany',minwidth:150},
    {colName:'联系人',key:'ccontact'},
    {colName:'电话',key:'ctel'},
    {colName:'机型',key:'cmodel'},
    {colName:'有效期至',key:'validity'}
])

const delayClick = row => {
    // console.log(row.id)
    // sales.delayCustomer(row.id).then( res => {
    //     console.log('delayclick res',res)
    // }).catch( err => {
    //     console.log('delayclick err',err)
    // })
    // 已经审批通过或驳回的，避免二次操作
    if('-3-'.indexOf(row.status) !== -1){
        ElMessage.error('已续报，请勿重复操作')
        return 
    }
    ElMessageBox.prompt(
        '请输入续报的原因',
        '续报原因',
        {
            confirmButtonText:'确认续报',
            cancelButtonText:'取消操作',
            inputPattern:/^.+$/,
            inputErrorMessage:'原因不能为空'
        }
    ).then(({value}) => {
        console.log('value',value)
        sales.delayCustomer(row.id, value).then((res) => {
            if(res.success){
                // ElMessage.success(res.message)
                // row.status=3
                console.log(res)
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

const deleteClick = row => {
    console.log(row.id)
    sales.deleteCustomer(row.id).then( res => {
        console.log('deleteclick res',res)
    }).catch( err => {
        console.log('deleteclick err',err)
    })    
}
</script>

<template>
      <div class="search-container" >
        <table-search
        :dataType="dataType"
        :conditions="searchConditions"
        ></table-search>
      </div>
      <customer-list
      :total="total"
      :tableColumnArr="tableColumnArr"
      @deleteClick="deleteClick"
      @delayClick="delayClick"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      ></customer-list>
  
</template>

<style scoped>
.search-container {
    height: v-bind(searchBarHeight);
    width: 100%;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
</style>