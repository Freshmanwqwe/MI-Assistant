<script lang="js" setup>

import { ref } from 'vue'
import 'element-plus/theme-chalk/display.css'

const summary_area = ref("")
const scrollbar_max = ref("500px")

</script>

<template>
    <el-col :spam="24" class="style-color-3 report-panel">
        <el-row :spam="24" class="report-items style-color-2">
            <h1>Report Points</h1>
            <el-scrollbar class="scrollbar">
                <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                    {{ item }}
                </p>
            </el-scrollbar>
        </el-row>
        <el-row :spam="24" hidden-sm-only class="report-divider">
        </el-row>
        <el-row :spam="24" class="report-summary style-color-2">
            <h1>Report Summary</h1>
            <el-input
                v-model="summary_area"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 7, maxRows: 7 }"
                placeholder="Waiting for your speaking"
            />
        </el-row>
    </el-col>
</template>
  
<style scoped>

h1 {
    margin: 0px;
}

.report-panel{
    padding-top: 5%;
    padding-bottom: 5%;
    height: 100%;
}

.report-divider {
    height: 5%;
}

.report-items {
    height: 70%;
    border-radius: 2%;
    padding: 20px;
}
.report-items .el-scrollbar {
    width: 100%;
}

.report-summary{
    height: 25%;
    padding: 10px;
    border-radius: 2%;
}

.report-summary .el-input{
    resize: none;
    height: 100%;
}

.scrollbar {
    max-height: v-bind(scrollbar_max);
}

.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
</style>