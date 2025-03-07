<script lang="js" setup>

import { ref, reactive, computed } from 'vue'
import 'element-plus/theme-chalk/display.css'

import { useTestListStore, usePointStore } from '@store/index'

const summary_area = ref("")
const recording_area = ref("")
const activeName = ref('first')
const scrollbar_max = ref(Math.floor(window.innerHeight*0.42)+'px')

const chosenTest = reactive({
    testName:''
})
const testListStore = useTestListStore()
const testListOptions = computed(() => testListStore.testListOptions);

const pointsStore = usePointStore();
const checkPoints = computed(() => pointsStore.points);


function addTest(){
    window.api.invoke('renderer-to-main', {
        name: "create-addcat",
        event: "event",
        data:{}
    });
}

function getStatusClass(required) {
    return required === "required"
    ? "red"
    : required === "done"
    ? "green"
    : "yellow";
}

async function loadPoints(){
    // const testName = chosenTest.testName;
    const points = await window.api.invoke('renderer-to-main-async', {
        name: "load-points",
        event: "asyncevent",
        data:{
            "teatName":chosenTest.testName
        }
    });
    if ("error" in points){
        alert("Load Points File Failed");
    }
    else{
        pointsStore.setPoints(points);
    }
}

</script>

<template>
    <el-col :span="24" class="style-color-3 report-panel">
        <el-row :span="24" class="report-aims style-color-2">
            <el-col :span="24">
                <el-row>
                    <h1 style="text-align: left;">Image Catalog Name</h1>
                </el-row>
                <el-row :span="24">
                    <el-form :model="chosenTest" label-width="auto" style="width: 100%;">
                        <el-form-item>
                            <el-col :span="18">
                                <el-select 
                                    v-model="chosenTest.testName"
                                    filterable
                                    placeholder="Please select"
                                    @change="loadPoints">
                                    <el-option v-for="option in testListOptions"
                                                :key="option.key"
                                                :label="option.label"
                                                :value="option.value"
                                    />
                                </el-select>
                            </el-col>
                            <el-col :span="6">
                                <el-button @click="addTest" round>Add</el-button>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </el-row>
            </el-col>
        </el-row>

        <el-row :span="24" hidden-sm-only class="report-divider">
        </el-row>

        <el-row :span="24" class="report-items style-color-2">
            <h1 style="text-align: left;">Key Points</h1>
            <el-scrollbar class="scrollbar">
                <div
                v-for="point in checkPoints"
                :key="point.title"
                class="scrollbar-demo-item"
                >
                    <el-tooltip
                        class="box-item"
                        effect="dark"
                        :content="point.explanation"
                        placement="left"
                        popper-class="point-tooltip"
                    >
                        <div class="scrollbar-item">
                        <span
                            class="status-light"
                            :class="getStatusClass(point.importance)"
                        ></span>
                        <span style="font-size: large;">{{ point.title }}</span>
                        </div>
                    </el-tooltip>
                </div>
            </el-scrollbar>
        </el-row>

        <el-row :span="24" hidden-sm-only class="report-divider">
        </el-row>

        <el-row :span="24" class="report-summary style-color-2">
            <el-tabs v-model="activeName" class="demo-tabs" type="border-card">
                <el-tab-pane label="Auto Summary" name="first" style="width: 100%;">
                    <el-input
                        v-model="summary_area"
                        type="textarea"
                        resize="none"
                        :autosize="{ minRows: 7, maxRows: 7 }"
                        placeholder="Waiting for your speaking"
                    />
                </el-tab-pane>
                <el-tab-pane label="Raw Speaking" name="second" style="width: 100%;">
                    <el-input
                        v-model="recording_area"
                        type="textarea"
                        resize="none"
                        :autosize="{ minRows: 7, maxRows: 7 }"
                        placeholder="Waiting for your speaking"
                    />
                </el-tab-pane>
            </el-tabs>
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
    height: 2%;
}

.report-aims {
    height: 10%;
    border-radius: 2%;
    padding: 10px;
}

.report-items {
    flex-direction: column;
    height: 57%;
    border-radius: 2%;
    padding: 10px;
}
.report-items .el-scrollbar {
    width: 100%;
}

.report-summary{
    height: 30%;
    padding: 10px;
    border-radius: 2%;
}

.report-summary .el-input{
    resize: none;
    height: 100%;
}

.scrollbar {
    width: 100%;
    max-height: v-bind(scrollbar_max);
}

.scrollbar-demo-item {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 50px;
    margin: 10px;
    text-align: left;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}

.demo-tabs {
    width: 100%;
}

.demo-tabs > .el-tabs__content {
    width: 100%;
    padding: 16px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
.scrollbar-item {
  display: flex;
  align-items: center;
  padding: 6px 10px;
  cursor: pointer;
  width: 100%;
}
.box-item {
  margin-top: 10px;
}
.point-tooltip {
    width: 250px !important; /* Set your desired width */
    white-space: normal; /* Allow text to wrap */
    word-break: break-word;
}
.status-light {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 8px;
}
.red {
  background-color: red;
}

.green {
  background-color: green;
}

.yellow {
  background-color: yellow;
}
</style>