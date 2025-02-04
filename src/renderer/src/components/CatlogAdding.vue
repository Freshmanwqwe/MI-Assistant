<script setup>
  import ChatAssis from "./CatlogAdding/ChatAssis.vue";
  import PointsTable from "./CatlogAdding/PointsTable.vue";
</script>

<template>
  <el-col :span="24" class="style-color-1">
    <el-row :span="24" justify="center" >
      <ChatAssis />
    </el-row>
    <el-row :span="24" justify="center">
      <PointsTable />
    </el-row>
  </el-col>
</template>

<style scoped>
</style>