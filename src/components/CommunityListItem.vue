<script setup lang="ts">
import { CheckIcon, PlusIcon } from '@lucide/vue';
import Avatar from './ui/avatar/Avatar.vue';
import AvatarFallback from './ui/avatar/AvatarFallback.vue';
import AvatarImage from './ui/avatar/AvatarImage.vue';
import AppButton from './AppButton.vue';
import { RouterLink } from 'vue-router';
import Tooltip from './ui/tooltip/Tooltip.vue';
import TooltipTrigger from './ui/tooltip/TooltipTrigger.vue';
import TooltipContent from './ui/tooltip/TooltipContent.vue';

defineProps<{
    id: number;
    members: number;
    title: string;
    description: string;
    avatar: string;
    slug: string;
    isMember: boolean;
    join: () => void;
    leave: () => void;
}>()

</script>

<template>
    <div
        class="flex items-center justify-between hover:bg-light-graphite/40 p-2 cursor-pointer transition ease-in-out rounded-lg">
        <RouterLink :to="{
            name: 'community-page',
            params: {
                slug: slug
            }
        }">
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
        </RouterLink>

        <Tooltip v-if="!isMember">
            <TooltipTrigger as-child>
                <AppButton variant="graphite" :has-padding="false" @click="join()">
                    <PlusIcon />
                    Join
                </AppButton>
            </TooltipTrigger>
            <TooltipContent>
                <p>Click to join</p>
            </TooltipContent>
        </Tooltip>

        <Tooltip v-else>
            <TooltipTrigger as-child>
                <AppButton variant="graphite" :has-padding="false" @click="leave()">
                    <CheckIcon />
                    Joined
                </AppButton>
            </TooltipTrigger>
            <TooltipContent>
                <p>Click to leave</p>
            </TooltipContent>
        </Tooltip>
    </div>
</template>
