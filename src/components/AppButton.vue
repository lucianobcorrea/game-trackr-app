<script setup lang="ts">
import type { ButtonVariants } from './ui/button';
import Button from './ui/button/Button.vue';
import { cn } from '@/lib/utils';

const props = withDefaults(defineProps<{
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    class?: string
    hasPadding?: boolean
}>(), {
    variant: 'default',
    size: 'default',
    class: '',
    hasPadding: true,
})
</script>

<template>
    <Button :class="cn('cursor-pointer rounded-lg text-base', props.hasPadding ? 'p-7' : '', props.class)"
        :variant="variant" :size="size">
        <slot />
    </Button>
</template>