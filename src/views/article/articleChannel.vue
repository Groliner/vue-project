<script setup>
import { onMounted, ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelEdit from './components/channelEdit.vue'
import { useArticleStore } from '@/stores'

const dialog = ref()
const articleStore = useArticleStore()
onMounted(() => {
  articleStore.getChannelList()
})

const onEditChannel = (row) => {
  dialog.value.handleOpen(row)
}
const onAddChannel = () => {
  dialog.value.handleOpen()
}
const onDelChannel = async (row) => {
  console.log(row)
  await ElMessageBox.confirm(
    `Are you sure to del ${row.cate_name} ?`,
    'Warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(async () => {
      await articleStore.delChannel(row.id)
      ElMessage.success(`del ${row.cate_name} successfully!`)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>
<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" plain @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table
      :data="articleStore.channel"
      v-loading="articleStore.loading"
      style="width: 100%"
    >
      <el-table-column label="序号" width="100" type="index"></el-table-column>
      <el-table-column label="分类名称" prop="cate_name"></el-table-column>
      <el-table-column label="分类别名" prop="cate_alias"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditChannel(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="onDelChannel(row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <channelEdit
      ref="dialog"
      @success="articleStore.getChannelList"
    ></channelEdit>
  </page-container>
</template>
<style lang="scss" scoped></style>
