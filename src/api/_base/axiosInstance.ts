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
    (error) => {
        if (
            error.response?.status === 401 &&
            router.currentRoute.value.path !== "/auth/login"
        ) {
            router.push("/auth/login");
        }
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes('/auth/refresh')
        ) {
            originalRequest._retry = true;

            try {
                const authStore = useAuthStore();
                const response = await axiosInstance.post('/api/auth/refresh');
                authStore.setToken(response.data.token);
                originalRequest.headers.Authorization = `Bearer ${response.data.token}`;

                return await axiosInstance(originalRequest);
            } catch {
                const authStore = useAuthStore();
                authStore.clearAuth();
                router.push('/auth/login');
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);