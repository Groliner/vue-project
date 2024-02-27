<script setup>
import { ref } from 'vue'
import channelSelect from './channelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useArticleStore } from '@/stores'
import { baseURL } from '@/utils/request'
import { convertImageUrlToFile } from '@/utils/convertImageUrlToFile'

const articleStore = useArticleStore()
const defaultModel = {
  title: '',
  cate_id: '',
  cover_img: '',
  content: '',
  state: ''
}
const formModel = ref({
  ...defaultModel
})
const visibleDrawer = ref(false)

//打开编辑页面 编辑 / 添加
const handleOpen = async (row) => {
  const isEdit = row.id
  if (isEdit) {
    console.log('编辑')
    formModel.value = await articleStore.getArticle(isEdit)
    visibleDrawer.value = true
    imgUrl.value = baseURL + formModel.value.cover_img
  } else {
    visibleDrawer.value = true
    console.log('添加')
    formModel.value = { ...defaultModel }
    imgUrl.value = ''
    editorRef.value.setHTML('')
  }
}
defineExpose({
  handleOpen
})

const editorRef = ref()
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  const imgFile = uploadFile.raw
  imgUrl.value = URL.createObjectURL(imgFile)
  formModel.value.cover_img = imgFile
}

//提交文章 编辑 / 添加
const onPublish = async (state) => {
  formModel.value.state = state
  const formData = new FormData()
  for (let key in formModel.value) {
    formData.append(key, formModel.value[key])
  }
  const isEdit = formModel.value.id ? true : false
  if (isEdit) {
    const file = await convertImageUrlToFile(imgUrl.value, 'cover_img')
    formData.append('cover_img', file)
    await articleStore.editArticle(formData)
    ElMessage.success('edit article successfully!')
  } else {
    await articleStore.addArticle(formData)
    ElMessage.success('add article successfully!')
  }
  visibleDrawer.value = false
  articleStore.getArticleList(isEdit)
}
</script>
<template>
  <el-drawer
    v-model="visibleDrawer"
    :title="formModel.id ? '编辑文章' : '添加文章'"
    size="51%"
  >
    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channelSelect v-model="formModel.cate_id" width="100%"></channelSelect>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onUploadFile"
        >
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <QuillEditor
            ref="editorRef"
            v-model:content="formModel.content"
            content-type="html"
            theme="snow"
          ></QuillEditor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button @click="onPublish('已发布')" type="primary">发布</el-button>
        <el-button @click="onPublish('草稿')" type="info">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.editor {
  width: 90%;
  :deep(.ql-editor) {
    min-height: 19rem;
  }
}
</style>
