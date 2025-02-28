<template>
    <div class="overlay-card" @click="closeAction">
        <div class="card" @click="e => e.stopPropagation()" :style="{ height: cardHeight }">
            <div class="card-title">
                <div>{{ title }}</div>
                <el-button text circle icon="close" @click="closeAction"></el-button>
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    title?: string,
    cardHeight?: string,
    closeAction: () => any,
}>()
</script>

<style scoped lang="less">
.overlay-card {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 50;
    padding-top: 25vh;
    overflow: auto;
    animation: show-overlay 0.2s;

    .card-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
    }

    .card {
        min-height: 100%;
        background-color: white;
        border-radius: 16px 16px 0 0;
        animation: show-card 0.2s;
    }

    @keyframes show-card {
        from {
            transform: translateY(100%);
        }

        to {
            transform: translateY(0);
        }
    }
}

@keyframes show-overlay {
    from {
        background-color: rgba(0, 0, 0, 0);
    }

    to {
        background-color: rgba(0, 0, 0, 0.25);
    }
}
</style>