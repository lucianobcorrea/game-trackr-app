<script setup lang="ts">
import Header from './Header.vue';
import SidebarProvider from '../ui/sidebar/SidebarProvider.vue';
import AppSidebar from '../AppSidebar.vue';

</script>
<template>
    <Header />
    <SidebarProvider>
        <AppSidebar />
        <main class="flex-1 grid grid-cols-[2fr_1fr] w-full">
            <section class="px-24 pt-6 flex flex-col gap-5 pb-12">
                <slot name="left-panel" />
            </section>
            <section class="pb-14 pt-6 pr-4 md:pr-8 lg:pr-12">
                <slot name="right-panel" />
            </section>
        </main>
    </SidebarProvider>
</template>