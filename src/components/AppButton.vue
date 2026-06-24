<script setup lang="ts">
import type { ButtonVariants } from './ui/button';
import Button from './ui/button/Button.vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: string
}>(), {
    variant: 'default',
    size: 'default',
    class: '',
})
</script>

<template>
    <Button :class="cn('cursor-pointer p-7 rounded-lg text-base', props.class)" :variant="variant" :size="size">
        <slot />
    </Button>
</template>