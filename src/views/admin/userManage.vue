<script setup>
  import { ref } from "vue"
  import user from "@/api/user";

  const UserListData = ref([])

   user.getuserlist().then( res => {
      console.log('umanage',res)
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
            <el-table-column prop="user_id" label="用户名" />
            <el-table-column prop="o_company" label="公司" />
            <el-table-column prop="o_contact" label="联系人" />
            <el-table-column prop="o_tel" label="电话" />
            <el-table-column prop="user_permission" label="权限" />
            <el-table-column prop="id_status" label="状态" />
            <el-table-column prop="last_date" label="最近登录时间" />
        </el-table>
   </div>
</template>

<style lang="scss" scoped>
</style>