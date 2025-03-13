<template>
    <SvgBackgroundDragon />
    <PageHeader title="通知设置" />

    <div class="setting">
        回复我的
        <el-switch size="large" v-model="settings.reply" />
    </div>

    <div class="setting">
        新增关注
        <el-switch size="large" v-model="settings.follow" />
    </div>

    <div class="setting">
        收到的赞
        <el-switch size="large" v-model="settings.love" />
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/slot/PageHeader.vue';
import * as Notifications from '@/axios/api/notifications'
import { reactive } from 'vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';

const settings = reactive({
    reply: true,
    follow: true,
    love: true,
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
