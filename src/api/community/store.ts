import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_STORE_COMMUNITY = "/api/communities";

export type StoreCommunityData = {
    title: string,
    description: string,
    avatar?: File,
    cover?: File,
}

export async function storeCommunity(data: StoreCommunityData) {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    if (data.avatar) {
        formData.append('avatar', data.avatar);
    }
    if (data.cover) {
        formData.append('cover', data.cover);
    }

    const response = await axiosInstance.post(URL_STORE_COMMUNITY, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}