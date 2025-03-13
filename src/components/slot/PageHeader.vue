<template>
    <div :class="{ 'header': true, 'sticky': sticky, 'transparent': transparent }">
        <div class="title">{{ title }}</div>
        <div class="action">
            <mdiChevronLeft @click="router.back()" v-if="back" />
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

const {
    sticky = true,
    transparent = true,
    back = true,
} = defineProps<{
    title?: string
    sticky?: boolean
    transparent?: boolean
    back?: boolean
}>()
</script>

<style scoped lang="scss">
.header {
    position: relative;
    padding: 8px;
    background-color: white;
    backdrop-filter: blur(8px);

    &.sticky {
        position: sticky;
        top: 0;
        z-index: 10;
    }

    &.transparent {
        background-color: rgba(255, 255, 255, 0.7);
    }

    .title {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1em;
    }

    .action {
        position: relative;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9em;

        :deep(>svg) {
            padding: 0.15em;
            font-size: 2.8em;
        }
    }
}
</style>