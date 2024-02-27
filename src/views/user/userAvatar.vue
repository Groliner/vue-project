<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { Plus } from '@element-plus/icons-vue'
import { userUpdateAvatarService } from '@/api/user'

const userStore = useUserStore()
const uploadRef = ref()
const imgUrl = ref(userStore.user.user_pic)
const onSelectFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const onSubmit = async () => {
  await userUpdateAvatarService(imgUrl.value)
  await userStore.getUser()
  ElMessage.success('头像修改成功')
}
</script>
<template>
  <pageContainer title="更换头像">
    <template v-slot:extra>
      <el-button type="primary" @click="onSubmit">确认修改</el-button>
    </template>
    <div class="uploadIMG">
      <el-upload
        ref="uploadRef"
        :auto-upload="false"
        class="avatar-uploader"
        :show-file-list="false"
        :on-change="onSelectFile"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <el-button
        type="primary"
        :icon="Plus"
        @click="uploadRef.$el.querySelector('input').click()"
        >更换头像</el-button
      >
    </div>
  </pageContainer>
</template>
<style lang="scss" scoped>
.uploadIMG {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  .avatar {
    object-fit: cover;
  }
}
</style>
