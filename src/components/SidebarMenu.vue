<script setup>
  import { computed, ref } from "vue"
import { useRoute } from "vue-router";

// 默认激活的菜单项
// 通过获取当前路由的地址传递给el-menu的default-active，来激活相应的菜单
const route = useRoute()
const activeMenu = computed(() => {
   const {path} = route
   return path
})

const isCollapse = ref(false)

</script>

<template>
 <div >
    <el-menu
       :default-active="activeMenu"
       class="el-menu-vertical-demo"
       :collapse="isCollapse"
       router
    >
       <el-sub-menu index="1">
          <template #title>
             <el-icon><Suitcase /></el-icon>
             <span>报备管理</span>
          </template>

          <el-menu-item index="/firstlist">初报查询</el-menu-item>
          <el-menu-item index="/renewallist">续报查询</el-menu-item>
          <el-menu-item index="/endlist">结案查询</el-menu-item>
       </el-sub-menu>
       <el-sub-menu index="2">
         <template #title>
            <el-icon><setting /></el-icon>
             <span>用户管理</span>
          </template>   
          <el-menu-item index="/adminmanage">管理员列表</el-menu-item>    
          <el-menu-item index=/usermanage>经销商列表</el-menu-item>  
       </el-sub-menu>
       <el-sub-menu index="3">
         <template #title>
            <el-icon><setting /></el-icon>
             <span>系统设置</span>
          </template>   
          <el-menu-item index="/setting/notice">公告设置</el-menu-item>    
          <el-menu-item index="/setting/email">邮箱设置</el-menu-item> 
          <el-menu-item index="/setting/other">其它设置</el-menu-item>   
       </el-sub-menu>
       <el-menu-item index="/addcustomer">
         <el-icon><Suitcase /></el-icon>
         <span>客户报备</span>
       </el-menu-item>
       <el-menu-item index="/customerlist">
         <el-icon><Suitcase /></el-icon>
         <span>客户列表</span>
       </el-menu-item>
    </el-menu>
 </div>
</template>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>