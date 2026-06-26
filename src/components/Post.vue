<script setup lang="ts">
import AppCard from './AppCard.vue';
import DefaultImg from '@/assets/default-avatar.png';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, MessagesSquare } from '@lucide/vue';
</script>

<template>
    <AppCard
        class="bg-graphite border border-light-graphite hover:bg-light-graphite/40 cursor-pointer transition ease-in-out"
        title="Finally hit Diamond rank in CyberQuest!"
        description="The last boss fight was absolutely insane. Spent over 6 hours perfecting the parry timings, but it was so worth it. Anyone else struggling with the final phase of the Abyss King?">
        <template #header>
            <div class="flex gap-5 items-center pb-8">
                <Avatar class="size-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                    <p class="text-white text-base font-semibold">Luciano Correa</p>
                    <p class="text-olive-light text-sm">3 days ago</p>
                </div>
            </div>
        </template>
        <template #content>
            <img alt="CyberQuest" :src=DefaultImg class="w-full object-cover rounded-xl" />
        </template>
        <template #footer>
            <div class="flex gap-6 text-olive-light">
                <button type="button" class="flex gap-2 items-center cursor-pointer hover:text-red-500 transition">
                    <Heart />
                    <span>1.2K</span>
                </button>
                <button type="button"
                    class="flex gap-2 items-center cursor-pointer hover:text-primary-green transition">
                    <MessagesSquare />
                    <span>352</span>
                </button>
            </div>
        </template>
    </AppCard>
</template>