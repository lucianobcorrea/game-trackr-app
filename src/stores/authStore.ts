import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)

    function setToken(tokenValue: string) {
        token.value = tokenValue;
    }

    function clearAuth() {
        token.value = null;
    }

    const isAuthenticated = computed(() => !!token.value);

    return {
        token,
        setToken,
        clearAuth,
        isAuthenticated
    }
})