<script setup >
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import user from '@/api/user';
import { useUserStore } from '@/store/user';

const userStore = useUserStore()



const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const formRef = ref()

const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 8, max: 20, message: '密码长度为8到20位', trigger: 'blur' }
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value) => {
        if (value === form.value.newPassword) {
          return true
        }
        return new Error('两次输入的密码不一致')
      },
      trigger: 'blur'
    }
  ]
}

const submitForm =  async () => {
    // let username = JSON.parse(localStorage.getItem('user'))
    // const { data } = username
    // console.log('username',data.username)
    // console.log('userStore',userStore.username)
  if (!formRef.value) return
  await formRef.value.validate()
  user.changePassword(form.value).then( res => {
    console.log('changepass res',res)
  }).catch(err => {
    console.log('changepass err',err)
  })
}

const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
}
</script>
<template>
    <div class="change-password-container">
      <h1 class="page-title">修改密码</h1>
      <el-card class="password-card">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input
              v-model="form.oldPassword"
              type="password"
              placeholder="请输入旧密码"
            />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input
              v-model="form.newPassword"
              type="password"
              placeholder="请输入新密码"
            />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmNewPassword">
            <el-input
              v-model="form.confirmNewPassword"
              type="password"
              placeholder="请再次输入新密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  

  
  <style scoped>
  .change-password-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    /* justify-content: center; */
    height: 100%;
    background-color: #f0f2f5;
  }
  
  .page-title {
    color: #303133;
    margin: 30px;
    font-size: 28px;
    font-weight: 600;
  }
  
  .password-card {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 600px;
  }
  </style>