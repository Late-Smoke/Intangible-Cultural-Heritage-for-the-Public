<template>
    <div class="error">
        <div>{{ message }}</div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    message: string
}>()
</script>

<style scoped>
.error {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>