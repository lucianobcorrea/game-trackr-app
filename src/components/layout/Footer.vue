<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import { RouterLink } from 'vue-router';
import Link from '../Link.vue';

const copyrightYear = new Date().getFullYear();
</script>

<template>
    <footer class="bg-dark-blue border-t-1 border-primary-green py-10">
        <div class="mx-auto px-4 md:px-8 lg:px-12">
            <div class="flex justify-between flex-row items-center">
                <div>
                    <RouterLink to="/"><img alt="GameTrackr logo" class="w-full max-w-80" :src=Logo /></RouterLink>
                </div>
                <div class="flex gap-10">
                    <Link to="/auth/login" class="text-lg">Privacy Policy</Link>
                    <Link to="/auth/login" class="text-lg">Terms of Service</Link>
                    <Link to="/auth/login" class="text-lg">Support</Link>
                </div>
                <div>
                    <p class="text-lg text-white">© {{ copyrightYear }} GameTrackr. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</template>