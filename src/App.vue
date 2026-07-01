<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
import TooltipProvider from './components/ui/tooltip/TooltipProvider.vue';
</script>

<template>
  <TooltipProvider>
    <RouterView />
  </TooltipProvider>
  <Toaster position="top-right" closeButton closeButtonPosition="top-right" />
</template>