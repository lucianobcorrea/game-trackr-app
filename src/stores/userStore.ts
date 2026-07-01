import { me } from "@/api/auth/me";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const user = ref<any | null>(null);

    function setUser(data: any) {
        user.value = data;
    }

    function clearUser() {
        user.value = null;
    }

    async function fetchMe() {
        const data = await me();
        setUser(data.user);
    }

    return { user, setUser, clearUser, fetchMe };
});