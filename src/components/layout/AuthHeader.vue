<script setup lang="ts">
import Link from '@/components/Link.vue';
import Logo from '@/assets/logo.svg';
import { RouterLink } from 'vue-router'
</script>

<template>
    <header class="py-10 absolute top-0 w-full z-10">
        <div class="mx-auto px-4 md:px-8 lg:px-12">
            <div class="flex justify-between flex-row items-center">
                <div>
                    <RouterLink to="/"><img alt="GameTrackr logo" class="w-full max-w-80" :src=Logo /></RouterLink>
                </div>
                <div class="flex gap-10">
                    <Link to="/community" class="text-lg">Community</Link>
                    <Link to="/auth/login" class="text-lg">Explore</Link>
                    <Link to="/auth/login" class="text-lg">Login</Link>
                </div>
            </div>
        </div>
    </header>
</template>