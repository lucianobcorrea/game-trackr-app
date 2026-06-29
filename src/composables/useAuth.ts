import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerRequest } from '@/api/auth/register'
import { login as loginRequest } from '@/api/auth/login'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'

type RegisterData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

type LoginData = {
    email: string
    password: string
    remember_me?: boolean
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

    const login = async (data: LoginData) => {
        loading.value = true

        const authStore = useAuthStore()
        try {
            const response = await loginRequest(data)
            authStore.setToken(response.token)
            toast.success("Welcome back!")
            router.push('/')
        } catch (err: any) {
            toast.error(err.response?.data?.message ?? 'Error in credentials')
        } finally {
            loading.value = false
        }
    }

    return { register, login, loading, error }
}