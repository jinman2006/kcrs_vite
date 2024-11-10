<script setup>
  import { reactive, ref } from "vue"
  import user from '@/api/user.js'
  import md5 from "md5";

  const formData = reactive({
    username:'',
    password:''
  })

  const rules = {
    username:[
        {required: true, message: '请填写用户名', trigger: 'blur'}
    ],
    password:[
        {required: true, message: '请输入密码', trigger: 'blur'}
    ]
  }

  const loginFormRef = ref()
  // 登录
  const login = () => {
    loginFormRef.value.validate((valid,field) => {
        
        if(!valid){ //验证失败
            return 
        }
        user.login(formData.username,md5(formData.password))
        .then(res => {
            console.log('login res',res)
        }).catch(err => {
            console.log('login err',err)
        })
    })
  }
</script>

<template>
   <div class="page-container">
        <div class="login-container">
            <div class="title">
                <h2>系统登录</h2>
            </div>
            <div class="login-form">
                <el-form :model="formData" :rules="rules" ref="loginFormRef">
                    <el-form-item prop="username">
                        <el-input prefix-icon="User" v-model="formData.username" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input prefix-icon="Lock" v-model="formData.password" show-password />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
   </div>
</template>

<style lang="scss" scoped>
@use "@/styles/admin/login.scss"
</style>