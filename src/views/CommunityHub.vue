<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';
import AppCard from '@/components/AppCard.vue';
import AppRadioButton from '@/components/AppRadioButton.vue';
import CommunityListItem from '@/components/CommunityListItem.vue';
import Post from '@/components/Post.vue';
import Spinner from '@/components/ui/spinner/Spinner.vue';
import { useJoinCommunity } from '@/composables/useJoinCommunity';
import { useLeaveCommunity } from '@/composables/useLeaveCommunity';
import { useCommunities } from '@/composables/useListCommunities';
import { RouterView } from 'vue-router';
import Community from '@/components/layout/Community.vue';

const { communities, loading, error, refresh } = useCommunities(5);
const { join, loading: loadingJoin, error: errorJoin } = useJoinCommunity(refresh);
const { leave, loading: loadingLeave, error: errorLeave } = useLeaveCommunity(refresh);
</script>

<template>
    <Community>
        <template #left-panel>
            <div class="bg-graphite border border-primary-green/25 p-4 rounded-lg">
                <div class="flex items-center gap-4">
                    <AppRadioButton label="Latest" id="latest" name="sort" value="latest" checked />
                    <AppRadioButton label="Top rated" id="topRated" name="sort" value="top_rated" />
                    <AppRadioButton label="Following" id="following" name="sort" value="following" />
                </div>
            </div>

            <div class="flex flex-col gap-5">
                <Post />
                <Post />
                <Post />
            </div>
        </template>

        <template #right-panel>
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
                        <div class="flex flex-col gap-5" v-if="communities?.length > 0">
                            <CommunityListItem v-for="community in communities" :key="community.id"
                                :join="() => join(community.id)" :leave="() => leave(community.id)"
                                :isMember="community.is_member" :slug="community.slug" :id="community.id"
                                :title="community.title" :description="community.description"
                                :members="community.members.length" :avatar="community.avatar_url" />
                        </div>

                        <div v-else>
                            <p class="text-center text-gray-500">No communities found.</p>
                        </div>
                    </template>
                </template>

                <template #footer>
                    <AppButton variant="blue-outline" class="w-full">See more</AppButton>
                </template>
            </AppCard>
        </template>
    </Community>
    <RouterView />
</template>