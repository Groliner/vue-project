import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  articleGetChannelsService,
  articleDelChannelsService,
  articleGetListService,
  articleDelService,
  articleAddService,
  articleGetService,
  articleEditService
} from '@/api/article'

export const useArticleStore = defineStore(
  'big-user-article',
  () => {
    const article = ref([])
    const total = ref(0)
    const params = ref({
      pagenum: 1,
      pagesize: 5,
      cate_id: '',
      state: ''
    })
    const resetParams = () => {
      params.value = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      }
    }
    const getArticleList = async (isEdit) => {
      console.log(params.value)
      if (isEdit === false) {
        params.value.pagenum = Math.ceil(
          (total.value + 1) / params.value.pagesize
        )
      }
      loading.value = true
      const res = await articleGetListService(params.value)
      article.value = res.data.data
      total.value = res.data.total
      loading.value = false
    }
    const delArticle = async (id) => {
      await articleDelService(id)
    }
    const addArticle = async (data) => {
      await articleAddService(data)
    }
    const getArticle = async (id) => {
      loading.value = true
      const res = await articleGetService(id)
      loading.value = false
      return res.data.data
    }
    const editArticle = async (data) => {
      await articleEditService(data)
    }

    const channel = ref([])
    const getChannelList = async () => {
      console.log('获取文章列表')
      loading.value = true
      const res = await articleGetChannelsService()
      channel.value = res.data.data
      loading.value = false
      console.log(res.data)
    }
    const delChannel = async (id) => {
      loading.value = true
      await articleDelChannelsService(id)
      await getChannelList()
      loading.value = false
    }

    const loading = ref(false)

    // 清空参数
    const removeArticleData = () => {
      article.value = []
      channel.value = []
      total.value = 0
      params.value = {
        pagenum: 1,
        pagesize: 5,
        cate_id: '',
        state: ''
      }
    }
    return {
      article,
      total,
      channel,
      params,
      loading,
      getChannelList,
      delChannel,
      getArticleList,
      delArticle,
      resetParams,
      addArticle,
      getArticle,
      editArticle,
      removeArticleData
    }
  },
  {
    persist: true
  }
)
