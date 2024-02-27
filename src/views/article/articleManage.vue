<script setup>
import { onMounted, ref } from 'vue'
import { useArticleStore } from '@/stores'
import { Edit, Delete } from '@element-plus/icons-vue'
import channelSelect from './components/channelSelect.vue'
import { formatTime } from '@/utils/timeFormat'
import articleEdit from './components/articleEdit.vue'

const articleStore = useArticleStore()

const onEditArticle = (row) => {
  console.log(row)
  articleEditRef.value.handleOpen(row)
}

const handleSizeChange = (size) => {
  articleStore.params.pagenum = 1
  articleStore.params.pagesize = size
  articleStore.getArticleList()
}
const handleCurrentChange = (page) => {
  articleStore.params.pagenum = page
  articleStore.getArticleList()
}
const handleSearch = () => {
  articleStore.params.pagenum = 1
  articleStore.getArticleList()
}

onMounted(() => {
  articleStore.getArticleList(true)
})

// 抽屉
const articleEditRef = ref()
const handleAddArticle = () => {
  articleEditRef.value.handleOpen({})
}
</script>
<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" plain @click="handleAddArticle"
        >添加文章</el-button
      >
    </template>
    <el-form inline>
      <el-form-item label="文章分类:" style="width: 25%">
        <channelSelect
          v-model:cid="articleStore.params.cate_id"
        ></channelSelect>
      </el-form-item>
      <el-form-item label="发布状态:" style="width: 25%">
        <el-select v-model="articleStore.params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">search</el-button>
        <el-button @click="articleStore.resetParams">reset</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据表格 -->
    <el-table
      :data="articleStore.article"
      v-loading="articleStore.loading"
      table-layout="auto"
      style="width: 100%"
    >
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            :icon="Edit"
            circle
            plain
            type="primary"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            :icon="Delete"
            circle
            plain
            type="danger"
            @click="articleStore.delArticle(row.id)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="articleStore.params.pagenum"
        v-model:page-size="articleStore.params.pagesize"
        :page-sizes="[3, 4, 5, 7, 9]"
        :background="true"
        layout="jumper, total, sizes, prev, pager, next"
        :total="articleStore.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <!-- 抽屉 -->
    <articleEdit ref="articleEditRef"></articleEdit>
  </page-container>
</template>
<style lang="scss" scoped>
.pagination-container {
  display: flex;
  justify-content: end;
  margin-top: 1rem;
}
</style>
