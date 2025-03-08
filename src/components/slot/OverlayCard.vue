<template>
    <div :class="{ 'overlay-card': true, 'bottom': bottom }" @click="closeAction">
        <div class="card" :style="{ height: height }" @click.stop="">
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
    title?: string
    height?: string
    bottom?: boolean
    closeAction: () => any
}>()
</script>

<style scoped lang="scss">
.overlay-card {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 50;
    overflow: auto;
    animation: show-overlay 0.2s;

    .card {
        margin-top: 25vh;
        min-height: 75vh;
        background-color: white;
        border-radius: 16px 16px 0 0;
        animation: show-card 0.2s;

        .card-title {
            position: sticky;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 12px;
            border-radius: 16px 16px 0 0;
            background-color: white;
        }
    }

    &.bottom {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .card {
            margin: 0;
            min-height: initial;
        }
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