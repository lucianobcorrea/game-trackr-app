import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_JOIN_COMMUNITY = "/api/communities/join/";

export async function joinCommunity(communityId: number) {
    await axiosInstance.post(URL_JOIN_COMMUNITY + communityId);
}