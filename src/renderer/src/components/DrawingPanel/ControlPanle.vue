<script>
    import useDrawPanelStore from '@store/drawPanelStore';

    export default {
        name: "CanvasControler",
        components: {
        },
        data() {
            return {
                canvas: Object,
                canvasEraser: false,
                canvasDisable: false,
                canvasLine: 5,
                strokes: [],
            };
        },
        
        mounted() {
            const canvasStore = useDrawPanelStore();
            // const canvasRef = canvasStore.canvasRef;
            this.canvasStore = canvasStore;
            this.canvas = canvasStore.canvasRef;
            this.canvasEraser = canvasStore.canvasEraser;
            this.canvasDisable = canvasStore.canvasDisable;
            this.canvasLine = canvasStore.canvasLine;


            const hidebtn = document.getElementById("hidebtn");
            hidebtn.addEventListener("mousedown", this.hideStroke);
            hidebtn.addEventListener("mouseup", this.showStroke);
        },
        destroyed() {
            const hidebtn = document.getElementById("hidebtn");
            hidebtn.removeEventListener("mousedown", this.hideStroke);
            hidebtn.removeEventListener("mouseup", this.showStroke);
        },
        methods: {
            hideStroke() {
                this.strokes = this.canvas.getAllStrokes();
                this.canvas.reset()
            },
            showStroke() {
                this.canvas.images = [].concat(this.canvas.images, this.strokes);
                this.canvas.redraw(true);
            },
            onDisableChange(){this.canvasDisable = !this.canvasDisable;this.canvasStore.setCanvasDisable(this.canvasDisable);},
            onEraserChange(){this.canvasEraser = !this.canvasEraser;this.canvasStore.setCanvasEraser(this.canvasEraser);},
            onLineChange(){this.canvasStore.setCanvasLine(this.canvasLine);},
            openConfigWin() {
                window.api.invoke('renderer-to-main', {
                    name: "create-config",
                    event: "event",
                    data:{}
                });
            },
        }
    };
</script>

<template>
    <el-col :span="24" class="btn-panel style-color-3">
        <el-row :span="24">
            <el-col :span="3" justify="center">
                <button type="button" id="hidebtn" class="canvas-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                    </svg>
                    <span style="margin-left: 2px;">Hide</span>
                </button>
            </el-col>
            <el-col :span="3" justify="center">
                <button type="button" @click.prevent="onDisableChange()" class="canvas-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        class="bi bi-lock"
                        viewBox="0 0 16 16"
                    >
                        <path
                        v-if="!canvasDisable"
                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z"
                        />
                        <path
                        v-else
                        d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
                        />
                    </svg>
                    <span v-if="!canvasDisable">Lock</span>
                    <span v-else>Unlock</span>
                </button>
            </el-col>
            <el-col :span="3" justify="center">
                <button type="button" @click.prevent="canvas.undo()" class="canvas-button">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
            <el-col :span="3" justify="center">
                <button type="button" @click.prevent="canvas.reset()" class="canvas-button">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
            <el-col :span="3" justify="center">
                <button type="button" @click.prevent="onEraserChange()" class="canvas-button">
                    <span v-if="canvasEraser">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                        width="24"
                        height="24"
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
            <el-col :span="9" justify="center"> 
                <div class="slider-demo-block">
                    <span class="demonstration">Size</span>
                    <el-slider v-model="canvasLine" :step="5" :min="5" :max="51" show-stops @click="onLineChange()"/>
                </div>
            </el-col>
        </el-row>
        <el-row :span="24" justify="center">
            <el-col :span="20">
                <el-button-group class="btn-group">
                    <el-button type="default" size="large" round>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left-square" viewBox="0 0 16 16" style="margin: 3px">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                        </svg>
                        <span>Previous</span>
                    </el-button>
                    <el-button type="default" size="large" round>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16" style="margin: 3px">
                            <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/>
                        </svg>
                        <span>Import</span>
                    </el-button>
                    <el-button type="default" size="large" round class="speaking-btn">
                        <span>Press</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16" style="margin: 3px">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
                        </svg>
                        <span>Speaking</span>
                    </el-button>
                    <el-button type="default" size="large" round>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-file-earmark-richtext" viewBox="0 0 16 16" style="margin: 3px">
                            <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                            <path d="M4.5 12.5A.5.5 0 0 1 5 12h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m0-2A.5.5 0 0 1 5 10h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5m1.639-3.708 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V8.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V8s1.54-1.274 1.639-1.208M6.25 6a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"/>
                        </svg>
                        <span>Export</span>
                    </el-button>
                    <el-button type="default" size="large" round>
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-right-square" viewBox="0 0 16 16" style="margin: 3px">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                        </svg>
                    </el-button>
                </el-button-group>
            </el-col>
        </el-row>
        <el-row :span="24" style="margin-top: 10px;">
            <el-col :span="20">
                <el-row style="font-size: 14px;">1. Press Import Button to Select the medical image folder.</el-row>
                <el-row style="font-size: 14px;">2. Press Previous/Next Button to move forward/backward in the medical image list.</el-row>
                <el-row style="font-size: 14px;">3. Press Export Button to generate PDF report.</el-row>
                <el-row style="font-size: 14px;">4. Labeled Image will saved automatically.</el-row>
            </el-col>
            <el-col :span="4">
                <el-row :span="24" justify="end" style="padding: 10px;">
                    <el-button size="large" style="height: 60px; width: 60px;" round @click="openConfigWin()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0"/>
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z"/>
                        </svg>
                    </el-button>
                </el-row>
            </el-col>
        </el-row>
    </el-col>
</template>

<style scoped>

.slider-demo-block {
    height: 55px;
    padding: 0.21em 1.2em;
    margin-left: 5px;
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
    font-size: 1.5em;
    font-weight: 500;
    font-family: inherit;
}
.slider-demo-block .demonstration + .el-slider {
    flex: 0 0 70%;
}

.btn-panel {
    padding: 10px;
    border-radius: 5px;
}

.canvas-button {
    height: 60px;
    border-radius: 8px;
    border: 1px solid transparent;
    margin-top: 2px;
    /* padding: 0.6em 1.2em; */
    /* margin-left: auto;
    margin-right: auto; */
    width: 90%;
    font-size: 1.5em;
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

.speaking-btn {
    width: 40% !important;
}
.btn-group {
    margin-top: 20px;
    width: 100%;
}
.btn-group .el-button {
    width: 15%;
    font-size: 1.5em;
    font-weight: 500;
    font-family: inherit;
    height: 60px;
}
</style>