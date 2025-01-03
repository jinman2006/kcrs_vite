<script setup>
import { provide, reactive, ref } from 'vue';
import 'element-plus/theme-chalk/display.css'
import  customer from '@/api/customer.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import TableList from '@/components/TableList.vue';
import TableSearch from '@/components/TableSearch.vue';

// 搜索数据
const searchComb = reactive({
    content:'',
    condition:''
})

const dataType = ref('first')
provide('dataType',dataType)

const searchBarHeight = ref('60px')
const searchFormRef = ref()

// 列表数据
const tableData = ref([])
provide('tableData',tableData)

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const tableColumnArr = ref([
    {colName:'区域',key:'provinces',width:60},
    {colName:'名称',key:'ccompany',minwidth:150},
    {colName:'联系人',key:'ccontact'},
    {colName:'电话',key:'ctel'},
    {colName:'报备公司',key:'o_company'},
    {colName:'机型',key:'cmodel'},
])

const paginationShow = ref(true)

provide('pagination',{
    currentPage,
    pageSize,
    paginationShow
})





// 搜索验证规则
const searchRules = {
    content:[
        {required: true, message: '请输入搜索内容', trigger: 'blur'}
    ],
    condition:[
        {required: true, message:'请选择搜索条件', trigger:'change'}
    ]
}

// 获取客户数据
customer.getCustomerData(currentPage.value, pageSize.value, dataType.value).then( res => {
   console.log('home',res.data)
   tableData.value = res.data
   total.value = res.total
}).catch( err => {
   console.log('home', err)
})


// 审批操作
const passClick = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('-1 2-'.indexOf(row.status) !== -1){
        ElMessage.error('已审批，请勿重复操作')
        return 
    }
    ElMessageBox.confirm(
        '确认通过这条信息吗？',
        '操作提醒',
        {
            confirmButtonText:'确认通过',
            cancelButtonText:'取消操作',
            type: 'warning'
        }
    ).then(() => {
        
        // console.log('dialogdata',firstReportingData.value)
        
        customer.approveCustomer(row.id, 'passed').then((res) => {
            if(res.success){
                ElMessage.success(res.message)
             
                row.status='passed'
            }else{
                ElMessage.error(res.message)
                return
            }
        }).catch(err => {
            ElMessage.error(err)
            // console.log('tablelist err',err)
        })
    }).catch(() => {
        console.log('取消')
    })
}

const rejectClick = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('-1 2-'.indexOf(row.status) !== -1){
        ElMessage.error('已审批，请勿重复操作')
        return 
    }
    ElMessageBox.prompt(
        '请输入驳回的原因',
        '驳回原因',
        {
            confirmButtonText:'确认驳回',
            cancelButtonText:'取消操作',
            inputPattern:/^.+$/,
            inputErrorMessage:'原因不能为空'
        }
    ).then(({value}) => {
        console.log('value',value)
        customer.approveCustomer(row.id, 'failed', value).then((res) => {
            if(res.success){
                ElMessage.success(res.message)
                row.status='failed'
            }else{
                ElMessage.error(res.message)
                return
            }
        }).catch(err => {
            ElMessage.error(err)
            // console.log('tablelist err',err)
        })        
    })    
}

const resetStatus = (row) => {
    // 已经审批通过或驳回的，避免二次操作
    if('-0-'.indexOf(row.status) !== -1){
        ElMessage.error('初始状态，无法重置')
        return 
    }  
    ElMessageBox.confirm(
        '重置后，本条将回到待审核状态，确认重置这条信息吗？',
        '操作提醒',
        {
            confirmButtonText:'确认重置',
            cancelButtonText:'取消操作',
            type: 'warning'
        }
    ).then(() => {
        customer.resetStatus(row.id).then( res => {
            console.log('rest res',res)
            if(res.success){
                ElMessage.success(res.message)
                row.status='pending'
            }else{
                ElMessage.error(res.message)
                return
            }
        })
    }).catch( err => {
        // console.log('rest err',err)
        ElMessage.error(err)
    }) 
}

// 修改分页大小
const handleSizeChange = (val) => {
  console.log(`${val} items per page`)
  pageSize.value = val
  
  customer.getCustomerData(currentPage.value, val, dataType.value).then( res => {
   tableData.value = res.data
    }).catch( err => {
        console.log('home', err)
    }) 
}
// 分页，更改当前页
const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)
  customer.getCustomerData(val, pageSize.value, dataType.value).then( res => {
   tableData.value = res.data
    }).catch( err => {
        console.log('home', err)
    })  
}


const handleSearch = () => {
    searchFormRef.value.validate((valid,field) => {
        console.log(valid,field)
        if(!valid){
            ElMessage.error('搜索信息不完整')
            return
        }
        customer.search(searchComb.content,searchComb.condition, dataType.value)
        .then(res => {
            paginationShow.value = false
            console.log('firstlist res', res)
            tableData.value = res.data
        }).catch( err => {
            console.log('firstlist err', err)
        })
    })

}
</script>

<template>
   <div class="search-container" >
        <table-search
        :dataType="dataType"
        ></table-search>
        <!-- <div class="form">
            <el-form 
            :inline="true" 
            :model="searchComb" 
            ref="searchFormRef" 
            :rules="searchRules"
            hide-required-asterisk
            >
                <el-form-item prop="content" label="搜索的内容" >
                    <el-input v-model="searchComb.content"></el-input>
                </el-form-item>
                <el-form-item label="条件" prop="condition">
                    <el-select
                        v-model="searchComb.condition"
                        placeholder="选择搜索的条件"
                        clearable
                    >
                        <el-option label="名称" value="ccompany" />
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>
            </el-form>
        </div> -->
   </div>
   <table-list 
   :paginationShow="paginationShow"
   :total="total"
   :tableColumnArr="tableColumnArr"
   @passClick="passClick"
   @rejectClick="rejectClick"
   @resetStatus="resetStatus"
   @handleSizeChange="handleSizeChange"
   @handleCurrentChange="handleCurrentChange"
   ></table-list>
       
</template>

<style lang="scss" scoped>
@use "@/styles/admin/customer.scss";
.search-container {
    height: v-bind(searchBarHeight);
}
</style>