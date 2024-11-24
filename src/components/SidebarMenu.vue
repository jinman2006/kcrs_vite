<script setup>
  import { } from "vue"
</script>

<template>
 <div >
    <el-menu
       default-active="2"
       class="el-menu-vertical-demo"
       router
    >
       <el-sub-menu index="1">
          <template #title>
             <el-icon><Suitcase /></el-icon>
             <span>报备管理</span>
          </template>

          <el-menu-item index="/customer/firstlist">初报查询</el-menu-item>
          <el-menu-item index="/customer/renewallist">续报查询</el-menu-item>
          <el-menu-item index="/customer/endlist">结案查询</el-menu-item>
       </el-sub-menu>
       <el-menu-item index="/users">
          <template #title>
             <el-icon><User /></el-icon>
             <span>用户管理</span>
          </template>
                            
       </el-menu-item>
       <el-sub-menu>
         <template #title>
            <el-icon><setting /></el-icon>
             <span>系统设置</span>
          </template>   
          <el-menu-item index="/setting/notice">公告设置</el-menu-item>    
          <el-menu-item index="/setting/email">邮箱设置</el-menu-item> 
          <el-menu-item index="/setting/other">其它设置</el-menu-item>   
       </el-sub-menu>
       <!-- <el-menu-item index="/setting">
          <el-icon><setting /></el-icon>
          <span>系统设置</span>
       </el-menu-item> -->
    </el-menu>
 </div>
</template>

<style lang="scss" scoped>
</style>