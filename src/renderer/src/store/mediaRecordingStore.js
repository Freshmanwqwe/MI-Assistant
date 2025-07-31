import { defineStore } from 'pinia';

export const useMediaRecordingStore = defineStore('mediaRecording', {
    state: () => ({
        recognizedText: '',
        finishRecording: true,
    }),
    actions: {
        setRecognizedText(text) {
            this.recognizedText = text;
        },
        toggleFinishRecording() {
            this.finishRecording = !this.finishRecording;
        }
    }
});