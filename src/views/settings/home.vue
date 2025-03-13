<template>
    <SvgBackgroundDragon />
    <PageHeader title="设置" />

    <div class="root">
        <div class="setting" @click="router.push({ name: 'accountSettings' })">
            <span>
                <mdiAccountOutline />账号与安全
            </span>
            <mdiChevronRight />
        </div>

        <div class="setting" @click="router.push({ name: 'notificationsSettings' })">
            <span>
                <mdiBellOutline />通知设置
            </span>
            <mdiChevronRight />
        </div>

        <div class="setting" @click="router.push({ name: 'privacySettings' })">
            <span>
                <mdiAccountLockOutline />隐私设置
            </span>
            <mdiChevronRight />
        </div>

        <ElButton class="btn-action" type="primary" size="large" @click="comfirmLogout">退出登录</ElButton>
    </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/slot/PageHeader.vue';
import router from '@/router';
import { removeToken } from '@/axios/axios';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';
import { ElMessageBox } from 'element-plus';


function comfirmLogout() {
    ElMessageBox.confirm('确定要退出登录吗?', '退出登录').then(() => {
        removeToken()
        router.push({ name: 'mainPageView' }).then(() => router.go(0))
    }).catch(() => { })
}

</script>

<style scoped lang="scss">
.root {
    display: flex;
    flex-direction: column;
    min-height: 100%;

    .setting {
        padding: 0 24px;
        height: 54px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        // border-bottom: 1px solid #ddd;

        span {
            display: flex;
            align-items: center;
            gap: 8px;

            >svg {
                font-size: 1.7em;
            }
        }

        >svg {
            font-size: 1.5em;
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;
        // color: rgb(255, 64, 64);
        border-top: 1px solid #ddd;

        >svg {
            margin-right: 4px;
        }
    }

    .btn-action {
        margin: 16px 15%;
    }
}
</style>
