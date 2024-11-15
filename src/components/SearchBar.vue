<script setup>
import { reactive, ref } from 'vue';
import 'element-plus/theme-chalk/display.css'


const searchFormData = ref([])

const searchComb = reactive({
    content:'',
    condition:''
})

const isExpand = ref(false)
const searchBarHeight = ref('60px')

const expandToggle = () => {
    console.log(isExpand.value)
    if(isExpand.value === true){
        isExpand.value = false
        searchBarHeight.value = '60px'
    }else{
        isExpand.value = true
        searchBarHeight.value = '120px'        
    }
    // searchBarHeight.value
    // isExpand.value = !isExpand.value
}



</script>

<template>
   <div class="search-container" >
    <div class="form">
        <el-form :inline="true" :model="searchComb">
            <el-form-item prop="searchContent" label="搜索的内容">
                <el-input></el-input>
            </el-form-item>
            <el-form-item label="条件">
                <el-select
                    v-model="searchComb.condition"
                    placeholder="选择搜索的条件"
                    clearable
                >
                    <el-option label="名称" value="ccompany" />
                    <el-option label="别名" value="cacompany" />
                    <el-option label="电话" value="ctel" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary">搜索</el-button>
            </el-form-item>
        </el-form>
    </div>

   </div>
</template>

<style lang="scss" scoped>
.search-container {
    height: v-bind(searchBarHeight);
    width: 100%;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
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
}
</style>