<script setup>
import logoImg from '@/assets/img/logo.png'
const userInfo = {
    name: '张三',
    age: 30,
    gender: '男',
    email: 'zhangsan@example.com',
    address: '北京市朝阳区XX街道XX号',
    phone: '138xxxxxxxx',
    occupation: '软件工程师'
  }
</script>

<template>
    <div class="user-info-container">
      <h3 class="page-title">用户基本信息</h3>
      <el-card class="info-card" shadow="always">
        <div class="avatar-section">
          <el-avatar
            :size="120"
            :src="logoImg"
            class="user-avatar"
          />
          <h2 class="user-name">{{ userInfo.name }}</h2>
        </div>
        <div class="info-section">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="年龄">
                <span class="info-value">{{ userInfo.age }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别">
                <span class="info-value">{{ userInfo.gender }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="邮箱">
                <span class="info-value">{{ userInfo.email }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址">
                <span class="info-value">{{ userInfo.address }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="电话">
                <span class="info-value">{{ userInfo.phone }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="职业">
                <span class="info-value">{{ userInfo.occupation }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </div>
  </template>
  

  
  <style scoped>

  .user-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    
    /* justify-content: center; */
    height: 100%;
    background-color: #f0f2f5;
  }
  
  .page-title {
    color: #1890ff;
    margin: 30px;
    font-size: 32px;
    font-weight: 700;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .info-card {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    padding: 30px;
    width: 700px;
    overflow: hidden;
  }
  
  .avatar-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  }
  
  .user-avatar {
    border: 1px solid #1890ff;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
  
  .user-name {
    color: #333;
    font-size: 24px;
    font-weight: 600;
    margin-top: 15px;
  }
  
  .info-section {
    width: 100%;
  }
  
  .el-form-item {
    font-size: 18px;
    color: #333;
    margin-bottom: 15px;
  }
  
  .info-value {
    color: #333;
    margin-left: 10px;
  }
  </style>