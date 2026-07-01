<script setup lang="ts">
import JoystickLogo from '@/assets/joystick-logo.svg';
import { RouterLink, useRoute } from 'vue-router';
import Link from '../Link.vue';
import Avatar from '../ui/avatar/Avatar.vue';
import { useAuthStore } from '@/stores/authStore.ts';
import { useUserStore } from '@/stores/userStore.ts';
import { User } from '@lucide/vue';
import AvatarFallback from '../ui/avatar/AvatarFallback.vue';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import AvatarImage from '../ui/avatar/AvatarImage.vue';
import { useLogout } from '@/composables/auth/useLogout.ts';

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();
const { logout } = useLogout();
</script>

<template>
    <header class="py-10 w-full border-b border-light-graphite">
        <div class="mx-auto px-4 md:px-8 lg:px-12">
            <div class="flex justify-between flex-row items-center">
                <div>
                    <RouterLink to="/"><img alt="GameTrackr logo" class="w-full max-w-16" :src=JoystickLogo />
                    </RouterLink>
                </div>
                <div class="flex justify-end gap-10 w-full">
                    <Link to="/community" class="text-lg flex items-center"
                        :class="{ 'text-primary-green border-b-1 border-primary-green': route.path.includes('/community') || route.path.includes('/posts') }">
                        Community</Link>
                    <Link to="/explore" class="text-lg flex items-center"
                        :class="{ 'text-primary-green border-b-1 border-primary-green': route.path === '/explore' }">
                        Explore
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger class="cursor-pointer">
                            <Avatar v-if="authStore.isAuthenticated" class="size-10">
                                <AvatarImage v-if="userStore.user?.avatar_url" :src="userStore.user?.avatar_url"
                                    :alt="userStore.user?.name" />
                                <AvatarFallback class="bg-light-graphite" v-else>{{ userStore.user?.name?.slice(0,
                                    2).toUpperCase() }}</AvatarFallback>
                            </Avatar>
                            <div v-else
                                class="bg-light-graphite w-10 h-10 rounded-full flex items-center justify-center">
                                <User class="text-white" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent class="bg-graphite border-light-graphite text-white">
                            <DropdownMenuItem v-if="authStore.isAuthenticated"
                                class="focus:bg-light-graphite focus:text-white">Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem v-if="authStore.isAuthenticated"
                                class="focus:bg-light-graphite focus:text-white" @click="logout">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    </header>
</template>