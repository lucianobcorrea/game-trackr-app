import './styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useAuthStore } from './stores/authStore'
import { useUserStore } from './stores/userStore'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

async function bootstrap() {
    const auth = useAuthStore()
    const user = useUserStore()
    await auth.init()

    if (auth.isAuthenticated) {
        await user.fetchMe()
    }
}

await bootstrap()

app.use(router)

app.mount('#app')
