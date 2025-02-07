
<script>
import { ref, computed } from "vue";
import { ElMessage } from "element-plus";
import { useCatlogAddingStore } from "@store/CatlogAddingStore"


export default {
  setup() {
    const cataddStore = useCatlogAddingStore();
    const itemList = computed(() => cataddStore.points);
    const dialogVisible = ref(false);
    const nameInput = ref("");
    const doneVisble = ref(false)

    const openDialog = () => {
      dialogVisible.value = true;
    };

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
      window.api.invoke('renderer-to-main', {
            name: "save-points",
            event: "cevent",
            data:{
                'name': nameInput.value,
                'points': JSON.stringify(itemList.value, null, 2)
            }
      });
      doneVisble.value = true;
      dialogVisible.value = false;
      setTimeout(()=>{doneVisble.value = false}, 2000);
    };


    return { itemList, cataddStore, dialogVisible, nameInput, doneVisble, addItem, removeItem, saveList, openDialog};
  },
  computed:{
    isEmpty() {
      return this.cataddStore.getLength() === 0; // true when empty, false when not
    }
  }
};
</script>

<template>
  <el-dialog v-model="dialogVisible" title="Enter Name">
    <el-input v-model="nameInput" placeholder="Enter the name of new catalog" />

    <template #footer>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="saveList">Save</el-button>
    </template>
  </el-dialog>

  <el-col :span="22" class="style-color-2 points-panel">
    <el-row :span="22" justify="center"  class="list-container">
      <!-- List Items -->
       <el-col :span="24">
          <el-col v-show="isEmpty"><h1>Chat with Miaa to help you generate the key points.</h1></el-col>
          <el-alert
              v-show="doneVisble"
              title="Successfully saved"
              type="success"
              description="More text description"
              show-icon
            />
          <el-col v-for="(item, index) in itemList" :key="index" class="list-item">
            <el-input 
              v-model="item.title" 
              style="width: 22%;"
              placeholder="Enter name"
            />
            

            <el-radio-group 
              v-model="item.importance"
              style="width: 22%; background-color:white;padding:0px 10px 0px 10px;align-content: center;border-radius: 2px;">
                <el-radio value="required">Required</el-radio>
                <el-radio value="optional">Optional</el-radio>
            </el-radio-group>

            <el-input
              v-model="item.explanation"
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
        <el-button type="success" @click="openDialog">Save List</el-button>
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
