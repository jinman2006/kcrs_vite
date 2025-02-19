<template>

    <el-button type="primary" @click="test">测试</el-button>
    <div class="userlist">
      <!-- <div>
        <h1>包含 meta 元素的路由</h1>
        <ul>
          <li v-for="route in filteredRoutes" :key="route.path">
            {{ route.path }} - {{ route.meta.title}}
            <ul v-if="Object.keys(route.meta).length > 0">
              <li v-for="(value, key) in route.meta" :key="key">
                {{ key }}: {{ value }}
              </li>
            </ul>
          </li>
        </ul>
      </div> -->
      <!-- <div class="listheader">
        <el-button type="primary" @click="addRoleShow">新增</el-button>
      </div> -->
      <el-table
        :data="roleList"
        border
        style="width: 98%;"
  

      >
        <el-table-column prop="role_name" label="角色名称" show-overflow-tooltip />
        <el-table-column prop="menu_permission" label="角色权限" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" min-width="90">
          <template #default="{row}">
              <el-button link type="primary" size="small" @click="modifyRole(row)">修改</el-button>
              <el-button link type="danger" size="small" @click="deleteRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="userdetail">
      <el-dialog v-model="isShow" width="60%">
        <div class="detailform">
          <div style="margin-bottom: 5px;">
            <b>请选择菜单权限</b>
          </div>
          <div style="border: 1px solid #eee;padding: 10px;">
            <el-checkbox-group v-model="menuPermission" size="large">
              <el-checkbox v-for="route in filteredRoutes" :key="route.path" :value="route.name">
                {{ route.meta.title }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 10px;">
            
            <el-button type="primary" @click="menuPermissionSave">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { computed, reactive, ref, onMounted } from "vue";
  import role from "@/api/role";

  import router from '@/router'

  // 定义一个响应式变量来存储过滤后的路由
  const filteredRoutes = ref([]);

  const roleList = ref([])
  const role

  // 在组件挂载时读取并过滤路由表
  onMounted(() => {
    // 获取所有路由
    const allRoutes = router.getRoutes();
    console.log('allroutes',allRoutes)
    
    // 过滤出包含 meta 元素的路由
    filteredRoutes.value = allRoutes.filter(route => route.meta && Object.keys(route.meta).length>0);
    console.log(filteredRoutes.value)

    role.getRoles().then(res =>{
      console.log('getroles res',res.data)
      const {data} = res
      data.forEach(row => {
        const titles = []
        console.log('row',row)
        // console.log('type',typeof(row.menu_permission))
          const row_temp = []
          row_temp.id=row.id
          row_temp.role_name = row.role_name
          JSON.parse(row.menu_permission).forEach(permission => {
          console.log('permission',permission)
          const matchName = filteredRoutes.value.find(route => route.name === permission)
          console.log('matchname',matchName)
          if(matchName){
            titles.push(matchName.meta.title)
          }
        })
        row_temp.menu_permission=titles.join(',')
        // console.log('title',titles)
        // row.menu_permission = titles
        // console.log('row2',row.menu_permission)
        console.log('row_temp',row_temp)
        roleList.value.push(row_temp)
      })


      

      // roleList.value = res.data

    }).catch(err => {
      console.log('getroles err',err)
    })
  });

  const menuPermission = ref([])
  
  const RoleListData = ref([]);
  
  const isShow = ref(false);

  
  const roleID = ref(0)
  const modifyRole = row => {
    isShow.value = true
    roleID.value = row.id
    menuPermission.value = JSON.parse(row.menu_permission)
    console.log(JSON.parse(row.menu_permission))
  }

  const menuPermissionSave = () => {
    console.log(roleID.value)
    console.log(menuPermission.value)
    role.setRoles(roleID.value,menuPermission.value).then(res => {
      console.log('setroles res',res)
    }).catch(err => {
      console.log('setroles err',err)
    })
  }


  const test = () => {
    isShow.value = true
  }


  

 
  

 
  
 
  


  </script>
  
  <style lang="scss" scoped>
  .userlist {
    height: 100%;
    width: 100%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 0;
    .listheader {
      width: 100%;
      padding: 10px 20px;
      box-sizing: border-box;
    }
    .pagination-container {
      box-sizing: border-box;
      height: 80px;
      width: 100%;
      margin-top: 10px;
      padding-left: 20px;
    }
  }
  .userdetail {
    // padding: 20px;
    .detailform {
      margin: 10px;
      box-sizing: border-box;
      width: 80%;
    }
  }
  </style>