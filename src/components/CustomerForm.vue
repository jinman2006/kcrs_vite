<script setup>
import { reactive, ref, inject } from 'vue'
// 二选一
// import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data';
import { pcTextArr } from 'element-china-area-data'
import sales from '@/api/sales';
import { ElMessage } from 'element-plus';

// 客户表数据初始化
const customerInfo = reactive({
  area: [],
  ccompany: '',
  cacompany: '',
  ccontact: '',
  ctel: '',
  cdept: '',
  cmodel:'',
  cproduct: '',
  cworkp: '',
  caddress:''
})

const successList = inject('successList')//注入报备成功的数据列表

const addCustomerRules = {
    area:[
        {required: true, message: '请选择客户区域', trigger: 'change'}
    ],
    ccompany:[
        {required: true, message: '请填写客户名称', trigger: 'blur'}
    ],
    ccontact:[
        {required: true, message: '请填写客户联系人', trigger: 'blur'}
    ],
    ctel:[
        {required: true, message: '请填写联系方式', trigger: 'blur'}
    ],
    cmodel:[
        {required: true, message: '请填写机型数量', trigger: 'blur'}
    ],
    caddress:[
        {required: true, message: '请填写客户地址', trigger: 'blur'}
    ] 
}
const customerInfoRef  = ref()
const handleSubmit = () => {
    customerInfoRef.value.validate((valid,field) => {
        if(!valid){ //验证失败
            return 
        }
        sales.addCustomer(customerInfo).then( res => {
            console.log('addcustomer res',res)
            if(res.success){
                ElMessage.success(res.message)
                successList.value.push(JSON.parse(JSON.stringify(customerInfo)))
                customerInfoRef.value.resetFields()
                console.log('successlist',successList.value)
            }else{
                ElMessage.error(res.message)
            }
        }).catch(err => {
            console.log('addcustomer err', err)
            ElMessage.error(err)
        })
    })
}

const handleChange = (v) => {
    console.log(v)
}
</script>

<template>
   <div class="">
    <el-form ref="customerInfoRef" :model="customerInfo" label-width="auto" style="max-width: 700px" :rules="addCustomerRules">
                <el-form-item label="客户区域" prop="area">
                    <!-- <el-input v-model="customerInfo.area"></el-input> -->
                     <el-cascader
                        placeholder="请选择客户所在区域"
                        :filterable="true"
                        :options="pcTextArr"
                        v-model="customerInfo.area"
                        @change="handleChange"
                        style="width: 100%;"
                     >
                     </el-cascader>
                </el-form-item>
                <el-form-item >
                    <el-col :span="12">
                        <el-form-item label="客户名称" prop="ccompany">
                            <el-input v-model="customerInfo.ccompany" placeholder="填写客户名称"></el-input>
                        </el-form-item>
                    </el-col>
      
                    <el-col :span="12">
                        <el-form-item label="别名" prop="cacompany">
                            <el-input v-model="customerInfo.cacompany" placeholder="填写客户别名(选填)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="12">
                        <el-form-item label="联系人" prop="ccontact">
                            <el-input v-model="customerInfo.ccontact" placeholder="填写客户联系人"></el-input>
                        </el-form-item>
                    </el-col>
      
                    <el-col :span="12">
                        <el-form-item label="电话" prop="ctel">
                            <el-input v-model="customerInfo.ctel" placeholder="填写客户联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="12">
                        <el-form-item label="职位" prop="cdept">
                            <el-input v-model="customerInfo.cdept" placeholder="填写联系人职位(选填)"></el-input>
                        </el-form-item>
                    </el-col>
      
                    <el-col :span="12">
                        <el-form-item label="产品" prop="cproduct">
                            <el-input v-model="customerInfo.cproduct" placeholder="填写客户生产的产品(选填)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item  >
                    <el-col :span="12">
                        <el-form-item label="机型*数量" prop="cmodel">
                            <el-input v-model="customerInfo.cmodel" placeholder="填写意向机型及数量"></el-input>
                        </el-form-item>
                    </el-col>
      
                    <el-col :span="12">
                        <el-form-item label="工件" prop="cworkp">
                            <el-input v-model="customerInfo.cworkp" placeholder="填写客户加工的工件(选填)"></el-input>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="客户地址" prop="caddress">
                    <el-input v-model="customerInfo.caddress" placeholder="填写客户的具体地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                </el-form-item>
            </el-form>     
   </div>
</template>

<style scoped>
</style>