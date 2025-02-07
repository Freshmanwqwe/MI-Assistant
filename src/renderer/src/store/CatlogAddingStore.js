import { defineStore } from "pinia";

export const useCatlogAddingStore = defineStore('catlogAdding',{
    state: () => ({
        points: []
    }),
    getters:{
        getPointList() { return self.points},
    },
    actions: {
        getLength() {
            return this.points.length;
        },
        setList(ref) {
            this.points = ref;
        }
    }
})