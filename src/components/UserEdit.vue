<script setup>
  import { inject, reactive, ref } from "vue"
  import user from "@/api/user";

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


   

const addRules = {
    userid:[
        {required: true, message: '请填写用户名', trigger: 'blur'}
    ],
    company:[
        {required:true, message:'请填写公司名称',trigger:'blur'}
    ],
    contact:[
        {required:true, message:'请填写联系人',trigger:'blur'}
    ],
    tel:[
        {required:true, message:'请填写电话',trigger:'blur'}
    ],
    email:[
        {required:true, message:'请填写联邮箱',trigger:'blur'}
    ],
    permission:[
        {required:true, message:'请选择用户级别',trigger:'blur'}
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
    if(value === '4'){
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
    }else if( value === '0'){
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





const addUserForm = ref()
const addSubmit = () => {
   addUserForm.value.validate((valid,field) => {
      if(!valid){
         return
      }
   })
}
</script>

<template>
   <div class="userdetail">
      <el-dialog v-model="addUserShow" width="60%">
         <div class="detailform">
            <el-form label-width="100" :rules="addRules" :model="userInfoData" ref="addUserForm">
               <el-form-item label="用户名" prop="userid">
                  <el-input v-model="userInfoData.user_id"></el-input>
               </el-form-item>
               <el-form-item label="公司名称" prop="company">
                  <el-input v-model="userInfoData.o_company"></el-input>
               </el-form-item>
               <el-form-item label="联系人" prop="contact">
                  <el-input v-model="userInfoData.o_contact"></el-input>
               </el-form-item>
               <el-form-item label="电话" prop="tel">
                  <el-input v-model="userInfoData.o_tel"></el-input>
               </el-form-item>
               <el-form-item label="email" prop="email">
                  <el-input v-model="userInfoData.o_email"></el-input>
               </el-form-item>
               <el-form-item label="备用mail">
                  <el-input v-model="userInfoData.o_email2"></el-input>
               </el-form-item>
               <el-form-item label="用户级别" prop="permission">
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
               <el-form-item label="所属代理" v-show="agentShow">
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