<script setup>
import { ref } from 'vue'

// 使用本地图片的导入方法
import logoImg from '@/assets/img/logo.png'

import SidebarMenu from '@/components/SidebarMenu.vue';

</script>

<template>
   <div class="home-container">
      <div class="sidebar">
         <div class="logo-container">
            <div class="logo">
               <el-avatar size="small" shape="square" :src="logoImg"></el-avatar>
            </div>
            <div class="logo-text">
              <h3>KCRS后台管理</h3> 
            </div>
         </div>
         <div class="menu-container">
           <sidebar-menu /> 
         </div>
         
      </div>
      <div class="main">
         <div class="header">
            <div class="header-left">
               <el-icon :size="30" color="#515151"><Fold /></el-icon>
            </div>
            <div class="header-middle"></div>
            <div class="header-right">
               <el-avatar :src="logoImg" />
            </div>
         </div>
         <div class="content">
            <div class="query"></div>
            <div class="table">
               <el-table border style="width: 98%;">
                  <el-table-colunm prop="area" label="区域"></el-table-colunm>
                  <el-table-colunm prop="name" label="名称"></el-table-colunm>
                  <el-table-colunm prop="contact" label="联系人"></el-table-colunm>
                  <el-table-colunm prop="phone" label="电话"></el-table-colunm>
                  <el-table-colunm prop="position" label="职位"></el-table-colunm>
                  <el-table-colunm prop="models" label="机型"></el-table-colunm>
                  <el-table-colunm prop="address" label="地址"></el-table-colunm>
                  <el-table-colunm  label="操作" fixed="right">
                     <template #default>
                        <el-button link type="primary" size="small">详情</el-button>
                        <el-button link type="primary" size="small">审核</el-button>
                     </template>
                  </el-table-colunm>
               </el-table>
            </div>
         </div>
      </div>

      
   </div>
</template>

<style lang="scss" scoped>
@use "@/styles/admin/home.scss"
</style>