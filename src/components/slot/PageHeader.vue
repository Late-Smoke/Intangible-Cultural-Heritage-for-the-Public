<template>
    <div :class="{ 'header': true, 'sticky': sticky }">
        <div class="title">{{ title }}</div>
        <div class="action">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const { sticky = false } = defineProps<{
    title?: string
    sticky?: boolean
}>()
</script>

<style scoped lang="scss">
.header {
    position: relative;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);

    &.sticky {
        position: sticky;
        top: 0;
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

        :deep(>svg) {
            padding: 0.15em;
            font-size: 2.5em;
        }
    }
}
</style>