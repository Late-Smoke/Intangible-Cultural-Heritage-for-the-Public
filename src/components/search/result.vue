<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useActivityStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import comprehensive from '@/components/search/result/comprehensive.vue';
import activity from '@/components/search/result/activity.vue';
import info from '@/components/slot/info.vue';
//import map from '@/components/search/result/map.vue';
import user from '@/components/search/result/user.vue';

const TabName = ref('comprehensive');
</script>

<template>
    <el-tabs v-model="TabName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="综合" name="comprehensive">
            <comprehensive />
        </el-tab-pane>
        <el-tab-pane label="综合" name="activity">
            <activity />
        </el-tab-pane>
        <el-tab-pane label="资讯" name="info">
            <info />
        </el-tab-pane>
        <el-tab-pane label="地图" name="map">地图</el-tab-pane>
        <el-tab-pane label="用户" name="user">
            <user />
        </el-tab-pane>
    </el-tabs>
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