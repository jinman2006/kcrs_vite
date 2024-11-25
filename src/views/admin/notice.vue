<script setup>
  import { ref, provide } from "vue"
  import BasicEditor from "@/components/BasicEditor.vue";
  import setting from "@/api/setting";
  import customer from "@/api/customer";

  const EditorValue = ref()
  const saveEditor = () => {
    // EditorValue.value.valueHtml
    // console.log(EditorValue.value.valueHtml)
    setting.saveNotice(EditorValue.value.valueHtml).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
   
   
  }

  // 需要读取原来的公告通知内容值
  const valueHtml = ref('<p><u><em><strong>ddddd</strong></em></u></p>')
  // 将这个值通过依赖注入提供给子组件
  provide('noticeValue',{
    valueHtml
  })


</script>

<template>
   <div class="editor-container">
      <basic-editor ref="EditorValue"></basic-editor>
      <div class="btn">
        <el-button type="primary" @click="saveEditor">保存</el-button>
        
      </div>
   </div>
</template>

<style lang="scss" scoped>
.editor-container{
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  .btn{
    margin-top: 20px;
  }
}
</style>