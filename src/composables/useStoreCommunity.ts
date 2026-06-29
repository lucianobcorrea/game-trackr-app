import { storeCommunity, type StoreCommunityData } from "@/api/community/store";
import router from "@/router";
import { communitySchema } from "@/schemas/community";
import { useForm } from "vee-validate";
import { ref } from "vue";
import { toast } from "vue-sonner";

export function useStoreCommunity() {
    const loading = ref(false)
    const error = ref<string | null>(null)

    const form = useForm({
        validationSchema: communitySchema,
        initialValues: {
            title: '',
            description: '',
            avatar: undefined,
            cover: undefined,
        }
    })

    const store = async (data: StoreCommunityData) => {
        loading.value = true
        error.value = null
        try {
            const response = await storeCommunity(data);
            toast.success('Community created successfully!')
            router.push({
                name: 'community-page',
                params: {
                    slug: response.community.slug,
                }
            })
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? 'Error creating community')
        } finally {
            loading.value = false
        }
    }

    const onSubmit = form.handleSubmit(async (values) => {
        await store(values)
    })

    return { form, onSubmit, store, loading, error }
}