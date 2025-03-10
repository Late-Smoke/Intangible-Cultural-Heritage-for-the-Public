<template>
    <div class="tags" v-if="typeof tags == 'string'">
        <span v-for="tag in splitStringBySpace(tags)" :style="{ color, borderColor: color }">{{ tag }}</span>
    </div>
</template>

<script setup lang="ts">
import { splitStringBySpace } from '@/utils';

defineProps<{
    tags: string | null
    color?: string
}>()
</script>

<style scoped lang="scss">
.tags {
    font-size: 0.8em;
    color: #666;

    >span {
        padding: 1px 4px;
        border: 1px solid #666;
        margin-right: 4px;
        border-radius: 4px;
    }
}
</style>
