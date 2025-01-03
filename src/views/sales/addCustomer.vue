<script setup>
import { provide, ref } from 'vue'
import CustomerForm from '@/components/CustomerForm.vue';


const successList = ref([])//报备成功数据
provide('successList',successList)

</script>

<template>
   <div class="add-container">
        <div class="add-form">
            <customer-form></customer-form>
            <div class="sucessList">
                <!-- <el-text v-for="item in successList.value" :key="item.id">{{item.ccompany}}</el-text> -->
                 <!-- <el-card v-for="item in successList" :key="item.ctel" style="max-width: 700px" shadow="always">
                    {{ item.ccompany }}
                 </el-card> -->
                 <ul  class="infinite-list" style="overflow: auto">
                    <li v-for="item in successList" :key="item.ctel" class="infinite-list-item">
                        {{ item.ccompany }}
                        （报备成功）
                    </li>
                </ul>
            </div>           
        </div>

   </div>

</template>

<style lang="scss" scoped>
.add-container{
    height: 100%;
    .add-form{
        // height: calc(100% - 70px);
        height: 100%;
        width: 100%;
        border-radius: 10px;
        background-color: #fff;
        box-sizing: border-box;
        padding: 20px;
        .sucessList{
            // background-color: red;
            height: 100px;
            .infinite-list {
                max-width: 700px;
                height: 300px;
                padding: 0;
                margin: 0;
                list-style: none;
            }
            .infinite-list .infinite-list-item {
                display: flex;
                align-items: center;
                // justify-content: center;
                height: 50px;
                background: var(--el-color-success-light-9);
                padding: 0 10px;
                margin-bottom: 10px;
                color: var(--el-color-success);
            }
            .infinite-list .infinite-list-item + .list-item {
                margin-top: 10px;
            }            
        }
    }

}
</style>