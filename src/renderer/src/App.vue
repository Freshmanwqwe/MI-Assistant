<script setup>
  import DrawingPanel from './components/DrawingPanel.vue';
  import ReportPanel from './components/ReportPanel.vue';

  
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="header">
        <h1>
          Image Labeling Assistant
        </h1>
      </el-header>
      <el-main class="main-area">
        <el-row>
          <el-col :span="18">
            <DrawingPanel />
          </el-col>
          <el-col :span="6">
            <ReportPanel />
          </el-col>
        </el-row>
      </el-main>
      <el-footer class="footer">
        Copyright@TimberZhang@ISCAS-HCI
      </el-footer>
    </el-container>
  </div>

</template>

<style scoped>

h1 {
  font-weight: bold;
  font-size: 32px;
}

.header{
  height: 10%;
  border-radius: 1%;
  background-color: rgba(114, 243, 153, 0.65);
}

.footer {
  height: 5%;
  bottom: 0;
}

.main-area {
  height: 85%;
  overflow-y: false;
}

</style>
