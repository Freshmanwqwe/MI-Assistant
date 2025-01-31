import { defineStore } from "pinia";

export const test = defineStore('testCode', {
    state: () => {
        return {code:500}
    },
    getters:{},
    actions:{}
})

export const useTestListStore = defineStore('testList',{
    state: () => ({
        testListOptions: [],
        testList: []
    }),
    getters:{
        getList() { return self.testList},
        getTestOptions() {return self.testListOptions}
    },
    actions: {
        setList(ref) {
            this.testList = ref;

            this.testListOptions = ref.reduce((acc, item, index) => {
                acc[index] = {
                    "key" : item,
                    "value" : item,
                    "label" : item.split(".")[0],
                };
                return acc;
            }, {});
        }
    }
})
