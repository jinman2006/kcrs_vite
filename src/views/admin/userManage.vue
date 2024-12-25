<script setup>
  import { computed, ref, provide } from "vue"
  import user from "@/api/user";
  import UserEdit from "@/components/UserEdit.vue";
  import { diffDataForm } from "@/utils/formdata";
import { ElMessage, ElMessageBox } from "element-plus";

  const UserListData = ref([])

//   分页数据
  const size = ref('default')
  const disabled = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const background = ref(false)
//   const paginationShow = ref(true)

  const paginationShow = computed( ()=>{
      return total.value>pageSize.value?true:false
  })

   // 修改页码
  const handleCurrentChange = val => {
   user.getuserlist(val, pageSize.value).then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('usermanage err',err)
   })
  }
  // 修改分页大小
  const handleSizeChange = val => {
   user.getuserlist(currentPage.value, val).then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('handlesizechange err',err)
   })
  }


// 取初始数据
user.getuserlist(currentPage.value, pageSize.value).then( res => {
   console.log('umanage',res)
   UserListData.value = res.data
   total.value = res.total
})
.catch( err => {
   console.log('umanage',err)
})

const dialogData = ref()
const dialogData_copy = ref()
//单击名称弹出详情对话页
const userClick = (row, column, cell, event) => {
   if(column.property !== 'user_id') return
    isShow.value = true
    dialogData.value = row
    dialogData_copy.value = JSON.parse(JSON.stringify(row))

}
// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'user_id'){
        return {"cursor": 'pointer',"color":'rgb(51.2, 126.4, 204)',"font-weight":'bolder'}
        // rgb(51.2, 126.4, 204)
    }
}

const isShow = ref(false)
const saleManagerShow = computed(() => {
   return dialogData.user_permission === '3'?true:false
})


const addUserShow = ref(false)
provide('addUserShow',{
   addUserShow
})
const addUser = () => {
   addUserShow.value = true
}

const updateUserList = isDone => {
   total.value ++
   let lastPage = Math.ceil(total.value / pageSize.value)

   if(isDone){//true 新增完成，false 未完成
      addUserShow.value = false
      handleCurrentChange(lastPage)
   }
   
   console.log('update')
}

// 修改用户
const modifyUser = (e) => {
   console.log('data',dialogData.value)
   console.log('copy',dialogData_copy.value)
   let modifyData  = diffDataForm(dialogData.value,dialogData_copy.value)
   if(JSON.stringify(modifyData) =="{}"){
      ElMessage.error("表单未修改")
   }else{
      console.log('modifyData',modifyData)
      modifyData['o_no'] = e
      user.modifyUser(modifyData).then( res => {
         console.log('modify res', res)
         if(res.success){
            ElMessage.success(res.message)
         }else{
            ElMessage.error(res.message)
         }
      }).catch( err => {
         console.log('modify err',err)
      })
   }
}

// 锁定用户
const lockUser = e => {
   user.lockUser(e).then( res => {
      if(res.success){
         dialogData.value.id_status='0'
         ElMessage.success(res.message)
      }else{
         ElMessage.error(res.message)
      }
   }).catch(err => {
      console.log('lockuser err', err)
   })
}
// 解锁用户
const unlockUser = e => {
   user.unlockUser(e).then( res => {
      if(res.success){
         dialogData.value.id_status='1'
         ElMessage.success(res.message)
      }else{
         ElMessage.error(res.message)
      }
   }).catch(err => {
      console.log('unlock err',err)
   })
}

// 重置密码
const resetPassword = e => {
   ElMessageBox.confirm(
            '确定要重置密码吗？',
            '操作提醒',
            {
                  confirmButtonText:'确认重置',
                  cancelButtonText:'取消操作',
                  type: 'warning'
            }
   ).then(() => {     
      user.resetPassword(e).then(res => {
         if(res.success){
            // ElMessage.success(res.message)
            ElMessageBox.alert('重置后的密码为：'+res.data ,'重置成功，请保存')
         
         }else{
            ElMessage.error(res.message)
         }
      }).catch(err => {
         console.log('resetpass err',err)
      })
   }).catch(() => {
            console.log('取消')
   }) 
}

// 删除用户
const delUser = e => {
   ElMessageBox.confirm(
      '确定要删除该用户吗？',
      '操作提醒',
      {
            confirmButtonText:'确认删除',
            cancelButtonText:'取消操作',
            type: 'warning'
      }      
   ).then(() => {
      user.delUser(e).then(res => {
         if(res.success){
            UserListData.value = UserListData.value.filter(item => item.o_no!==e)
            // console.log(UserListData.value)

            total.value --
            if(UserListData.value.length === 0 && currentPage.value >1){
               currentPage.value--
               user.getuserlist(currentPage.value, pageSize.value).then( res => {
                  UserListData.value = res.data
               }).catch( err => {
                  console.log('handlesizechange err',err)
               })            
            }
            isShow.value = false
            ElMessage.success(res.message)

         }else{
            ElMessage.error(res.message)
         }
      }).catch(err => {
         console.log('resetpass err',err)
      })      
   }).catch(() => {
            console.log('取消')
   }) 

}

</script>

<template>
   <div class="userlist">
      <div class="listheader">
         <el-button type="primary" @click="addUser">新增</el-button>
      </div>
        <el-table 
         :data="UserListData"
         border
         style="width: 98%;"
         @cell-click="userClick"
         :cell-style="mousePointer"
        >
            <el-table-column prop="user_id" label="用户名" show-overflow-tooltip />
            <el-table-column prop="o_company" label="公司" show-overflow-tooltip/>
            <el-table-column prop="o_contact" label="联系人" show-overflow-tooltip/>
            <el-table-column prop="o_tel" label="电话" show-overflow-tooltip/>
            <el-table-column prop="user_permission" label="级别">
               <template #default="{row}">
                  <el-text v-if="row.user_permission === '0'">办事处</el-text>
                  <el-text v-else-if="row.user_permission === '2'">代理商</el-text>
                  <el-text v-else-if="row.user_permission === '3'">销售经理</el-text>
                  <el-text v-else-if="row.user_permission === '4'">经销商</el-text>
                  <el-text v-else>未知</el-text>
               </template>
            </el-table-column>
            <el-table-column prop="id_status" label="状态">
               <template #default="{row}">
                  <el-text v-if="row.id_status === '1'" type="success" >正常</el-text>
                  <el-text v-else-if="row.id_status === '0'" type="warning">锁定</el-text>
                  <el-text v-else>删除</el-text>
               </template>
            </el-table-column>
            <el-table-column prop="last_date" label="登录时间" show-overflow-tooltip />
            <el-table-column  label="快捷操作" fixed="right" min-width="90">
             <template #default="{row}">
                <el-button link type="primary" size="small" @click="resetPassword(row.o_no)">密码重置</el-button>
             </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container" v-show="paginationShow">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>  
   </div>
   <user-edit v-show="addUserShow" @updateUserList="updateUserList"></user-edit>
   <div class="userdetail">
      <el-dialog v-model="isShow" width="60%">
         <div class="detailform">
            <el-form label-width="100">
               <el-form-item label="用户名">
                  <el-input v-model="dialogData.user_id" disabled></el-input>
               </el-form-item>
               <el-form-item label="公司名称">
                  <el-input v-model="dialogData.o_company" ></el-input>
               </el-form-item>
               <el-form-item label="联系人">
                  <el-input v-model="dialogData.o_contact"></el-input>
               </el-form-item>
               <el-form-item label="电话">
                  <el-input v-model="dialogData.o_tel"></el-input>
               </el-form-item>
               <el-form-item label="email">
                  <el-input v-model="dialogData.o_email"></el-input>
               </el-form-item>
               <el-form-item label="备用mail">
                  <el-input v-model="dialogData.o_email2"></el-input>
               </el-form-item>
               <el-form-item label="用户级别">
                  <!-- 1管理员 2代理商 3销售经理 0办事处 4经销商 -->
                  <!-- <el-input v-model="dialogData.user_permission"></el-input> -->
                  <el-select v-model="dialogData.user_permission">
                     <el-option label="代理商" value="2" />
                     <el-option label="办事处" value="0" />
                     <el-option label="销售经理" value="3" />
                     <el-option label="经销商" value="4" />
                  </el-select>
               </el-form-item>
               <el-form-item label="销售经理" v-show="saleManagerShow">
                  <el-select>
                     <el-option></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="modifyUser(dialogData.o_no)">修改</el-button>
                  <el-button type="warning" @click="lockUser(dialogData.o_no)" v-show="dialogData.id_status==1">锁定</el-button>
                  <el-button type="success" @click="unlockUser(dialogData.o_no)" v-show="dialogData.id_status==0">解锁</el-button>
                  <el-button type="" @click="resetPassword(dialogData.o_no)">重置密码</el-button>
                  <el-button type="danger" @click="delUser(dialogData.o_no)">删除</el-button>
               </el-form-item>
            </el-form>
         </div>

      </el-dialog>
   </div>
</template>

<style lang="scss" scoped>
.userlist{
   height: 100%;
   width: 100%;
   background-color: #fff;
   border-radius: 10px;
   display: flex;
   flex-direction: column;
   align-items: center;
   box-sizing: border-box;
   padding: 20px 0;
   .listheader{
      width: 100%;
      // margin: 10px;
      padding: 10px 20px;
      box-sizing: border-box;
   }
   .pagination-container{
      box-sizing: border-box;
       height: 80px;
       width: 100%;
       margin-top: 10px;
       padding-left: 20px;      
   }
}
.userdetail{
   // padding: 20px;
   .detailform{
      margin: 10px;
      box-sizing: border-box;
      width: 80%;
   }
}
</style>