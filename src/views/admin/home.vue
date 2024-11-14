<script setup>


// 使用本地图片的导入方法
import logoImg from '@/assets/img/logo.png'

import SidebarMenu from '@/components/SidebarMenu.vue';
import TableList from '@/components/TableList.vue';
import SearchBar from '@/components/SearchBar.vue';



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
               <el-icon :size="22" color="#515151"><Fold /></el-icon>
            </div>
            <div class="header-middle"></div>
            <div class="header-right">
               <el-avatar :src="logoImg" />
            </div>
         </div>
         <div class="content">
            <!-- <div class="query"></div> -->
             <search-bar></search-bar>
            <table-list></table-list>
         </div>
      </div>

      
   </div>
</template>

<style lang="scss" scoped>
@use "@/styles/admin/home.scss"
</style>