<script setup>
import { computed, ref, watch, watchEffect, onMounted } from 'vue'
import router from '@/router';
import { useSearchStore, useActivityStore } from '@/stores/user';
import { getActivitiesApi } from '@/axios/api/search';
import ActivityListItem from '@/components/activity/ActivityListItem.vue';
import Calendar from '@/components/slot/calendar.vue'

const searchStore = useSearchStore();
const activityStore = useActivityStore();
const handleCity = () => {
    router.push('/searchView/result/activity/cityView');
}
const isOnline = ref(true);

const params = ref({
    keyword: computed(() => searchStore.search),
    firstType: computed(() => (isOnline.value) ? '线上' : '线下'),
    secondType: '非遗活动',
    city: computed(() => (activityStore.position == '全国') ? '' : activityStore.position + '市'),
    startTime: computed(() => activityStore.startTime),
    endTime: computed(() => activityStore.endTime),
})

const data = ref([]);

function getActivities() {
    if (!searchStore.search) return;
    getActivitiesApi(params.value).then(res => {
        data.value = res.data.data;
        console.log(params.value.startTime, params.value.endTime);
    })
}

watch(isOnline, () => {
    if (isOnline.value) params.value.secondType = '非遗活动';
    else params.value.secondType = '';
})

watch(params.value, () => {
    if(searchStore.ifSearch)
    getActivities();
}, { immediate: true });

watch(() => searchStore.ifHistory, (newValue) => {
    if (newValue) {
        console.log('activity-search');
        getActivities();
    }
})
</script>
<template>
    <div class="container">
        <div class="head">
            <div class="btn-box">
                <div v-show="!isOnline" class="btn">
                    <el-button class="position-btn" text @click="handleCity">{{ activityStore.position }}</el-button>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 10L12.0008 14.58L17 10" stroke="#0A090B" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </div>
                <svg v-show="!isOnline" width="2" height="23" viewBox="0 0 2 23" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 22.0239L1 1.00013" stroke="#BBB6B6" stroke-width="1.5" stroke-linecap="round" />
                </svg>
                <div>
                    <calendar />
                </div>
            </div>
            <div class="small-btn">
                <div @click="isOnline = true" :class="{ selectOnline: isOnline }">线上</div>
                <div @click="isOnline = false" :class="{ selectOnline: !isOnline }">线下</div>
            </div>
        </div>
        <div class="type-box">
            <span v-show="!isOnline" @click="params.secondType = ''"
                :class="{ active: params.secondType == '' }">全部类型</span>
            <span v-show="!isOnline" @click="params.secondType = '非遗展览'"
                :class="{ active: params.secondType == '非遗展览' }">非遗展览</span>
            <span @click="params.secondType = '非遗活动'" :class="{ active: params.secondType == '非遗活动' }">非遗活动</span>
        </div>
        <ActivityListItem class="activity-item" v-for="a in data" :activity="a" bottom="address" />
    </div>

</template>


<style scoped>
.container {
    padding: 10px 15px;
}

.head {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/*btn-box*/
.btn-box {
    display: flex;
    width: fit-content;
    padding: 0 15px;
    border: solid 1px #D5D5D5;
    border-radius: 14px;
    align-items: center;
    justify-content: flex-start;
}

.btn {
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 10px;
}

.position-btn,
.time-btn {
    font-size: 18px;
    color: #000000;
    padding-right: 0px;
}

/*small-btn*/
.small-btn {
    display: flex;
    border: solid 1px rgba(213, 213, 213, 1);
    border-radius: 14px;
    padding: 1.5px;
}

.small-btn div {
    padding: 5px 5px;
    border-radius: 14px;
    color: rgba(0, 0, 0, 1);
}

.selectOnline {
    border-radius: 12px;
    background-color: rgba(205, 173, 134, 1);
    color: rgba(255, 255, 255, 1) !important;
    transform: smooth;
}

/*type-box*/
.type-box {
    display: flex;
    padding: 15px 0;
    gap: 20px;
}

.type-box span {
    padding: 5px 10px;
    cursor: pointer;
}

.active {
    border-radius: 16px;
    background-color: #F0E4D4;
}

/*activity-box*/
.activity-item {
    margin: 0 0 12px 0;
}
</style>