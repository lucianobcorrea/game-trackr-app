import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerRequest } from '@/api/auth/register'

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
        error.value = null
        try {
            const response = await registerRequest(data)
            router.push('/')
            return response
        } catch (err: any) {
            error.value = err.response?.data?.message ?? 'Error creating account'
        } finally {
            loading.value = false
        }
    }

    return { register, loading, error }
}