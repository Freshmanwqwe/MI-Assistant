import { defineStore } from 'pinia';

export const useMediaRecordingStore = defineStore('mediaRecording', {
    state: () => ({
        recognizedText: '',
    }),
    actions: {
        setRecognizedText(text) {
            this.recognizedText = text;
        },
    }
})