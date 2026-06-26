<script setup lang="ts">
import JoystickLogo from '@/assets/joystick-logo.svg';
import { RouterLink, useRoute } from 'vue-router';
import Link from '../Link.vue';

const route = useRoute();
</script>

<template>
    <header class="py-10 w-full border-b border-light-graphite">
        <div class="mx-auto px-4 md:px-8 lg:px-12">
            <div class="flex justify-between flex-row items-center">
                <div>
                    <RouterLink to="/"><img alt="GameTrackr logo" class="w-full max-w-16" :src=JoystickLogo />
                    </RouterLink>
                </div>
                <div class="flex gap-10">
                    <Link to="/community" class="text-lg"
                        :class="{ 'text-primary-green border-b-1 border-primary-green': route.path === '/community' }">
                        Community</Link>
                    <Link to="/explore" class="text-lg"
                        :class="{ 'text-primary-green border-b-1 border-primary-green': route.path === '/explore' }">
                        Explore
                    </Link>
                    <Link to="/auth/login" class="text-lg"
                        :class="{ 'text-primary-green border-b-1 border-primary-green': route.path === '/auth/login' }">
                        Login</Link>
                </div>
            </div>
        </div>
    </header>
</template>