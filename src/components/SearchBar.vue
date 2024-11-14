<script setup>
import { reactive, ref } from 'vue';
import 'element-plus/theme-chalk/display.css'


const searchFormData = ref([])

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
        <el-form :inline="true" :model="searchFormData">
            <el-row>
                <el-col :span="8" :xs="12">
                    <el-form-item label="名称">
                       <el-input style="min-width: 240px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :xs="12">
                    <el-form-item label="电话">
                        <el-input style="min-width: 240px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8" :xs="12" v-show="isExpand">
                    <el-form-item label="地址" >
                         <el-input style="min-width: 240px;" ></el-input>
                    </el-form-item>                    
                </el-col>
                <el-col :span="8" :xs="12" class="btn" v-show="!isExpand">
                    <el-form-item >
                        <el-button type="primary">查询</el-button>
                        <span class="expand" @click="expandToggle">
                            展开
                            <el-icon><ArrowDownBold /></el-icon>
                        </span>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row v-show="isExpand" style="margin-top: 20px;">
                <el-col :span="8"></el-col>
                <el-col :span="8"></el-col>
                <el-col :span="8" class="btn" >
                    <el-form-item >
                        <el-button type="primary">查询</el-button>
                        <span class="expand" @click="expandToggle">
                            收起
                            <el-icon><ArrowUpBold /></el-icon>
                        </span>
                    </el-form-item>                    
                </el-col>
            </el-row>



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
        width: 100%;
        .el-form-item{
            margin: 0 20px;
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