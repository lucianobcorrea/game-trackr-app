import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login as loginRequest } from '@/api/auth/login'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/userStore'

type LoginData = {
    email: string
    password: string
    remember_me?: boolean
}

export function useLogin() {
    const loading = ref(false)
    const router = useRouter()

    const authStore = useAuthStore()
    const userStore = useUserStore()

    const login = async (data: LoginData) => {
        loading.value = true

        try {
            const response = await loginRequest(data)
            authStore.setToken(response.token)
            userStore.setUser(response.user)
            toast.success("Welcome back!")
            router.push('/')
        } catch (err: any) {
            toast.error(err.response?.data?.error ?? 'Error in credentials')
        } finally {
            loading.value = false
        }
    }

    return { login, loading }
}