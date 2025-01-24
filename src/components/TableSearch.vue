<script setup>
import { reactive, ref, inject } from 'vue';
import { ElMessage } from 'element-plus';
import customer from '@/api/customer';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    dataType:{
        type:String,
        required:true
    },
    conditions:{
        type:Array,
        required:true
    }
})

const searchFormRef = ref()

const search_scope = ref('this')


// 搜索数据
const searchComb = reactive({
    content:'',
    condition:''
})

const tableData = inject('tableData')//注入父组件提供的数据
const { paginationShow } = inject('pagination')//注入分页

// 搜索验证规则
const searchRules = {
    content:[
        {required: true, message: '请输入搜索内容', trigger: 'blur'}
    ],
    condition:[
        {required: true, message:'请选择搜索条件', trigger:'change'}
    ]
}

const handleSearch = () => {
    searchFormRef.value.validate((valid,field) => {
        console.log(valid,field)
        if(!valid){
            ElMessage.error('搜索信息不完整')
            return
        }
        console.log('searchscope',search_scope.value)
        // console.log('datatype',props.dataType)
        customer.search(searchComb.content,searchComb.condition, props.dataType, search_scope.value)
        .then(res => {
            // paginationShow.value = false
            console.log('searchtable res', res)
            if(res.success && res.code == 200){
                tableData.value = res.data
                paginationShow.value = false                
            }else if(res.code == 408){//token过期，
                ElMessage.error(res.message)
                router.push("/login")
            }

        }).catch( err => {
            console.log('firstlist err', err)
        })
    })
}
</script>

<template>
    <div class="form">
        <el-form 
        :inline="true" 
        :model="searchComb" 
        ref="searchFormRef" 
        :rules="searchRules"
        hide-required-asterisk
        >
            <el-form-item prop="content" label="搜索的内容" >
                <el-input v-model="searchComb.content" style="width: 130px;"></el-input>
            </el-form-item>
            <el-form-item label="条件" prop="condition">
                <el-select
                    v-model="searchComb.condition"
                    placeholder="查询条件"
                    clearable
                    style="width: 130px;"
                >
                    <el-option v-for="item in conditions" :key="item.key" :label="item.optionName" :value="item.key" />
                </el-select>
            </el-form-item>
            <el-form-item v-show="dataType!='sales'">
                <el-radio-group v-model="search_scope">
                    <el-radio value="this" size="small">本表</el-radio>
                    <el-radio value="all" size="small">全表</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleSearch">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
    .form{
        overflow: hidden;
   
        .el-form-item{
            margin: 0 20px;

        }
        .el-select{
            --el-select-width: 220px;
        }
        .btn{
            display: flex;
            justify-content: flex-end;
            .expand{
                margin-left: 5px;
                font-size: 12px;
                color: #409EFF;
                cursor: pointer;
            }
        }

    }
</style>