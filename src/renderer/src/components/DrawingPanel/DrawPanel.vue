<script>
    import VueDrawCanvas from "@thomas.fortin/vue-draw-canvas";
    import { ref } from "vue"

    const canvasWidth = ref(window.innerWidth * 0.68);
    const canvasHeight = ref((canvasWidth.value / 16 )* 9);

    export default {
        name: "DrawCanvas",
        components: {
            VueDrawCanvas,
        },
        data() {
            return {
                initialImage: [],
                width: canvasWidth,
                height: canvasHeight,
                x: 0,
                y: 0,
                image: "",
                eraser:  false,
                disabled: false,
                fillShape: false,
                line: 5,
                color: "#00FF00",
                strokeType: "dash",
                lineCap: "round",
                lineJoin: "round",
                backgroundColor: "#FFFFFF",
                backgroundImage: "",
                watermark: null,
                additionalImages: [],
            };
        },
        mounted() {
            if ("VueDrawCanvas" in window.localStorage) {
                this.initialImage = JSON.parse(
                    window.localStorage.getItem("VueDrawCanvas")
                );
            };
            // this.setImage("/Users/timberzhang/Documents/Documents/2024-MedImageAssistatnt/Code/ImageData/20240228-09-32-49/1020_ori.png")
        },
        methods: {
            // async setImage(event) {
            //     let URL = window.URL;
            //     console.log(event.target.files[0]);
            //     this.backgroundImage = URL.createObjectURL(event.target.files[0]);
            //     await this.$refs.VueCanvasDrawing.redraw();
            // },
            getCoordinate(event) {
                let coordinates = this.$refs.VueCanvasDrawing.getCoordinates(event);
                this.x = coordinates.x;
                this.y = coordinates.y;
            },
        }
    };
</script>

<template>
    <el-col :span="24">
        <el-row :span="24" justify="center" class="canvas-panel">
            <div class="canvas">
                <VueDrawCanvas
                    ref="VueCanvasDrawing"
                    v-model:image="image"
                    :width="width"
                    :height="height"
                    :stroke-type="strokeType"
                    :line-cap="lineCap"
                    :line-join="lineJoin"
                    :fill-shape="fillShape"
                    :eraser="eraser"
                    :lineWidth="line"
                    :color="color"
                    :background-color="backgroundColor"
                    :background-image="backgroundImage"
                    :watermark="watermark"
                    :initial-image="initialImage"
                    saveAs="png"
                    :styles="{
                    border: 'solid 1px #000',
                    }"
                    :lock="disabled"
                    @mousemove="getCoordinate($event)"
                    :additional-images="additionalImages"
                />
            </div>
        </el-row>
        <el-row :span="24" class="btn-panel style-color-3">
            <el-col :span="4" justify="center">
                <button type="button" @click.prevent="disabled = !disabled">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-lock"
                        viewBox="0 0 16 16"
                    >
                        <path
                        v-if="!disabled"
                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
                        />
                        <path
                        v-else
                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
                        />
                    </svg>
                    <span v-if="!disabled">Lock</span>
                    <span v-else>Unlock</span>
                </button>
            </el-col>
            <el-col :span="4" justify="center">
                <button type="button" @click.prevent="$refs.VueCanvasDrawing.undo()">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-arrow-counterclockwise"
                        viewBox="0 0 16 16"
                    >
                        <path
                        fill-rule="evenodd"
                        d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"
                        />
                        <path
                        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"
                        />
                    </svg>
                    Undo
                </button>
            </el-col>
            <el-col :span="4" justify="center">
                <button type="button" @click.prevent="$refs.VueCanvasDrawing.reset()">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-file-earmark"
                    viewBox="0 0 16 16"
                    >
                    <path
                        d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"
                    />
                    </svg>
                    Clear
                </button>   
            </el-col>
            <el-col :span="4" justify="center">
                <button type="button" @click.prevent="eraser = !eraser">
                    <span v-if="eraser">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                    >
                        <path
                        d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                        />
                    </svg>
                    Draw
                    </span>
                    <span v-else>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-eraser"
                        viewBox="0 0 16 16"
                    >
                        <path
                        d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"
                        />
                    </svg>
                    Eraser
                    </span>
                </button>
            </el-col>
            <el-col :span="8" justify="center"> 
                <div class="slider-demo-block">
                    <span class="demonstration">Size</span>
                    <el-slider v-model="line" :step="5" :min="5" :max="50" show-stops />
                </div>
            </el-col>
        </el-row>
    </el-col>

    
</template>

<style scoped>

h1 {
    font-size: 3em;
    line-height: 1.1;
}

canvas {
    width: 100%;
    background-color: transparent;
    border-color: rgb(159, 242, 207);
    border-radius: 2%;
}

.canvas-panel {
    padding: 10px;
}

.slider-demo-block {
    padding: 0.21em 1.2em;
    background-color: #fdfdfd;
    border-radius: 8px;
    border: 1px solid transparent;
    max-width: 600px;
    display: flex;
    align-items: center;
}
.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
    margin-right: 12px;
}
.slider-demo-block .demonstration {
    color: black;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    /* margin-bottom: 0; */
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
}
.slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
}

.btn-panel {
    padding: 20px;
    border-radius: 5px;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #fdfdfd;
    cursor: pointer;
    transition: border-color 0.25s;
}
button:hover {
    border-color: #646cff;
}
button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
</style>

