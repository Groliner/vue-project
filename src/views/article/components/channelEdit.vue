<script setup>
import { ref } from 'vue'
import {
  articleEditChannelsService,
  articleAddChannelsService
} from '@/api/article'

const dialogVisible = ref(false)
const handleClose = () => {
  dialogVisible.value = false
  formModel.value = {
    cate_name: '',
    cate_alias: ''
  }
  formRef.value.clearValidate()
}

const handleOpen = (row) => {
  dialogVisible.value = true
  console.log(row)
  if (row === undefined) {
    console.log('添加分类')
  } else {
    formModel.value = { ...row }
  }
}
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await articleEditChannelsService(formModel.value)
    ElMessage.success(`edit ${formModel.value.cate_name} successfully!`)
  } else {
    await articleAddChannelsService(formModel.value)
    ElMessage.success(`add ${formModel.value.cate_name} successfully!`)
  }
  handleClose()
  emit('success', isEdit)
}
const emit = defineEmits(['success'])
defineExpose({
  handleOpen
})

const formRef = ref()
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: 'please enter category name', trigger: 'blur' },
    {
      pattern: /^\S{1,20}$/,
      message: 'cate_name must 1 to 20 non-null characters',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: 'please enter category alias', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: 'cate_alias must 1 to 15 non-null characters',
      trigger: 'blur'
    }
  ]
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? 'Edit' : 'Add'"
    :before-close="handleClose"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-position="right"
      label-width="15rem"
    >
      <el-form-item label="category name" prop="cate_name">
        <el-input
          v-model="formModel.cate_name"
          placeholder="please enter category name"
        ></el-input>
      </el-form-item>
      <el-form-item label="category alias" prop="cate_alias">
        <el-input
          v-model="formModel.cate_alias"
          placeholder="please enter category alias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="onSubmit"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped>
.el-form {
  padding: 1rem;
}
</style>
