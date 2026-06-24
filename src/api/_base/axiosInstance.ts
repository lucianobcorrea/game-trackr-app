import axios from "axios";
import router from "@/router";

export const axiosInstance = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    baseURL: "http://localhost:8000",
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