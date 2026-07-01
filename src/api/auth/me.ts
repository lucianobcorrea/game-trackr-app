import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_ME = "/api/profile/me";

export async function me() {
    const response = await axiosInstance.get(URL_ME);
    return response.data;
}