<script setup lang="ts">
import { Calendar, Home, Inbox, Search, Settings, UserRoundPlus } from '@lucide/vue'
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
import Modal from './Modal.vue';
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import DialogClose from './ui/dialog/DialogClose.vue';

import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from '@/components/ui/form'
import AppInput from './AppInput.vue';
import { useStoreCommunity } from '@/composables/useStoreCommunity.ts';
import { useFileInput } from '@/composables/useFileInput.ts';

// Menu items.
const communityItems = [
    {
        title: 'Criar comunidade',
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
const avatarFileName = ref('')
const coverFileName = ref('')

const { form, onSubmit, loading } = useStoreCommunity()

const { handleFileChange } = useFileInput()

const onAvatarChange = (e: Event) => {
    handleFileChange(
        e,
        (file) => form.setFieldValue('avatar', file),
        (name) => (avatarFileName.value = name)
    )
}

const onCoverChange = (e: Event) => {
    handleFileChange(
        e,
        (file) => form.setFieldValue('cover', file),
        (name) => (coverFileName.value = name)
    )
}
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
                            <SidebarMenuButton as-child
                                class="gap-5 hover:bg-light-graphite hover:text-white hover:px-3 active:bg-light-graphite active:text-white">
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
                            <SidebarMenuButton as-child
                                class="gap-5 hover:bg-light-graphite hover:text-white hover:px-3">
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

    <Modal v-model:open="isOpen" title="Create a new community"
        description="Fill in the details below to create a new community.">
        <form id="create-community-form" @submit="onSubmit" class="flex flex-col gap-4">
            <FormField v-slot="{ componentField }" name="title">
                <FormItem>
                    <AppInput label="Title" placeholder="Ex.: RPG Lovers" v-bind="componentField" />
                    <FormMessage class="text-red-500 text-xs mt-1" />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="description">
                <FormItem class="flex flex-col">
                    <FormLabel class="text-olive-light text-base font-extrabold">Description</FormLabel>
                    <FormControl>
                        <textarea v-bind="componentField" placeholder="Tell us about your community..."
                            class="bg-light-graphite border-light-graphite rounded-lg p-6 text-olive-light placeholder:text-base md:text-base w-full min-h-28 resize-y focus-visible:outline-hidden" />
                    </FormControl>
                    <FormMessage class="text-red-500 text-xs mt-1" />
                </FormItem>
            </FormField>

            <div class="grid grid-cols-2 gap-4">
                <FormField name="avatar">
                    <FormItem class="flex flex-col">
                        <FormLabel class="text-olive-light text-base font-extrabold">Avatar (Optional)</FormLabel>
                        <FormControl>
                            <label
                                class="flex flex-col items-center justify-center border border-dashed border-light-graphite/50 rounded-lg p-4 cursor-pointer hover:bg-light-graphite/30 transition text-center min-h-[80px]">
                                <span class="text-xs text-olive-light truncate max-w-full px-1">{{ avatarFileName ||
                                    'Choose image' }}</span>
                                <input type="file" accept="image/*" class="hidden" @change="onAvatarChange" />
                            </label>
                        </FormControl>
                        <FormMessage class="text-red-500 text-xs mt-1" />
                    </FormItem>
                </FormField>

                <FormField name="cover">
                    <FormItem class="flex flex-col">
                        <FormLabel class="text-olive-light text-base font-extrabold">Cover (Optional)</FormLabel>
                        <FormControl>
                            <label
                                class="flex flex-col items-center justify-center border border-dashed border-light-graphite/50 rounded-lg p-4 cursor-pointer hover:bg-light-graphite/30 transition text-center min-h-[80px]">
                                <span class="text-xs text-olive-light truncate max-w-full px-1">{{ coverFileName ||
                                    'Choose image' }}</span>
                                <input type="file" accept="image/*" class="hidden" @change="onCoverChange" />
                            </label>
                        </FormControl>
                        <FormMessage class="text-red-500 text-xs mt-1" />
                    </FormItem>
                </FormField>
            </div>
        </form>

        <template #footer>
            <DialogClose as-child>
                <AppButton variant="destructive" type="button">Cancel</AppButton>
            </DialogClose>
            <AppButton type="submit" form="create-community-form" variant="glow" :disabled="loading">
                <template v-if="loading">Creating...</template>
                <template v-else>Create community</template>
            </AppButton>
        </template>
    </Modal>
</template>
