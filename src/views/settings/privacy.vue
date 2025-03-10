<template>
    <SvgBackgroundDragon />
    <page-header-sticky-with-back title="隐私设置" />

    <div class="setting" v-for="setting in Self.PrivacySettingsController.settings">
        {{ setting.name }}
        <el-switch size="large" :loading="setting.loading" v-model="setting.value" :before-change="() => setting.action()" />
    </div>
</template>

<script setup lang="ts">
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';

onMounted(() => {
    Self.PrivacySettingsController.load()
})
</script>

<style scoped lang="scss">
.setting {
    padding: 8px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>
