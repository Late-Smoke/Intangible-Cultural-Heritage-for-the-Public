<script setup>
import { onMounted, ref ,watch } from 'vue';
import { useRoute } from 'vue-router';
import comprehensive from '@/components/search/result/comprehensive.vue';
import activity from '@/components/search/result/activity.vue';
import info from '@/components/slot/info.vue';
import user from '@/components/search/result/user.vue';
import { useSearchStore,useActivityStore } from '@/stores/user';
import { getInfoApi } from '@/axios/api/search';

const route = useRoute()
const searchStore = useSearchStore();
const activityStore = useActivityStore();
const infoData = ref([]);
watch(() => route.name, () => {
    if (route.name == 'cultureMap') TabName.value = 'comprehensive'
})

const TabName = ref('comprehensive');
watch(TabName, () => {
    if(TabName.value == 'activity') {
        activityStore.show = true;
    } else activityStore.show = false;
})

onMounted(() => {
    getInfoData();
})

watch(() => searchStore.ifHistory, () => {
    if (searchStore.ifHistory) {
        getInfoData();
    } 
})

function getInfoData() {
    getInfoApi(searchStore.search).then(res => {
        infoData.value = res.data.data;
    }) 
}
</script>

<template>
    <template v-if="route.name != 'cultureMap'">
        <el-tabs v-if="infoData" v-model="TabName" class="tabs">
            <el-tab-pane label="综合" name="comprehensive">
                <comprehensive />
            </el-tab-pane>
            <el-tab-pane label="活动" name="activity">
                <activity />
            </el-tab-pane>
            <el-tab-pane label="资讯" name="info">
                <info v-model="infoData" />
            </el-tab-pane>
            <el-tab-pane label="用户" name="user">
                <user />
            </el-tab-pane>
        </el-tabs>
    </template>
</template>


<style scoped>
:deep(.el-tabs__header) {
    margin: 0;
}

:deep(.el-tabs__nav-scroll) {
    margin-left: 15px;
}

:deep(.el-tabs__nav-wrap:after) {
    background-color: #fff;
}

:deep(.el-tabs__item) {
    font-size: 18px;
}

:deep(.el-tabs__active-bar) {
    background-color: rgba(152, 123, 91, 1);
}

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