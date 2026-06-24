<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore.ts';
import TheWelcome from '../components/TheWelcome.vue'

const authStore = useAuthStore();
console.log(authStore.token)
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
