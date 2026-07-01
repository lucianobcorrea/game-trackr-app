import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";
import { refresh } from "../auth/refresh";

export const axiosInstance = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: "http://localhost:8000",
});

axiosInstance.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const authStore = useAuthStore();

        // only try refresh on 401
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;

            try {
                const { token } = await refresh();
                authStore.setToken(token);
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return await axiosInstance(originalRequest);
            } catch (retryError: any) {
                // only clear auth if 401, other errors let pass
                if (retryError.response?.status === 401) {
                    authStore.clearAuth();
                    router.push('/auth/login');
                    return Promise.reject(retryError);
                }
                // 400, 403, 500... only reject without redirect
                return Promise.reject(retryError);
            }
        }

        // only redirect to login on 401 AND if not refresh route
        if (
            error.response?.status === 401 &&
            !originalRequest.url?.includes('/auth/refresh') &&
            router.currentRoute.value.path !== '/auth/login'
        ) {
            authStore.clearAuth();
            router.push('/auth/login');
        }

        // any other error (400, 403, 500...) only reject without redirect
        return Promise.reject(error);
    }
);