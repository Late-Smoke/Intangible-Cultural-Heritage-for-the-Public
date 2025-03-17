<template>
    <template v-if="response">
        <template v-if="response.success && (typeof response.data != 'string')">
            <div v-if="Array.isArray(response.data) && response.data.length == 0" class="error">
                <div class="icon">
                    <mdiHumanGreetingVariant />
                </div>
                <div class="text">这里什么都没有~</div>
            </div>

            <slot v-else></slot>
        </template>

        <div v-else class="error">
            <div class="icon">
                <mdiAlertCircleOutline />
            </div>
            <div class="text">{{ response.data || response.errorMsg }}</div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { Response } from "@/axios/api/common";

const response = defineModel<Response<any>>({ required: true })
</script>

<style scoped lang="scss">
.error {
    text-align: center;
    padding: 40px 0;
    color: #555;

    .icon>svg {
        font-size: 3em;
        color: #888;
    }
}
</style>
