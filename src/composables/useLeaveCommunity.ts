import { leaveCommunity } from "@/api/community/leave";
import { ref } from "vue";
import { toast } from "vue-sonner";

export function useLeaveCommunity(onSuccess: () => void) {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const leave = async (communityId: number) => {
        loading.value = true
        error.value = null
        try {
            await leaveCommunity(communityId);
            onSuccess();
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? 'Error leaving community')
        } finally {
            loading.value = false
        }
    }

    return { leave, loading, error }
}