<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue-sonner';

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();

onMounted(() => {
    const token = route.query.token as string

    if (token) {
        authStore.setToken(token)
        toast.success("Login successful")
        router.push('/')
    } else {
        toast.error("Login failed")
        router.push('/auth/login')
    }
})
</script>
