<script setup>
import { ref , watch } from 'vue'
import router from '@/router';
import { useActivityStore } from '@/stores/user';
import Exhibition from '@/components/slot/exhibition.vue'
import Calendar from '@/components/slot/calendar.vue'
const position = useActivityStore().position;
const handleCity = () => {
    router.push('/searchView/result/activity/cityView');
}

const selectedType = ref('all'); 
const handleType = (type) => {
    selectedType.value = type;
}

</script>
<template>
    <div class="container">
        <div class="btn-box">
            <div class="btn">
                <el-button class="position-btn" text @click="handleCity">{{ position }}</el-button>            
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12.0008 14.58L17 10" stroke="#0A090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>        
            <svg width="2" height="23" viewBox="0 0 2 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 22.0239L1 1.00013" stroke="#BBB6B6" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div style="width:120px">
            <calendar />
            </div>
        </div>
        <div class="type-box">
            <span
        @click="handleType('all')"
        :class="{ active: selectedType === 'all' }"
        >全部类型</span>
        <span
        @click="handleType('exhibition')"
        :class="{ active: selectedType === 'exhibition' }"
        >非遗展览</span>
        <span
        @click="handleType('activity')"
        :class="{ active: selectedType === 'activity' }"
        >非遗活动</span>
        </div>
        <exhibition />
    </div>

</template>


<style scoped>
.container {
    padding: 10px 15px;
}

/*btn-box*/
.btn-box {
    display: flex;
    padding: 0 20px;
    border: solid 1px #D5D5D5;
    border-radius: 14px;
    align-items: center;
    justify-content: space-around; 
}
.btn {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.position-btn, .time-btn  {
    font-size: 18px;
    color: #000000;
    padding-right: 0px;
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

</style>