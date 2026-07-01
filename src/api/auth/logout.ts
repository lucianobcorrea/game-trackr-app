import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_LOGOUT = "/api/auth/logout";

export async function logout() {
    const response = await axiosInstance.post(URL_LOGOUT);
    return response.data;
}