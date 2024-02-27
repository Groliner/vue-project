<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, useArticleStore } from '@/stores'
import { userUpdatePasswordService } from '@/api/user'

const userStore = useUserStore()
const articleStore = useArticleStore()
const rules = {
  oldPassword: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度在 6 到 15 个非空字符',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码长度在 6 到 15 个非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== form.value.newPassword) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const form = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: ''
})
const formRef = ref()
const onSubmit = async () => {
  await formRef.value.validate()
  console.log(form.value)
  await userUpdatePasswordService(form.value)
  ElMessage.success('密码修改成功')

  // 退出登录
  userStore.removeToken()
  userStore.setUser({})
  articleStore.removeArticleData()
  // 返回登录页面
  const router = useRouter()
  router.push('/login')
}
const reset = () => {
  formRef.value.resetFields()
}
</script>
<template>
  <pageContainer title="修改密码">
    <template v-slot:extra>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </template>
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-position="left"
      label-width="8rem"
    >
      <el-form-item label="原密码" prop="old_pwd">
        <el-input v-model="form.old_pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="new_pwd">
        <el-input v-model="form.new_pwd" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_pwd">
        <el-input v-model="form.re_pwd" show-password></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="reset">重置</el-button>
  </pageContainer>
</template>
<style lang="scss" scoped>
.el-form {
  width: 32rem;
}
</style>
