<script>
    import VueDrawCanvas from "@thomas.fortin/vue-draw-canvas";
    import ControlPanle from "./ControlPanle.vue";
    import useDrawPanelStore from '@store/drawPanelStore'
    import { ref } from "vue"

    const canvasWidth = ref(window.innerWidth * 0.68);
    const canvasHeight = ref((canvasWidth.value / 16 )* 9);

    export default {
        name: "DrawCanvas",
        components: {
            VueDrawCanvas,
            ControlPanle
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
                imageSrc: "",
            };
        },
        computed: {
            canvasEraser() {
                const store = useDrawPanelStore();
                return store.canvasEraser; // This value is reactive
            },
            canvasDisabled() {
                const store = useDrawPanelStore();
                return store.canvasDisable; // This value is reactive
            },
            canvasLine() {
                const store = useDrawPanelStore();
                return store.canvasLine; // This value is reactive
            }
        },
        watch: {
            // Watch the computed property for changes and update the data property
            canvasEraser(newValue) {
                this.eraser = newValue;
            },
            canvasDisabled(newValue) {
                this.disabled = newValue;
            },
            canvasLine(newValue) {
                this.line = newValue;
            }
        },
        mounted() {
            const canvasStore = useDrawPanelStore();
            canvasStore.setCanvasRef(this.$refs.VueCanvasDrawing);
        },
        destroyed() {
        },
        methods: {
            async setImage(event) {
                let URL = window.URL;
                this.backgroundImage = URL.createObjectURL(event.target.files[0]);
                await this.$refs.VueCanvasDrawing.redraw();
            },
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

</style>

