<script setup>
import { useArticleStore } from '@/stores'

const articleStore = useArticleStore()

defineProps({
  cid: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})
const emit = defineEmits(['update:cid'])
</script>

<template>
  <el-select
    :modelValue="cid"
    @update:modelValue="emit('update:cid', $event)"
    :style="width"
  >
    <el-option
      v-for="channel in articleStore.channel"
      :label="channel.cate_name"
      :key="channel.id"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
