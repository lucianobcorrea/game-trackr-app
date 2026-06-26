<script setup lang="ts">
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

defineProps<{
    title?: string;
    description?: string;
}>()
</script>

<template>
    <Card class="bg-graphite border border-light-graphite">
        <CardHeader>
            <slot name="header" />
            <CardTitle v-if="title" class="text-white text-base">{{ title }}</CardTitle>
            <CardDescription class="text-olive-light" v-if="description">{{ description }}</CardDescription>
        </CardHeader>
        <CardContent v-if="$slots.content">
            <slot name="content" />
        </CardContent>
        <CardFooter v-if="$slots.footer" class="flex-col items-start">
            <hr class="border-light-graphite w-full pb-5" />
            <slot name="footer" />
        </CardFooter>
    </Card>
</template>