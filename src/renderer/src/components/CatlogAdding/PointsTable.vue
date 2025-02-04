
<script>
import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  setup() {
    // Initial list (can be replaced with a fetched JSON object)
    const itemList = ref([
      { name: "Item 1", importance: "required", description: "Description 1" },
      { name: "Item 2", importance: "optional", description: "Description 2" },
    ]);

    // Add new item
    const addItem = () => {
      itemList.value.push({ name: "", importance: "optional", description: "" });
    };

    // Remove an item
    const removeItem = (index) => {
      itemList.value.splice(index, 1);
    };

    // Save list function
    const saveList = () => {
      console.log("Saved list:", JSON.stringify(itemList.value, null, 2));
      ElMessage.success("List saved successfully!");
    };

    return { itemList, addItem, removeItem, saveList };
  },
};
</script>

<template>
  <el-col :span="22" class="style-color-2 points-panel">
    <el-row :span="22" justify="center"  class="list-container">
      <!-- List Items -->
       <el-col :span="24">
          <el-col v-for="(item, index) in itemList" :key="index" class="list-item">
            <el-input 
              v-model="item.name" 
              style="width: 22%;"
              maxlength="20" 
              placeholder="Enter name"
              show-word-limit
            />
            

            <el-radio-group 
              v-model="item.importance"
              style="width: 22%; background-color:white;padding:0px 10px 0px 10px;align-content: center;border-radius: 2px;">
                <el-radio value="required">Required</el-radio>
                <el-radio value="optional">Optional</el-radio>
            </el-radio-group>

            <el-input
              v-model="item.description"
              type="textarea"
              rows="1"
              resize="none"
              style="width: 56%;"
              placeholder="Enter description"
            />

            <el-button type="danger" @click="removeItem(index)">Delete</el-button>
          </el-col>
       </el-col>
    </el-row>

    <el-row :span="24" justify="end" style="margin: 10px;">
      <el-col :span="3">
        <!-- Add New Item -->
        <el-button type="primary" @click="addItem">+ Add Item</el-button>
      </el-col>
      <el-col :span="3">
        <!-- Save List -->
        <el-button type="success" @click="saveList">Save List</el-button>
      </el-col>
    </el-row>

  </el-col>
</template>


<style>

.points-panel {
  border-radius: 8px;
}

.list-container {
  height: 330px;
  overflow-y: scroll;
  margin: 10px;
  padding: 20px;
  border: 1px solid #708871;
  border-radius: 8px;
}

.list-item {
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
  background-color: #70887163;
  padding: 10px;
  border-radius: 5px;
}

</style>
