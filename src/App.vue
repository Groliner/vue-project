<script setup>
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
</script>
<template>
  <div>
    <el-config-provider :locale="zh">
      <!-- 路由出口 -->
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>
<style scoped lang="scss"></style>
