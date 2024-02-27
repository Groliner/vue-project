import request from '@/utils/request'

export const articleGetChannelsService = () => request.get('/my/cate/list')

export const articleAddChannelsService = (data) =>
  request.post('/my/cate/add', data)

export const articleEditChannelsService = (data) =>
  request.put('/my/cate/info', data)

export const articleDelChannelsService = (id) =>
  request.delete('/my/cate/del', { params: { id } })

export const articleGetListService = (params) =>
  request.get('/my/article/list', { params })

export const articleDelService = (id) =>
  request.delete('my/article/info', { params: { id } })

export const articleAddService = (data) => request.post('/my/article/add', data)

export const articleGetService = (id) =>
  request.get('my/article/info', { params: { id } })

export const articleEditService = (data) =>
  request.put('/my/article/info', data)
