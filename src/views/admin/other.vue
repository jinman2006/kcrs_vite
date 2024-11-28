<script setup>
  import { ref } from "vue"
  import setting from "@/api/setting";

  const validPeriod = ref('')
  const save = () => {
    setting.saveValidPeriod(validPeriod.value).then( res => {
      console.log('valid res',res)
    }).catch( err => { console.log('valid err', err)})
  }

  setting.getValidPeriod().then( res => {
    // console.log('getvalid res',res.data.validperiod)
    validPeriod.value = res.data.validperiod
  }).catch( err => { console.log('getvalid err',err)})
</script>

<template>
   <div class="other-container">
    <h3 style="margin:0 0 20px 20px;">其它设置</h3>
    <div class="other">
      <el-form >
        <el-form-item label="报备有效期">
          <el-input v-model="validPeriod">
            <template #append>天</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div class="btn">  
          <el-button type="primary" @click="save">保存设置</el-button>
      </div>
    </div>

   </div>
</template>

<style lang="scss" scoped>
.other-container{
  width: 100%;
  background-color: #fff;
  border-radius: 10px ;
  padding: 20px;

  box-sizing: border-box;
  .other{
    // box-sizing: border-box;
    width: 50%;
    margin: 20px;
    .btn{
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
    } 
  }
 
}
</style>