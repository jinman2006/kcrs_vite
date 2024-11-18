<script setup>

const props = defineProps({
    dialogData:{
        type: Object,
        required: true
    },
    isShow:{
        type: Boolean,
        required: true
    }
})
</script>

<template>
   <div class="">
        <el-dialog v-model="props.isShow" width='60%'>
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
                        <!-- 这个显示方式，参照前面，后面有更好方法时，会更改 -->
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

        </el-dialog>    
   </div>
</template>

<style lang="scss" scoped>
</style>