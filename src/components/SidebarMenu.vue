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
          <el-menu-item index="1-2">续报查询</el-menu-item>
          <el-menu-item index="1-3">结案查询</el-menu-item>
       </el-sub-menu>
       <el-menu-item>
          <template #title>
             <el-icon><User /></el-icon>
             <span>用户管理</span>
          </template>
                            
       </el-menu-item>
       <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <span>系统设置</span>
       </el-menu-item>
    </el-menu>
 </div>
</template>

<style lang="scss" scoped>
</style>