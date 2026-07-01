<script setup lang="ts">
defineProps<{
    label: string
    id: string
    name: string
    value: string
    checked?: boolean
}>()
</script>

<template>
    <div>
        <input type="radio" :value="value" :name="name" :id="id" class="peer hidden" :checked="checked" />
        <label :for="id"
            class="peer-checked:text-black peer-checked:border-primary-green cursor-pointer peer-checked:bg-primary-green border border-light-graphite py-2 px-4 rounded-lg">{{
                label }}</label>
    </div>
</template>