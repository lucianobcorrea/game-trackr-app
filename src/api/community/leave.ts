import { axiosInstance } from "@/api/_base/axiosInstance";

const URL_LEAVE_COMMUNITY = "/api/communities/leave/";

export async function leaveCommunity(communityId: number) {
    await axiosInstance.post(URL_LEAVE_COMMUNITY + communityId);
}