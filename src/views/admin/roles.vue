<template>

    <div class="userlist">
      <div class="userlistheader">
        <div class="userlistbtn">
          <el-button type="primary" @click="addRole">添加角色</el-button>
        </div>
      </div>
      
      <el-table
        :data="roleList"
        border
        style="width: 98%;"
  

      >
        <el-table-column prop="role_name" label="角色名称" min-width="90" show-overflow-tooltip />
        <el-table-column prop="role_permission_zh" label="角色权限" min-width="250" show-overflow-tooltip />
        <el-table-column label="操作" fixed="right" min-width="90">
          <template #default="{row}">
              <el-button link type="primary"  size="small" @click="modifyRole(row)">修改</el-button>
              <el-button link type="danger" v-show="row.role_name != '管理员'" size="small" @click="deleteRole(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="userdetail">
      <el-dialog v-model="isShow" width="60%">
        <div class="detailform">
          <div class="rolename" v-show="roleID == 0">
            <div style="margin-bottom: 5px;">
              <b >角色名称</b>
            </div>
            
            <el-input v-model="roleName" placeholder="请输入角色名称"></el-input>
          </div>
          <div style="margin-bottom: 5px;">
            <b>请选择菜单权限</b>
          </div>
          <div style="border: 1px solid #eee;padding: 10px;">
            <el-checkbox-group v-model="checkboxBindValue" size="large">
              <el-checkbox v-for="route in filteredRoutes" :key="route.path" :value="route.name">
                {{ route.meta.title }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div style="margin-top: 10px;">
            
            <el-button type="primary" v-show="roleID" @click="rolePermissionSave">修改</el-button>
            <el-button type="primary" v-show="!roleID" @click="roleAddSubmit">增加</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { computed, reactive, ref, onMounted } from "vue";
  import role from "@/api/role";

  import router from '@/router'
import { ElMessage, ElMessageBox } from "element-plus";

  // 定义一个响应式变量来存储过滤后的路由
  const filteredRoutes = ref([]);

  const roleList = ref([])// 角色列表
  

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
      // roleList.value = res.data
      data.forEach(row => {
        const titles = []
      //   console.log('row',row)
      //   // console.log('type',typeof(row.menu_permission))
          const row_temp = []
          row_temp.id=row.id
      //     row_temp.menu_permission = row.menu_permission
          row_temp.role_name = row.role_name
          let arr_role_permission = row.role_permission.split(',')//将字符串转换为数组
          row_temp.role_permission = arr_role_permission
          console.log('arr_role_permission',arr_role_permission)
          arr_role_permission.forEach(permission => {
        //   console.log('permission',permission)
          const matchName = filteredRoutes.value.find(route => route.name === permission)
        //   console.log('matchname',matchName)
            if(matchName){
              titles.push(matchName.meta.title)
            }
          })
          row_temp.role_permission_zh=titles.join(',')//角色权限中文
        // console.log('title',titles)
        // row.menu_permission = titles
        // console.log('row2',row.menu_permission)
      //   console.log('row_temp',row_temp)
        roleList.value.push(row_temp)
      })
      // roleList.value = res.data

    }).catch(err => {
      console.log('getroles err',err)
    })
  });

  const checkboxBindValue = ref([])
  
  const RoleListData = ref([]);
  
  const isShow = ref(false);
  
  const roleID = ref(0)
  
  const roleName = ref('')
  
  // 删除角色
  const deleteRole = id => {
    ElMessageBox.confirm(
      '此操作将永久删除该角色，是否继续？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    ).then(() => {
      role.delRoles(id).then(res => {
        if(res.success){
          ElMessage.success(res.message)
          location.reload() 
        }else{
          ElMessage.error(res.message)
        }
        console.log('deleteroles res',res) 
      }).catch(err => {
        ElMessage.error(err)
        console.log('deleteroles err',err)
      })
    }).catch(() => {
      ElMessage.info('已取消删除')
    });
  }
  // 添加角色
  const addRole = () => {
    roleID.value = 0
    checkboxBindValue.value = []
    isShow.value = true
  }

  // 添加角色（保存）
  const roleAddSubmit = () => {  
    if(roleName.value == ''){
      ElMessage.error('请输入角色名称')
      return
    }
    if(checkboxBindValue.value.length == 0){
      ElMessage.error('请选择角色权限')
      return 
    }
    // 添加角色
    role.addRoles(roleName.value,menuPermission.value).then(res => {
      console.log('addroles res',res) 
      if(res.success){
        ElMessage.success(res.message)
        isShow.value = false
        location.reload() 
      }else{
        ElMessage.error(res.message)
      }
    }).catch(err => {
      console.log('addroles err',err)
      ElMessage.error(err) 
    })
  }
  
  // 修改角色
  const modifyRole = row => {
    isShow.value = true
    roleID.value = row.id
    //将角色权限赋值给checkbox选中项的绑定值 checkboxBindValue
    checkboxBindValue.value = row.role_permission
    console.log('role_permission',row.role_permission)

    console.log(JSON.stringify(row.role_permission))
  }

  // 修改角色权限（保存）
  const rolePermissionSave = () => {
    console.log(roleID.value)
    console.log('checkboxBindValue',menuPermission.value.join(','))
    if(checkboxBindValue.value.length == 0){
      ElMessage.error('请选择角色权限')
      return
    }
    let role_permission = menuPermission.value.join(',')//将数组转换为字符串
    role.setRoles(roleID.value,role_permission).then(res => {
      console.log('setroles res',res)
      if(res.success){
        ElMessage.success(res.message) 
        isShow.value = false
        location.reload()
      }else{
        ElMessage.error(res.message)
      }
      
    }).catch(err => {
      console.log('setroles err',err)
      ElMessage.error(err)
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
    .userlistheader {
      width: 98%;
      height: 40px;
      display: flex;
    }
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
    .rolename{
      margin-bottom: 10px;
    }
    .detailform {
      margin: 10px;
      box-sizing: border-box;
      width: 80%;
    }
  }
  </style>