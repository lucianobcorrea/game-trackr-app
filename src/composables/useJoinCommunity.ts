import { joinCommunity } from "@/api/community/join";
import { ref } from "vue";
import { toast } from "vue-sonner";

export function useJoinCommunity(onSuccess: () => void) {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const join = async (communityId: number) => {
        loading.value = true
        error.value = null
        try {
            await joinCommunity(communityId);
            onSuccess();
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? 'Error joining community')
        } finally {
            loading.value = false
        }
    }

    return { join, loading, error }
}