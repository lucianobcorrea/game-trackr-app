<script setup lang="ts">
import type { Component } from 'vue'
import FormControl from './ui/form/FormControl.vue'
import FormLabel from './ui/form/FormLabel.vue'
import Input from './ui/input/Input.vue'
import { cn } from '@/lib/utils'

defineProps<{
    placeholder?: string
    type?: string
    label?: string
    icon?: Component
}>()
</script>

<template>
    <FormLabel class="text-olive-light text-base font-extrabold">{{ label }}</FormLabel>
    <FormControl>
        <div class="relative flex items-center w-full">
            <component v-if="icon" :is="icon" class="absolute left-5 size-5 text-olive-light/50 pointer-events-none" />
            <Input v-bind="$attrs" :placeholder="placeholder" :type="type" :class="cn(
                'bg-light-graphite border-light-graphite rounded-lg p-6 text-olive-light placeholder:text-base md:text-base w-full',
                icon ? 'pl-14' : ''
            )" />
        </div>
    </FormControl>
</template>