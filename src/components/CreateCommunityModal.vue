<script setup lang="ts">
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
import AppTextArea from './AppTextArea.vue';
import vueFilePond from 'vue-filepond';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import Modal from './Modal.vue';
import { ref } from 'vue';

const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);

defineProps<{
    open: boolean;
}>()
defineEmits<{
    (e: 'update:open', value: boolean): void
}>()

const { form, onSubmit, loading } = useStoreCommunity()

const onAvatarUpdate = (fileItems: any[]) => {
    form.setFieldValue('avatar', fileItems[0]?.file ?? null)
}

const onCoverUpdate = (fileItems: any[]) => {
    form.setFieldValue('cover', fileItems[0]?.file ?? null)
}

const currentStep = ref(0);
function handleNextStepClick() {
    if (form.values.title && form.values.description) {
        currentStep.value = 1;
    } else {
        form.validate();
    }
}

</script>
<template>
    <Modal :open="open" @update:open="$emit('update:open', $event)" title="Create a new community"
        description="Fill in the details below to create a new community.">
        <form id="create-community-form" @submit="onSubmit">
            <div v-show="currentStep == 0" class="flex flex-col gap-4">
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
                            <AppTextArea v-bind="componentField" placeholder="Tell us about your community..."
                                class="bg-light-graphite border-light-graphite rounded-lg p-6 text-olive-light placeholder:text-base md:text-base w-full min-h-28 resize-y focus-visible:outline-hidden" />
                        </FormControl>
                        <FormMessage class="text-red-500 text-xs mt-1" />
                    </FormItem>
                </FormField>
            </div>
            <div class="grid grid-cols-2 gap-4" v-show="currentStep == 1">
                <FormField name="avatar">
                    <FormItem class="flex flex-col">
                        <FormLabel class="text-olive-light text-base font-extrabold">Avatar (Optional)</FormLabel>
                        <FormControl>
                            <FilePond class="filepond-custom" name="avatar" label-idle="Avatar" :allow-multiple="false"
                                :max-files="1" accepted-file-types="image/jpeg, image/png, image/gif, image/webp"
                                @updatefiles="onAvatarUpdate" />
                        </FormControl>
                        <FormMessage class="text-red-500 text-xs mt-1" />
                    </FormItem>
                </FormField>

                <FormField name="cover">
                    <FormItem class="flex flex-col">
                        <FormLabel class="text-olive-light text-base font-extrabold">Cover (Optional)</FormLabel>
                        <FormControl>
                            <FilePond class="filepond-custom" name="cover" label-idle="Cover" :allow-multiple="false"
                                :max-files="1" accepted-file-types="image/jpeg, image/png, image/gif, image/webp"
                                @updatefiles="onCoverUpdate" />
                        </FormControl>
                        <FormMessage class="text-red-500 text-xs mt-1" />
                    </FormItem>
                </FormField>
            </div>
        </form>

        <template #footer>
            <DialogClose as-child v-if="currentStep == 0">
                <AppButton variant="destructive" type="button">
                    Cancel
                </AppButton>
            </DialogClose>
            <AppButton v-if="currentStep > 0" @click="currentStep = 0" variant="destructive">Back</AppButton>

            <AppButton v-if="currentStep == 0" @click="handleNextStepClick" variant="glow">Next</AppButton>
            <AppButton v-else type="submit" form="create-community-form" variant="glow" :disabled="loading">
                <template v-if="loading">Creating...</template>
                <template v-else>Create community</template>
            </AppButton>
        </template>
    </Modal>
</template>