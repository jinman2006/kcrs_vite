<script setup>
import { ref } from 'vue'

// 使用本地图片的导入方法
import logoImg from '@/assets/img/logo.png'

</script>

<template>
   <div class="home-container">
      <div class="sidebar">
         <div class="logo-container">
            <div class="logo">
               <el-avatar shape="square" :src="logoImg"></el-avatar>
            </div>
            <div class="logo-text">
              <h2>后台管理</h2> 
            </div>
         </div>
      </div>
      <div class="main">
         <div class="header">11</div>
         <div class="content">22</div>
      </div>

      
   </div>
</template>

<style lang="scss" scoped>
@use "@/styles/admin/home.scss"
</style>