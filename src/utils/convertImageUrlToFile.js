import axios from 'axios'

export const convertImageUrlToFile = async (imageUrl, filename) => {
  try {
    // 使用 axios 获取图片数据
    const response = await axios.get(imageUrl, { responseType: 'blob' })
    const imageBlob = response.data

    // 创建 File 对象
    const imageFile = new File([imageBlob], filename, { type: imageBlob.type })
    console.log(imageFile)
    return imageFile
  } catch (error) {
    console.error('Error converting image URL to file:', error)
    throw error // 抛出错误以便调用者处理
  }
}
