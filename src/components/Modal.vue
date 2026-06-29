<script setup lang="ts">
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

defineProps<{
  open: boolean;
  title?: string;
  description?: string;
}>();

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void;
}>();
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="bg-graphite text-white border-light-graphite max-w-md">
      <DialogHeader v-if="title || description || $slots.header">
        <slot name="header">
          <DialogTitle v-if="title" class="text-xl font-bold text-white">{{ title }}</DialogTitle>
          <DialogDescription v-if="description" class="text-sm text-olive-light mt-1">
            {{ description }}
          </DialogDescription>
        </slot>
      </DialogHeader>
      
      <div class="mt-4">
        <slot />
      </div>

      <div v-if="$slots.footer" class="mt-6 flex justify-end gap-3">
        <slot name="footer" />
      </div>
    </DialogContent>
  </Dialog>
</template>