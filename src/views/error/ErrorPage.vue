<template>
    <div class="error">
        <mdiCloseCircleOutline />
        {{ message || '找不到此页面' }}
        <el-button type="info" plain style="margin-top: 12px;" @click="router.push({name:'mainPageView'})">返回主页</el-button>

        <div class="btn-back" @click="router.back()">
            <mdiChevronLeft />返回
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';

defineProps<{
    message?: string
}>()
</script>

<style scoped lang="scss">
.error {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #555;
    position: relative;

    >svg {
        color: #888;
        font-size: 4em;
    }

    .btn-back {
        position: fixed;
        top: 0;
        left: 0;
        padding: 12px;
        display: flex;
        align-items: center;
        color: black;

        >svg {
            font-size: 2em;
        }
    }
}
</style>