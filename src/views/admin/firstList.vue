<script setup>
import { computed, reactive, ref } from 'vue';
import 'element-plus/theme-chalk/display.css'
import  customer from '@/api/customer.js'
import { ElMessage, ElMessageBox } from 'element-plus';
import TableList from '@/components/TableList.vue';

// 搜索数据
const searchComb = reactive({
    content:'',
    condition:''
})
const searchBarHeight = ref('60px')
const searchFormRef = ref()

// 列表数据
const firstReportingData = ref([])

// 分页数据
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const paginationShow = ref(true)



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
customer.getCustomerData(currentPage.value, pageSize.value).then( res => {
   console.log('home',res.data)
   firstReportingData.value = res.data
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

// // 修改分页大小
// const handleSizeChange = (val) => {
//   console.log(`${val} items per page`)
//   pageSize.value = val
//   currentPage.value = 1
//   customer.getCustomerData(currentPage.value, val).then( res => {
//    firstReportingData.value = res.data
//     }).catch( err => {
//         console.log('home', err)
//     }) 
// }
// // 分页，更改当前页
// const handleCurrentChange = (val) => {
//   console.log(`current page: ${val}`)
//   customer.getCustomerData(val, pageSize.value).then( res => {
//    firstReportingData.value = res.data
//     }).catch( err => {
//         console.log('home', err)
//     })  
// }


const handleSearch = () => {
    searchFormRef.value.validate((valid,field) => {
        console.log(valid,field)
        if(!valid){
            ElMessage.error('搜索信息不完整')
        }
        customer.search(searchComb.content,searchComb.condition)
        .then(res => {
            paginationShow.value = false
            console.log('firstlist res', res)
            firstReportingData.value = res.data
        }).catch( err => {
            console.log('firstlist err', err)
        })
    })

}
</script>

<template>
   <div class="search-container" >
        <div class="form">
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
        </div>
   </div>
   <table-list 
   :firstReportingData ="firstReportingData" 
   :paginationShow="paginationShow"
   :total="total"
   :currentPage="currentPage"
   :pageSize="pageSize"
   @passClick="passClick"
   @rejectClick="rejectClick"
   @resetStatus="resetStatus"
   ></table-list>
    <!--<div class="_table">
       <el-table 
            :data="firstReportingData" 
            border 
            style="width: 98%;"
            @cell-click="cellClick"
            :cell-style = "mousePointer"
        >
          <el-table-column prop="provinces" width="60" label="区域" show-overflow-tooltip/>
          <el-table-column prop="ccompany" min-width="150" label="名称" show-overflow-tooltip />
          <el-table-column prop="ccontact" label="联系人" />
          <el-table-column prop="ctel" label="电话" show-overflow-tooltip />
          <el-table-column prop="cdept" label="职位" width="80" show-overflow-tooltip/>
          <el-table-column prop="cmodel" label="机型" show-overflow-tooltip />
          
          <el-table-column prop="status" label="状态" >

             状态以标签显示的这种方式，修改时会有明显动作，再没有找到合适解决办法前选用v-if 
            <template #default="{row}">
              <el-tag v-if="row.status === '0'">待审核</el-tag>
              <el-tag type="success" v-else-if="row.status === '1'">已通过</el-tag>
              <el-tag type="danger" v-else>已驳回</el-tag>        
            </template>

          </el-table-column>
          <el-table-column  label="快捷操作" fixed="right" min-width="100">
             <template #default="{row}">
                <el-button link type="primary" size="small" @click="passClick(row)">通过</el-button>
                <el-button link type="primary" size="small" @click="rejectClick(row)">驳回</el-button>
             </template>
          </el-table-column>
       </el-table>
       <div class="pagination-container" v-show="paginationShow">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 30]"
                :size="size"
                :disabled="disabled"
                :background="background"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>      
    </div> -->




    <!-- <el-dialog v-model="isShow" width='60%'>
        <el-descriptions
            :column="2"
            border
        >
            <el-descriptions-item :span="2">
                <template #label>区域</template>
                {{ dialogData.provinces }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
                <template #label>客户名称</template>
                {{ dialogData.ccompany }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>别名</template>
                {{ dialogData.cacompany }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>机型</template>
                {{ dialogData.cmodel }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>联系人</template>
                {{ dialogData.ccontact }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>电话</template>
                {{ dialogData.ctel }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>职位</template>
                {{ dialogData.cdept }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>报备时间</template>
                {{ dialogData.date2 }}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>地址</template>
                {{ dialogData.caddresss }}
            </el-descriptions-item>
        </el-descriptions>

        <el-descriptions
        class="margin-top"
        direction="vertical"
        :column="2"
        border
        >
            <el-descriptions-item>
                    <template #label>状态</template>
                     这个显示方式，参照前面，后面有更好方法时，会更改 
                    <el-tag v-if="dialogData.status === '0'">待审核</el-tag>
                    <el-tag type="success" v-else-if="dialogData.status === '1'">已通过</el-tag>
                    <el-tag type="danger" v-else>已驳回</el-tag>                       
                  
            </el-descriptions-item>
            <el-descriptions-item v-if="dialogData.status === '2'">
                    <template #label>驳回原因</template>                  
                    {{ dialogData.nopass_reason }}
            </el-descriptions-item>

        </el-descriptions>
        <div class="btn_group">
            <el-button type="success"  @click="passClick(dialogData)">通过</el-button>
            <el-button type="danger"  @click="rejectClick(dialogData)">驳回</el-button>
            <el-button type="primary">结案</el-button>
            <el-button type="info" @click="resetStatus(dialogData)">重置</el-button>
        </div>

    </el-dialog> -->
       
</template>

<style lang="scss" scoped>
@use "@/styles/admin/customer.scss";
.search-container {
    height: v-bind(searchBarHeight);
}
</style>