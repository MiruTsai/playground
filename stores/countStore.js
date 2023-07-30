import { defineStore } from 'pinia';
export const useCountStore = defineStore('count', () => {
    const right = ref(0)
    const wrong = ref(0)
    const add = (status) => {
        // status: right/wrong 
        switch (status) {
            case 'right':
                right.value++;
                break;
            case 'wrong':
                wrong.value++;
                break;
        }       
    }    
    return {
        right,
        wrong,
        add
    }
})