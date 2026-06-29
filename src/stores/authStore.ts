import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('auth_token'))

    function setToken(tokenValue: string) {
        token.value = tokenValue;
        localStorage.setItem('auth_token', tokenValue);
    }

    function clearAuth() {
        token.value = null;
        localStorage.removeItem('auth_token');
    }

    const isAuthenticated = computed(() => !!token.value);

    return {
        token,
        setToken,
        clearAuth,
        isAuthenticated
    }
})