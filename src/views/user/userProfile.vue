<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userEditInfoService } from '@/api/user'

const userStore = useUserStore()
const userProfile = ref(userStore.user)

const onSubmit = async () => {
  console.log('编辑')
  await userProfileForm.value.validate()
  await userEditInfoService(userProfile.value)
  userStore.getUser()
  ElMessage.success('修改成功')
}

const rules = {
  nickname: [
    { required: true, message: '请输入名称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '名称必须是2-10个非空字符',
      trigger: 'blur'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    {
      pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      type: 'email',
      message: '请输入正确的邮箱地址',
      trigger: ['blur', 'change']
    }
  ]
}
const userProfileForm = ref()
</script>
<template>
  <pageContainer title="基本资料">
    <template v-slot:extra>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </template>
    <el-form
      :model="userProfile"
      label-width="6rem"
      class="user-profile-form"
      :rules="rules"
      ref="userProfileForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="userProfile.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="nickname">
        <el-input v-model="userProfile.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userProfile.email"></el-input>
      </el-form-item>
    </el-form>
  </pageContainer>
</template>
