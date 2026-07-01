import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register as registerRequest } from '@/api/auth/register'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'
import { useUserStore } from '@/stores/userStore'

type RegisterData = {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export function useRegister() {
    const loading = ref(false)
    const router = useRouter()

    const authStore = useAuthStore()
    const userStore = useUserStore()

    const register = async (data: RegisterData) => {
        loading.value = true
        try {
            const response = await registerRequest(data)
            authStore.setToken(response.token)
            userStore.setUser(response.user)
            toast.success("Account created successfully")
            router.push('/')
        } catch (err: any) {
            toast.error(err.response?.data?.error ?? 'Error creating account')
        } finally {
            loading.value = false
        }
    }

    return { register, loading }
}