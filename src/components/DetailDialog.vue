<script setup>
import { inject } from 'vue';

const props = defineProps({
    dialogData:{
        type: Object,
        required: true
    },
    isShowReason:{
        type: Boolean,
        required: true
    }
})

console.log('showreason',props.isShowReason)

const { isShow } = inject('isShow')

const dataType = inject('dataType')//获取数据表的类型，来源表

const emit = defineEmits(['passClick', 'rejectClick', 'resetStatus','delayClick','deleteClick'])
function passClick(data){
    emit('passClick', data)
}
function rejectClick(data){
    emit('rejectClick', data)
}
function resetStatus(data){
    emit('resetStatus', data)
}
function delayClick(data){
    emit('delayClick', data)
}
function deleteClick(data){
    emit('deleteClick', data)
}
</script>

<template>
   <div class="">
        
        <el-dialog v-model="isShow" width='60%'>
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
                    {{ dialogData.date }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>地址</template>
                    {{ dialogData.caddress }}
                </el-descriptions-item>

            </el-descriptions>
            <el-descriptions border direction="vertical" v-show="isShowReason">
                <el-descriptions-item>
                    <template #label>续报原因</template>
                    {{ dialogData.delay_reason }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions
            class="margin-top"
            direction="vertical"
            :column="2"
            border
            >
                <el-descriptions-item>
                        <template #label>状态: 
                            <!-- 这个显示方式，参照前面，后面有更好方法时，会更改 -->
                            <el-text type="info" v-if="dialogData.expire">已过期</el-text>   
                            <el-text v-else-if="dialogData.status == '0'">待审核</el-text>
                            <el-text type="success" v-else-if="dialogData.status == '1'">已通过</el-text>
                            <el-text type="danger" v-else-if="dialogData.status == '2'">已驳回</el-text>
                            <el-text  v-else-if="dialogData.status == '3'">待续审</el-text>
                            <el-text type="success" v-else-if="dialogData.status == '4'">已续期</el-text>
                            <el-text type="danger" v-else-if="dialogData.status == '5'">续驳回</el-text>
                            <el-text type="info" v-else-if="dialogData.status == '9'">已结案</el-text>   

                        </template>
                
                    
                </el-descriptions-item>
                <el-descriptions-item v-if="dialogData.status == '2' || dialogData.status == '5'">
                        <template #label>驳回原因</template>                  
                        {{ dialogData.nopass_reason }}
                </el-descriptions-item>
                <el-descriptions-item v-else-if="dialogData.status == '9'">
                        <template #label>结案原因</template>                  
                        {{ dialogData.close_out }}
                </el-descriptions-item>
            </el-descriptions>
            <el-descriptions border direction="vertical" >
                <el-descriptions-item>
                    <template  #label><el-text v-show="dataType!='sales'">报备公司（ <el-text type="primary"> {{ dialogData.o_company }} {{ dialogData.o_contact }} {{ dialogData.o_tel }}</el-text> ）</el-text></template>
                    <div v-show="isShowReason">
                       续报时间：<el-text type="primary">{{ dialogData.date2 }}</el-text>  续报次数：<el-text type="primary"> {{ dialogData.delay_count }}</el-text>  有效期至：<el-text type="primary">{{ dialogData.validity }}</el-text> 
                    </div>
                    
                </el-descriptions-item>
            </el-descriptions>
            <div class="btn_group" v-show="dataType!='end' && dataType!='sales' ">
                <el-button type="success"  @click="passClick(dialogData)">通过</el-button>
                <el-button type="danger"  @click="rejectClick(dialogData)">驳回</el-button>
                <el-button type="primary" @click="closeClick(dialogData)">结案</el-button>
                <el-button type="info" @click="resetStatus(dialogData)">重置</el-button>
            </div>
            <div class="btn_group" v-show="dataType=='sales'">
                <el-button type="primary" v-show="dialogData.delayenabled" @click="delayClick(dialogData)">续报</el-button>
                <el-button type="danger" @click="deleteClick(dialogData)">删除</el-button>
            </div>

        </el-dialog>    
   </div>
</template>

<style lang="scss" scoped>
</style>