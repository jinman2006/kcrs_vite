<script setup>
  import { computed, reactive, ref } from "vue"
  import user from "@/api/user";
import { ElMessageBox } from "element-plus";

  const UserListData = ref([])

//   分页数据
  const size = ref('default')
  const disabled = ref(false)
  const currentPage = ref(1)
  const pageSize = ref(10)
  const total = ref(0)
  const background = ref(false)
//   const paginationShow = ref(false)

  const isShow = ref(false)
  const addBtnShow = ref(false)

  const paginationShow = computed( ()=>{
      return total.value>pageSize.value?true:false
  })

   // 修改页码
  const handleCurrentChange = val => {
   user.getuserlist(val, pageSize.value, 'admin').then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('usermanage err',err)
   })
  }
  // 修改分页大小
  const handleSizeChange = val => {
   user.getuserlist(currentPage.value, val, 'admin').then( res => {
      UserListData.value = res.data
   }).catch( err => {
      console.log('handlesizechange err',err)
   })
  }

  const userLock = () => {

  }
  const userDelete = () => {

  }

// 取初始数据
user.getuserlist(currentPage.value, pageSize.value, 'admin').then( res => {
   console.log('umanage',res)
   UserListData.value = res.data
   total.value = res.total

})
.catch( err => {
   console.log('umanage',err)
})

const adminInfo = reactive({
   user_id:'',
   o_contact:'',
   o_tel:'',
   o_email:''
})

// 检查邮箱
var pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
const checkEmail = (rule, value, callback) => {
   if(!value){
      callback(new Error("请填写email地址"))
   }
   if(!pattern.test(value)){
      callback(new Error("格式不正确，请填写正确的email地址"))

   }
   callback()
}

const adminRules = {
   user_id:[
        {required: true, message: '请填写用户名', trigger: 'blur'}
    ],
    o_company:[
        {required:true, message:'请填写公司名称',trigger:'blur'}
    ],
    o_contact:[
        {required:true, message:'请填写联系人',trigger:'blur'}
    ],
    o_tel:[
        {required:true, message:'请填写电话',trigger:'blur'}
    ],
    o_email:[
        {required: true,message:'请填写email', trigger:'blur'},
        {validator:checkEmail} 
    ]  
}

const dialogData = ref()

const addManagerShow = () => {
   isShow.value = true
   addBtnShow.value = true
   dialogData.value = adminInfo
   
}

const addAdminForm = ref()
const addManager = () => {
   addAdminForm.value.validate((valid,field) => {
      if(!valid){
         return
      }
      user.addManager(dialogData.value).then( res => {
         console.log('addmanager res',res)
         if(res.success && res.code === 200){
            ElMessageBox.confirm(
               res.message+'返回列表页',
               '操作提示',
               {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  type: 'success',                   
               }
            ).then(() => {
               addAdminForm.value.resetFields()
               total.value ++
               let lastPage = Math.ceil(total.value / pageSize.value)
               handleCurrentChange(lastPage)
               isShow.value = false
            }).catch(() => {
               addAdminForm.value.resetFields()
               total.value ++
            })
         }
      }).catch(err => {
         console.log('addmanager err',err)
      })
   })
}

//单击名称弹出详情对话页
const userClick = (row, column, cell, event) => {
   if(column.property !== 'user_id') return
    isShow.value = true
    addBtnShow.value = false
    dialogData.value = row
    console.log('row',row)
}
// 鼠标移入名称单元格，鼠标样式更改为手指开关
const mousePointer = (row, column, rowIndex, columnIndex) => {
    // if(row.column.property === 'name')return "cursor:pointer;"
    if(row.column.property == 'user_id'){
        return {"cursor": 'pointer',"color":'rgb(51.2, 126.4, 204)',"font-weight":'bolder'}
        // rgb(51.2, 126.4, 204)
    }
}


const saleManagerShow = computed(() => {
   return dialogData.user_permission === '3'?true:false
})
</script>

<template>
   <div class="userlist">
         <div class="listheader">
            <el-button type="primary" @click="addManagerShow">新增</el-button>
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
                  <el-text v-if="row.id_status === '1'">正常</el-text>
                  <el-text v-else-if="row.id_status === '0'">锁定</el-text>
                  <el-text v-else>删除</el-text>
               </template>
            </el-table-column>
            <el-table-column prop="last_date" label="登录时间" show-overflow-tooltip />
            <el-table-column  label="快捷操作" fixed="right" min-width="90">
             <template #default="{row}">
                <el-button link type="warning" size="small" @click="userLock(row)">密码重置</el-button>
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
   <div class="userdetail">
      <el-dialog v-model="isShow" width="60%">
         <div class="detailform">
            <el-form 
               label-width="100"  
               :rules="adminRules" 
               :model="dialogData"
               ref="addAdminForm">
               <el-form-item label="用户名" prop="user_id">
                  <el-input v-model="dialogData.user_id"></el-input>
               </el-form-item>
               <el-form-item label="姓名" prop="o_contact">
                  <el-input v-model="dialogData.o_contact"></el-input>
               </el-form-item>
               <el-form-item label="电话" prop="o_tel">
                  <el-input v-model="dialogData.o_tel"></el-input>
               </el-form-item>
               <el-form-item label="email" prop="o_email">
                  <el-input v-model="dialogData.o_email"></el-input>
               </el-form-item>
               <el-form-item>
                  <div v-show="addBtnShow">
                     <el-button type="primary" @click="addManager">提交</el-button>
                  </div>
                  <div v-show="!addBtnShow">
                     <el-button type="primary">修改</el-button>
                     <el-button type="warning">锁定</el-button>
                     <el-button type="">重置密码</el-button>
                     <el-button type="danger">删除</el-button>                    
                  </div>

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