<script>
import { spaceItemProps } from 'element-plus';

    export default {
        methods: {
            async setImage(event) {
                let URL = window.URL;
                this.backgroundImage = URL.createObjectURL(event.target.files[0]);
                await this.$refs.VueCanvasDrawing.redraw();
            },
        },
    }
</script>

<template>
    <el-row :span="24">
        <!-- <el-button-group>
            <el-button type="primary" :icon="ArrowLeft">Previous Page</el-button>
            <el-button type="primary">
            Next Page<el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
        </el-button-group> -->
        <!-- <div >
            <el-col :span="12">
                <div style="margin-right: 30px">
                    <p style="margin-bottom: 0">Background Color:</p>
                    <input type="color" v-model="backgroundColor" />
                </div>
            </el-col>
            <el-col :span="12">
                <div>
                    <p style="margin-bottom: 0">Upload Background Image:</p>
                    <input type="file" @change="setImage($event)" />
                </div>
            </el-col>
        </div> -->
    </el-row>
    
</template>


<style scoped>
</style>