<script setup lang="ts">
import { cn } from '@/lib/utils';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    to: string,
    class?: string
}>()
</script>

<template>
    <RouterLink
        :class="cn('text-white hover:text-primary-green font-medium hover:transition-colors duration-300 ease-in-out', props.class)"
        :to="to">
        <slot />
    </RouterLink>
</template>