<script lang="ts" setup>
import { ref } from 'vue'
const count = ref(3)
const summary_area = ref("")

const add = () => {
  count.value++
}
const onDelete = () => {
  if (count.value > 0) {
    count.value--
  }
}
</script>

<template>
    <el-col :spam="24">
        <el-row :spam="24" class="report-items">
            <el-scrollbar max-height="400px">
                <p v-for="item in count" :key="item" class="scrollbar-demo-item">
                    {{ item }}
                </p>
            </el-scrollbar>
        </el-row>
        <el-row :spam="24" class="report-summary">
            <el-input
                v-model="summary_area"
                type="textarea"
                resize="none"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="Waiting for your speaking"
            />
        </el-row>
    </el-col>
</template>
  
<style scoped>

.report-items {
    width: 100%;
    background-color: aquamarine;
    border-radius: 2%;
    margin: 5%;
}
.report-items .el-scrollbar {
    width: 100%;
}

.report-summary{
    width: 100%;
    margin: 5%;
}

.report-summary .el-input{
    resize: none;
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
  