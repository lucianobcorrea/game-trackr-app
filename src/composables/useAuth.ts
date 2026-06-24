import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerRequest } from '@/api/auth/register'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'

type RegisterData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export function useAuth() {
    const loading = ref(false)
    const error = ref<string | null>(null)
    const router = useRouter()

    const register = async (data: RegisterData) => {
        loading.value = true

        const authStore = useAuthStore()
        try {
            const response = await registerRequest(data)
            authStore.setToken(response.token)
            toast.success("Account created successfully")
            router.push('/')
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? 'Error creating account')
        } finally {
            loading.value = false
        }
    }

    return { register, loading, error }
}