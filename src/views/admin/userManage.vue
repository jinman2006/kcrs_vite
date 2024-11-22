<script setup>
  import { ref } from "vue"
  import user from "@/api/user";

  const UserListData = ref([])
//   分页数据
  const size = ref('default')
  const disabled = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const background = ref(false)
  const paginationShow = ref(true)

   // 修改页码
  const handleCurrentChange = val => {
   user.getuserlist(val, pageSize.value).then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('usermanage err',err)
   })
  }
  // 修改分页大小
  const handleSizeChange = val => {
   user.getuserlist(currentPage.value, val).then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('handlesizechange err',err)
   })
  }

  const userLock = () => {

  }
  const userDelete = () => {

  }

// 取初始数据
user.getuserlist(currentPage.value, pageSize.value).then( res => {
   console.log('umanage',res)
   UserListData.value = res.data
   total.value = res.total
})
.catch( err => {
   console.log('umanage',err)
})
  
</script>

<template>
   <div class="userlist">
        <el-table 
        :data="UserListData"
        border
        style="width: 98%;"
        >
            <el-table-column prop="user_id" label="用户名" show-overflow-tooltip />
            <el-table-column prop="o_company" label="公司" show-overflow-tooltip/>
            <el-table-column prop="o_contact" label="联系人" show-overflow-tooltip/>
            <el-table-column prop="o_tel" label="电话" show-overflow-tooltip/>
            <el-table-column prop="user_permission" label="权限" />
            <el-table-column prop="id_status" label="状态" />
            <el-table-column prop="last_date" label="登录时间" show-overflow-tooltip />
            <el-table-column  label="快捷操作" fixed="right" min-width="90">
             <template #default="{row}">
                <el-button link type="primary" size="small" @click="userLock(row)">锁定</el-button>
                <el-button link type="primary" size="small" @click="userDelete(row)"><span style="color:#F56C6C">删除</span></el-button>
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
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>  
   </div>
</template>

<style lang="scss" scoped>
.userlist{
   height: 100%;
   width: 100%;
   background-color: #fff;
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   box-sizing: border-box;
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