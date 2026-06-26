import axios from "axios";
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

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