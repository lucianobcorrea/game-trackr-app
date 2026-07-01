import { logout as logoutRequest } from "@/api/auth/logout";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";

export function useLogout() {
    const router = useRouter();
    const authStore = useAuthStore();
    const userStore = useUserStore();

    const logout = async () => {
        try {
            await logoutRequest();
            toast.success('Logged out successfully');
        } catch (err: any) {
            toast.error(err.response?.data?.error ?? 'Error logging out')
        } finally {
            authStore.clearAuth();
            userStore.clearUser();
            router.replace('/auth/login');
        }
    }

    return { logout }
}