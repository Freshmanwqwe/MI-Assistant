<script setup>
  import DrawingPanel from './components/DrawingPanel.vue';
  import ReportPanel from './components/ReportPanel.vue';

  
</script>

<template>
  <div class="common-layout layout-style">
    <el-container class="layout-style">
      <el-header class="header style-color-2">
          Image Labeling Assistant
      </el-header>
      <el-main class="main-area">
        <el-row :gutter="20" class="main-row">
          <el-col :span="18">
            <DrawingPanel />
          </el-col>
          <el-col :span="6">
            <ReportPanel />
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="footer style-color-2">
        Copyright@TimberZhang@ISCAS-HCI
      </el-footer>
    </el-container>
  </div>

</template>

<style scoped>

.layout-style {
  height: 100%;
}

.header {
  padding: 5px;
  font-size: 32px;
  font-weight: bolder;
}

.footer {
  height: 28px;
}

.main-area {
  padding-top: 0px;
  padding-bottom: 0px;
  height: 80%;
  overflow-y: false;
}

.main-row {
  height: 100%;
}

</style>
