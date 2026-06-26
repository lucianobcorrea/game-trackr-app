<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings } from '@lucide/vue'
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

// Menu items.
const items = [
    {
        title: 'Home',
        url: '#',
        icon: Home,
    },
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
</script>

<template>
    <Sidebar class="!sticky border-none" collapsible="icon">
        <SidebarContent class="bg-graphite text-white border border-light-graphite">
            <SidebarTrigger class="absolute -right-3 top-5 z-10 border border-white text-white bg-graphite" />
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu class="gap-3">
                        <SidebarMenuItem v-for="item in items" :key="item.title">
                            <SidebarMenuButton as-child class="gap-5 hover:bg-light-graphite hover:text-white hover:px-3">
                                <a :href="item.url">
                                    <component :is="item.icon" class="!size-5"/>
                                    <span class="text-base">{{ item.title }}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
</template>
