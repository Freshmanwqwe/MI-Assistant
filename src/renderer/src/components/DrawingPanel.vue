<script setup>
  import DrawPanel from "./DrawingPanel/DrawPanel.vue";
  import ControlPanel from "./DrawingPanel/ControlPanle.vue"
</script>

<template>
  <el-col :span="24">
    <DrawPanel />
    <ControlPanel />
  </el-col>
</template>

<style scoped>
</style>