import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_LIST_COMMUNITIES = "/api/communities?per_page=";

export type Community = {
    id: number,
    title: string,
    slug: string,
    description: string,
    members: [];
    is_member: boolean;
    avatar_url: string;
    cover_url: string;
}

export type CommunityList = {
    data: Community[]
}

export async function listCommunities(per_page = 15) {
    const response = await axiosInstance.get<CommunityList>(URL_LIST_COMMUNITIES + per_page);
    return response.data;
}