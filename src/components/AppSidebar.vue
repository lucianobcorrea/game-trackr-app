<script setup lang="ts">
import { Calendar, Inbox, Search, Settings, SquarePen, UserRoundPlus } from '@lucide/vue'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import SidebarTrigger from './ui/sidebar/SidebarTrigger.vue';
import SidebarGroupLabel from './ui/sidebar/SidebarGroupLabel.vue';
import { ref } from 'vue';

import { useRoute } from 'vue-router';
import CreateCommunityModal from './CreateCommunityModal.vue';

const route = useRoute();

// Menu items.
const communityItems = [
    {
        title: 'Create post',
        url: '/posts/create',
        icon: SquarePen,
    },
    {
        title: 'Start community',
        url: '#',
        icon: UserRoundPlus,
        action: () => { isOpen.value = true }
    },
]

const resourceItems = [
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
]

const isOpen = ref(false)

const selectedSidebarClass = (item: any) => [
    'gap-5 hover:bg-light-graphite hover:text-white active:bg-light-graphite active:text-white',
    route.path === item.url
        ? 'bg-light-graphite text-white px-3'
        : 'hover:px-3'
]
</script>

<template>
    <Sidebar class="!sticky border-none" collapsible="icon">
        <SidebarContent class="bg-graphite text-white border border-light-graphite">
            <SidebarTrigger class="absolute -right-3 top-5 z-10 border border-white text-white bg-graphite" />
            <SidebarGroupLabel class="text-white/75 font-semibold text-sm">Community</SidebarGroupLabel>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu class="gap-3">
                        <SidebarMenuItem v-for="item in communityItems" :key="item.title" @click="item.action">
                            <SidebarMenuButton as-child :class="selectedSidebarClass(item)">
                                <RouterLink :to="item.url">
                                    <component :is="item.icon" class="!size-5" />
                                    <span class="text-base">{{ item.title }}</span>
                                </RouterLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroupLabel class="text-white/75 font-semibold text-sm">Resources</SidebarGroupLabel>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu class="gap-3">
                        <SidebarMenuItem v-for="item in resourceItems" :key="item.title">
                            <SidebarMenuButton as-child :class="selectedSidebarClass(item)">
                                <a :href="item.url">
                                    <component :is="item.icon" class="!size-5" />
                                    <span class="text-base">{{ item.title }}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>

    <CreateCommunityModal v-model:open="isOpen" />
</template>
