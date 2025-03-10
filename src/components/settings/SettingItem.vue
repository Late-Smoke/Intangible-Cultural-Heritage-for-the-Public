<template>
    <div class="setting">
        {{ setting.name }}
        <el-switch size="large" :loading="setting.loading" v-model="setting.value" :before-change="() => setting.action()" />
    </div>
</template>

<script setup lang="ts">
const { setting } = defineProps<any>()

</script>

<style scoped lang="scss">
.setting {
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
