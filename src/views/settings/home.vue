<template>
    <SvgBackgroundDragon />
    <page-header-sticky-with-back title="设置" />

    <div class="root">
        <div class="setting" @click="">
            个人资料
            <mdiChevronRight />
        </div>

        <div class="setting" @click="router.push({ name: 'privacySettings' })">
            隐私设置
            <mdiChevronRight />
        </div>

        <div class="setting" @click="router.push({ name: 'notificationsSettings' })">
            通知设置
            <mdiChevronRight />
        </div>

        <div class="setting action" @click="logout.show()">
            <mdiLogout />退出登录
        </div>
    </div>

    <ConfirmDialog v-model="logout.showing" content="确定退出登录吗?" :action="logout.confirm" />
</template>

<script setup lang="ts">
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import router from '@/router';
import { removeToken } from '@/axios/axios';
import { reactive } from 'vue';
import ConfirmDialog from '@/components/slot/ConfirmDialog.vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';

const logout = reactive({
    showing: false,
    show() {
        logout.showing = true
    },
    confirm() {
        removeToken()
        router.push({ name: 'mainPageView' }).then(() => router.go(0))
    }
})

</script>

<style scoped lang="scss">
.root {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    .setting {
        padding: 16px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;

        >svg {
            font-size: 1.5em;
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgb(255, 64, 64);

        >svg {
            margin-right: 4px;
        }
    }
}
</style>
