<script setup>
  import { inject, reactive, ref } from "vue"
  import user from "@/api/user";
import { ElMessage, ElMessageBox } from "element-plus";

  const { addUserShow } = inject('addUserShow')
  const userInfoData = reactive({
    user_id:'',
    o_company:'',
    o_contact:'',
    o_tel:'',
    o_email:'',
    o_email2:'',
    user_permission:'',
    saleManager:'',
    agent:''
  })

// 当权限选择办事处理时检查代理商有没有被选择
const checkAgent = (rule, value, callback) => {
   if(userInfoData.user_permission == '0' && value == ''){
      return callback(new Error("请选择办事处理所属的代理商"))
   }else{
      callback()      
   }
}

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
const checkEmail2 = (rule, value, callback) => {
   if(!!value && !pattern.test(value)){
      callback(new Error("email格式不正确"))
   }else{
      callback()
   }
}

const addRules = {
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
    ],
    o_email2:[
        {validator:checkEmail2,trigger:'blur'} 
    ],
    user_permission:[
        {required:true, message:'请选择用户级别',trigger:'blur'}
    ],
    agent:[
      {validator:checkAgent, trigger:'blur'}
   ]
}


const saleManagerShow = ref(false)
const saleManagerList = ref([])
const saleManagerLoadText = ref('获取销售经理中...')
const agentShow = ref(false)
const agentList = ref([])
const agentLoadText = ref('获取代理商列表中...')
const selectChange = value => {
    console.log(value)
    if(value == '4'){
        user.getSaleManagerList().then(res => {
            console.log(res.data)
            saleManagerList.value = res.data
            saleManagerLoadText.value = "请选择对应的销售经理"
        }).catch( err => {
         console.log('getsalemanager err',err)
        })
        saleManagerShow.value = true
        agentShow.value = false
        console.log('salemanage',saleManagerShow.value)
    }else if( value == '0'){
         user.getAgentList().then( res => {
            agentList.value = res.data
            agentLoadText.value = "请选择所属的代理商"
         }).catch(err => {
            console.log('getagent err', err)
         })
         agentShow.value = true
         saleManagerShow.value = false
    }else{
        saleManagerShow.value = false
        agentShow.value = false
        console.log('salemanage',saleManagerShow.value)
    }
}




const emit = defineEmits(['updateUserList'])
const addUserForm = ref()
const addSubmit = () => {
   // console.log(addUserForm.value.validate())
   addUserForm.value.validate((valid,field) => {
      console.log('valid',valid)
      if(!valid){
         return
      }
      user.addUser(userInfoData).then( res => {
         console.log(res)
         if(res.success && res.code ===200){ 
            ElMessageBox.confirm(
               res.message+' 返回列表页',
               '操作提示',
               {
                  confirmButtonText: 'OK',
                  cancelButtonText: 'Cancel',
                  type: 'success',                  
               }
            ).then(() => {
               addUserForm.value.resetFields()
               saleManagerShow.value = false
               agentShow.value = false
               emit('updateUserList',true)               
            }).catch(() => {
               addUserForm.value.resetFields()
               emit('updateUserList',false)            
            })

         }else{
            ElMessage.error(res.message)
         }
      }).catch( err => {
         console.log('adduser err',err)
      })
   })
}
</script>

<template>
   <div class="userdetail">
      <el-dialog v-model="addUserShow" width="60%">
         <div class="detailform">
            <el-form label-width="100" :rules="addRules" :model="userInfoData" ref="addUserForm">
               <el-form-item label="用户名" prop="user_id">
                  <el-input v-model="userInfoData.user_id"></el-input>
               </el-form-item>
               <el-form-item label="公司名称" prop="o_company">
                  <el-input v-model="userInfoData.o_company"></el-input>
               </el-form-item>
               <el-form-item label="联系人" prop="o_contact">
                  <el-input v-model="userInfoData.o_contact"></el-input>
               </el-form-item>
               <el-form-item label="电话" prop="o_tel">
                  <el-input v-model="userInfoData.o_tel"></el-input>
               </el-form-item>
               <el-form-item label="email" prop="o_email">
                  <el-input v-model="userInfoData.o_email"></el-input>
               </el-form-item>
               <el-form-item label="备用mail" prop="o_email2">
                  <el-input v-model="userInfoData.o_email2"></el-input>
               </el-form-item>
               <el-form-item label="用户级别" prop="user_permission">
                  <!-- 1管理员 2代理商 3销售经理 0办事处 4经销商 -->
                  <!-- <el-input v-model="dialogData.user_permission"></el-input> -->
                  <el-select 
                  placeholder="请选择用户级别"
                  v-model="userInfoData.user_permission" 
                  @change="selectChange">
                     <el-option label="代理商" value="2" />
                     <el-option label="办事处" value="0" />
                     <el-option label="销售经理" value="3" />
                     <el-option label="经销商" value="4" />
                  </el-select>
               </el-form-item>
               <el-form-item label="所属代理" v-show="agentShow" prop="agent">
                  <el-select
                  :placeholder="agentLoadText"
                  v-model="userInfoData.agent"
                  >
                     <el-option v-for="item in agentList" :key="item.id" :label="item.agent" :value="item.agent"></el-option>
                  </el-select>
               </el-form-item>
               <el-form-item label="销售经理" v-show="saleManagerShow">
                  <el-select 
                  :placeholder="saleManagerLoadText"
                  v-model="userInfoData.saleManager"
                  >
                     <el-option v-for="item in saleManagerList" :key="item.o_no" :label="item.o_contact" :value="item.o_no"/>
                  </el-select>
               </el-form-item>
               <el-form-item>
                  <el-button type="primary" @click="addSubmit">提交</el-button>
               </el-form-item>
            </el-form>
         </div>

      </el-dialog>
   </div>
</template>

<style lang="scss" scoped>
.userdetail{
   // padding: 20px;
   .detailform{
      margin: 10px;
      box-sizing: border-box;
      width: 80%;
   }
}
</style>