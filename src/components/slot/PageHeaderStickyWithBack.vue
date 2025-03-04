<template>
    <page-header sticky :title="title">
        <mdiChevronLeft @click="router.back()" />
        <slot></slot>
    </page-header>
</template>

<script setup lang="ts">
import PageHeader from '@/components/slot/PageHeader.vue';
import router from '@/router';

defineProps<{
    title?: string
}>()
</script>

<style scoped lang="scss"></style>
