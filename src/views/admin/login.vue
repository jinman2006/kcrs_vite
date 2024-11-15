<script setup>
  import { reactive, ref } from "vue"
  import user from '@/api/user.js'
  import sha1 from "sha1";
  import { ElMessage } from "element-plus";
  import { useUserStore } from "@/store/user";
  import { useRouter } from "vue-router";

  //   初始化
  const userStore = useUserStore()
  const router = useRouter()

  const formData = reactive({
    username:'admin',
    password:'3588823'
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
        user.login(formData.username,sha1(formData.password))
        .then(res => {
            if(res.success){
                ElMessage.success(res.message)
                // 将token后面的过期时间单独提取出来
                let resToken = res.data.token
                let expireTime = resToken.split('.')[2]
                
                // 用户状态存储至pinia与localstorage
                userStore.save(formData.username,resToken,expireTime)
                
                // 跳转到后台首页
                router.push("/admin")

                console.log('time',expireTime)
            }else{
                ElMessage.error(res.message)
            }
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