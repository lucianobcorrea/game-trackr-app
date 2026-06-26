<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppSidebar from '@/components/AppSidebar.vue';
import CommunityListItem from '@/components/CommunityListItem.vue';
import Header from '@/components/layout/Header.vue';
import Post from '@/components/Post.vue';
import SidebarProvider from '@/components/ui/sidebar/SidebarProvider.vue';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { useCommunities } from '@/composables/useCommunities';

const { communities, loading, error } = useCommunities(5);
</script>

<template>
    <Header />
    <SidebarProvider>
        <AppSidebar />
        <main class="flex-1 grid grid-cols-[2fr_1fr] w-full">
            <section class="px-24 pt-6 flex flex-col gap-5 pb-12">
                <Post />
                <Post />
                <Post />
            </section>
            <section class="mx-auto pb-14 pt-6 pr-4 md:pr-8 lg:pr-12">
                <AppCard title="Communities" description="Choose communities to join." class="sticky top-6">
                    <template #content>
                        <template v-if="loading">
                            <div class="flex justify-center">
                                <Spinner class="text-primary-green size-8" />
                            </div>
                        </template>

                        <template v-else-if="error">
                            <p class="text-red-500">Error: {{ error }}</p>
                        </template>

                        <template v-else>
                            <div class="flex flex-col gap-5">
                                <CommunityListItem v-for="community in communities" :key="community.id"
                                    :id="community.id" :title="community.title" :description="community.description"
                                    :members="community.members.length" :avatar="community.avatar_url" />
                            </div>
                        </template>
                    </template>

                    <template #footer>
                        <AppButton variant="blue-outline" class="w-full">See more</AppButton>
                    </template>
                </AppCard>
            </section>
        </main>
    </SidebarProvider>
</template>