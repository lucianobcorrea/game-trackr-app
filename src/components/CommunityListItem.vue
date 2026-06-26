<script setup lang="ts">
import { PlusIcon } from '@lucide/vue';
import Avatar from './ui/avatar/Avatar.vue';
import AvatarFallback from './ui/avatar/AvatarFallback.vue';
import AvatarImage from './ui/avatar/AvatarImage.vue';
import AppButton from './AppButton.vue';

defineProps<{
    id: number;
    members: number;
    title: string;
    description: string;
    avatar: string;
}>()
</script>

<template>
    <div class="flex items-center justify-between hover:bg-light-graphite/40 p-2 cursor-pointer transition ease-in-out rounded-lg">
        <div class="flex items-center gap-5 pr-6">
            <Avatar>
                <AvatarImage :src="avatar" :alt="title" />
                <AvatarFallback>{{ title.slice(0, 2).toUpperCase() }}</AvatarFallback>
            </Avatar>
            <div>
                <p class="text-white font-extrabold text-base">{{ title }}</p>
                <p class="text-olive-light text-sm">{{ members }}</p>
            </div>
        </div>

        <AppButton variant="graphite" :has-padding="false">
            <PlusIcon />
            Join
        </AppButton>
    </div>
</template>
