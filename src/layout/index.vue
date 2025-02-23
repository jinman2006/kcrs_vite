<script setup>
import { useUserStore } from '@/store/user';
import { useRouter } from "vue-router";

const userStore = useUserStore()
const router = useRouter()

// userStore.getUserInfo('user')

// console.log(userStore.data)

// 使用本地图片的导入方法
import logoImg from '@/assets/img/logo.png'

import SidebarMenu from '@/components/SidebarMenu.vue';

const logout = () => {
   console.log(111)
   userStore.logout()
   router.push('/login')   
}

const toggleClick = () => {
   console.log(11)
}

const test = () => {
   console.log('test',userStore.data)
}

</script>

<template>
   <div class="home-container">
      <div class="sidebar" >
         <div class="logo-container">
            <div class="logo">
               <el-avatar size="small" shape="square" :src="logoImg"></el-avatar>
            </div>
            <div class="logo-text">
              <h4>KCRS后台管理</h4> 
            </div>
         </div>
         <div class="menu-container">
           <sidebar-menu /> 
         </div>
         
      </div>
      <div class="main">
         <div class="header">
            <!-- <div class="header-left" @click="toggleClick">
               <el-icon :size="22" color="#515151"><Fold /></el-icon>
            </div> -->
            <el-button @click="test">test11</el-button>
            <div class="header-middle"></div>
            <div class="header-right">
               <el-dropdown trigger="click">
                  <div class="avatar-wrapper">
                    <el-avatar :src="logoImg" />  
                  </div>
                  <template #dropdown>
                     <el-dropdown-menu class="user-dropdown">
                        <router-link to="/userinfo">
                           <el-dropdown-item>基本信息</el-dropdown-item>
                        </router-link>
                        <router-link to="/userpassword">
                           <el-dropdown-item>修改密码</el-dropdown-item> 
                        </router-link>
                           
                        
                        <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
                     </el-dropdown-menu>
                  </template>
               </el-dropdown>
               
            </div>
         </div>
         <div class="content">
            <router-view></router-view>
         </div>
      </div>

      
   </div>
</template>

<style lang="scss" scoped>
@use "@/styles/layout/home.scss"
</style>