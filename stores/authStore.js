import { defineStore } from 'pinia';
import { reactive } from 'vue';
export default defineStore('auth', () => {
    const user = reactive({});
    const updateUserInfo = (data) => {
        Object.assign(user, data);
    }
    return {
        user,
        updateUserInfo
    }
})
