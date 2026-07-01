<script setup lang="ts">
import AppInput from '@/components/AppInput.vue';
import AppTextArea from '@/components/AppTextArea.vue';
import FormDescription from '@/components/ui/form/FormDescription.vue';
import FormMessage from '@/components/ui/form/FormMessage.vue';
import FormItem from '@/components/ui/form/FormItem.vue';
import { FormField } from '@/components/ui/form';
import Community from '@/components/layout/Community.vue';
import Tabs from '@/components/ui/tabs/Tabs.vue';
import TabsList from '@/components/ui/tabs/TabsList.vue';
import TabsTrigger from '@/components/ui/tabs/TabsTrigger.vue';
import TabsContent from '@/components/ui/tabs/TabsContent.vue';

import { ref } from 'vue';

import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

const images = ref<File[]>([]);
const activeTab = ref('content');

function handleUpdateFiles(fileItems: any[]) {
    images.value = fileItems.map((f) => f.file);
}
</script>

<template>
    <Community>
        <template #left-panel>
            <div class="flex flex-col gap-1">
                <h1 class="text-white text-2xl font-extrabold">Create a new post</h1>
                <p class="text-olive-light text-base">Share your thoughts with the community.</p>
            </div>

            <form class="flex flex-col gap-5">
                <Tabs v-model="activeTab">
                    <TabsList class="bg-transparent gap-5">
                        <TabsTrigger value="content"
                            class="text-white data-[state=active]:border-b-2 data-[state=active]:border-b-primary-green data-[state=active]:bg-transparent">
                            <p class="font-extrabold">Content</p>
                        </TabsTrigger>
                        <TabsTrigger value="images"
                            class="text-white data-[state=active]:border-b-2 data-[state=active]:border-b-primary-green data-[state=active]:bg-transparent">
                            <p class="font-extrabold">Images</p>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" class="flex flex-col gap-4 mt-4">
                        <FormField v-slot="{ componentField }" name="title">
                            <FormItem>
                                <AppInput placeholder="Title" v-bind="componentField" />
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        </FormField>
                        <FormField v-slot="{ componentField }" name="content">
                            <FormItem>
                                <AppTextArea placeholder="Content (optional)" v-bind="componentField" />
                                <FormDescription />
                                <FormMessage />
                            </FormItem>
                        </FormField>
                    </TabsContent>

                    <div v-show="activeTab === 'images'" class="mt-4">
                        <FilePond class="filepond-custom" name="post-images"
                            label-idle="<span class='filepond--label-action'>Drag images here</span> or click to select"
                            :allow-multiple="true" :max-files="5"
                            accepted-file-types="image/jpeg, image/png, image/gif, image/webp"
                            @updatefiles="handleUpdateFiles" />
                    </div>
                </Tabs>
            </form>
        </template>
        <template #right-panel></template>
    </Community>
    <RouterView />
</template>