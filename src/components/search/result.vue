<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useActivityStore } from '@/stores/user';
import { useRoute } from 'vue-router';

const route = useRoute()

const activity = useActivityStore();

const selectedTab = ref('comprehensive');
const handleTabClick = (tab) => {
    if (tab == 'activity') activity.changeShow(true);
    else activity.changeShow(false);
    selectedTab.value = tab;
    router.push(`/searchView/result/${tab}`);
}

onMounted(() => {
    if (activity.show) handleTabClick('activity');
    else if (!route.path.startsWith('/searchView/result/comprehensive'))
        handleTabClick(selectedTab.value);
})
</script>

<template>
    <div class="title">
        <div class="tab">
            <span @click="handleTabClick('comprehensive')">综合</span>
            <svg v-show="selectedTab == 'comprehensive'" width="25" height="2" viewBox="0 0 25 2" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('activity')">活动</span>
            <svg v-show="selectedTab == 'activity'" width="25" height="2" viewBox="0 0 25 2" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('info')">资讯</span>
            <svg v-show="selectedTab == 'info'" width="25" height="2" viewBox="0 0 25 2" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('user')">用户</span>
            <svg v-show="selectedTab == 'user'" width="25" height="2" viewBox="0 0 25 2" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
    </div>
    <div class="router">
        <router-view />
    </div>
</template>


<style scoped>
.title {
    display: flex;
    margin: 5px 15px;
    font-size: 18px;
    gap: 40px;
}

.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}
</style>