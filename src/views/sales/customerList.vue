<script setup>
import { ref } from 'vue'
import sales from '@/api/sales';
import CustomerList from '@/components/CustomerList.vue';

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const user_id = ref('139')//o_no号

// 获取报备客户列表
sales.getSalesCustomerList(user_id,currentPage.value,pageSize.value).then( res => {
   console.log('getsaleslist',res)
}).catch( err => {
   console.log('getsaleslist',err)
})

const tableColumnArr = ref([
    {colName:'区域',key:'provinces',width:60},
    {colName:'名称',key:'ccompany',minwidth:150},
    {colName:'联系人',key:'ccontact'},
    {colName:'电话',key:'ctel'},
    {colName:'机型',key:'cmodel'},
])
</script>

<template>
   <div class="">
      <customer-list
      :tableColumnArr="tableColumnArr"
      ></customer-list>
   </div>
</template>

<style scoped>
</style>