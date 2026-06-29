import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_REFRESH = "/api/auth/refresh";

export async function refresh() {
    const response = await axiosInstance.post(URL_REFRESH);
    return response.data;
}