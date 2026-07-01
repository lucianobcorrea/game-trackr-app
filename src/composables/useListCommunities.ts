import { ref, onMounted } from 'vue'
import { listCommunities, type Community } from '@/api/community/list'
import { toast } from 'vue-sonner'

export function useCommunities(per_page = 15) {
    const communities = ref<Community[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    const list = async () => {
        loading.value = true
        error.value = null
        try {
            const response = await listCommunities(per_page)
            communities.value = response.data
        } catch (err: any) {
            toast.error(err.response?.data?.error ?? 'Error fetching communities')
        } finally {
            loading.value = false
        }
    }

    onMounted(list)

    return { communities, loading, error, refresh: list }
}
