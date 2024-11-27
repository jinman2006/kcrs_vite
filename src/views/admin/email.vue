<script setup>
  import { ref, reactive } from "vue"
  import setting from "@/api/setting";
import { ElMessage } from "element-plus";
import { Plus } from '@element-plus/icons-vue'

  const emailConfigForm = reactive({
    smtp:'',
    account:'',
    password:'',
    email:''
  })

  const email  = ref()
  const listId = ref(1)
  const emailItem = reactive([])

  const emailList = reactive([])

  const emailConfigRef = ref()

  const rules = {
    smtp:[
        {required: true, message: '请填写smtp服务器', trigger: 'blur'}
    ],
    account:[
        {required: true, message: '请填写邮箱帐号', trigger: 'blur'}
    ],
    password:[
        {required: true, message: '请填写邮箱密码', trigger: 'blur'}
    ],
    email:[
        {required: true, message: '请填写邮箱名', trigger: 'blur'}
    ]
  }

  setting.getEmailConfig().then(res => {
    const { data } = res
    emailConfigForm.account = data.account
    emailConfigForm.smtp = data.smtp
    emailConfigForm.email = data.email
    emailConfigForm.password = data.password
  }).catch(err => {
    console.log('getemailconfig err',err)
  })

  const savEmailConfig = () => {
    emailConfigRef.value.validate((valid,field) => {
      console.log(valid)
      if(!valid){
        return
      }
      setting.saveEmailConfig(emailConfigForm).then(res => {
        console.log('res',res)
      }).catch(err => {
        console.log('saveemail',err)
      })
    })
  }

  const addList = () => {
    let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    // 邮件格式验证通过
    if(pattern.test(email.value)){
      
      emailItem['id'] = listId
      emailItem['mail'] = email.value

    }else{
      ElMessage.error('邮箱格式不正确')
    }
    // console.log(email.value)
    emailList.push(emailItem)
    email.value = ''
  }

  const saveList = () => {
    console.log(emailList)
    // let getlist = emailList.list.trim()
    // if(getlist !== ''){
    //   let pattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    //   let arr_temp = getlist.split(',')
    //   for(let i=0;i<=arr_temp.length;i++){
    //     console.log(arr_temp[i])
    //     console.log(pattern.test(arr_temp[i]))
    //     if(!pattern.test(arr_temp[i])){
    //       ElMessage.error('邮箱格式不正确，请确认')
    //       break
    //     }else{
    //       console.log('正确')
    //     }

    //   }
    // }else{
    //   console.log('空值')
    // }
  }
</script>

<template>
    <div class="smtp-container">
      <div class="smtp-config">
        <h3 style="margin:0 0 20px 20px;">邮箱服务配置</h3>
        <el-form label-position="right" :rules="rules" :model="emailConfigForm"  ref="emailConfigRef" label-width="100">
          <el-form-item label="发送服务器" prop="smtp">
            <el-input v-model="emailConfigForm.smtp"></el-input>
          </el-form-item>
          <el-form-item label="帐号" prop="account">
            <el-input v-model="emailConfigForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="emailConfigForm.password"></el-input>
          </el-form-item>
          <el-form-item label="发信邮箱" prop="email">
            <el-input v-model="emailConfigForm.email"></el-input>
          </el-form-item>           
        </el-form>  
        <div class="btn">
          <el-button type="primary" @click="savEmailConfig">保存配置</el-button>
        </div>    
      </div>
    </div>
    <div class="receive-container">
      <div class="list-container">
        <h3 style="margin:0 0 20px 20px;">系统邮件接收列表</h3>
        <div class="list">
          <el-tag v-for="item in emailList" :key="item.id">{{ item.mail }}</el-tag>
        </div>
        <el-form label-width="100" >
          <el-form-item prop="list">
            <el-input v-model="email">
              <template #append>
                <el-button :icon="Plus" @click="addList" />
              </template>

            </el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
         
          <el-button type="primary" @click="saveList">保存列表</el-button>
        </div>
      </div>
    </div>


</template>

<style lang="scss" scoped>
.smtp-container{
  width: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  box-sizing: border-box;
  .smtp-config{
    // box-sizing: border-box;
    width: 50%;
    margin: 10px;
    .btn{
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    } 
  }
 
}
.receive-container{
  width: 100%;
  background-color: #fff;  
  border-radius: 0 0 10px 10px;
  padding: 10px;
  margin-top: 10px;
  box-sizing: border-box;
  .list-container{
    width: 50%;
    margin: 10px;
    .btn{
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    } 
  }
}
</style>