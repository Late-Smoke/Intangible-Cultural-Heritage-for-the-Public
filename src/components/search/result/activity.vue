<script setup>
import { ref } from 'vue'

const selectedType = ref('all'); 
const title = ref('开封市禹王台区汪屯大李庄非遗展示馆');
const time = ref('2023-02-23 12:00');
const tag = ref('打铁花');
const handleType = (type) => {
    selectedType.value = type;
}
</script>
<template>
    <div class="container">
        <div class="btn-box">
            <div class="btn">
                <el-button class="position-btn" text @click="handlePosition">全国</el-button>            
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12.0008 14.58L17 10" stroke="#0A090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>        
            <svg width="2" height="23" viewBox="0 0 2 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 22.0239L1 1.00013" stroke="#BBB6B6" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <div class="btn">
                <el-button class="time-btn" text @click="handleTime">全部时间</el-button>
                <svg class="timeIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12.0008 14.58L17 10" stroke="#0A090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
        <div class="activity-box">
                <div class="item-img"></div>
                <div class="item-info">
                    <div class="item-title">
                        <span>{{ title }}</span>
                    </div>
                    <div class="item-tag">
                        <el-tag class="tag" effect="plain">{{ tag }}</el-tag>
                        <el-tag class="tag" effect="plain">{{ tag }}</el-tag>
                        <el-tag class="tag" effect="plain">{{ tag }}</el-tag>
                        <el-tag class="tag" effect="plain">{{ tag }}</el-tag>
                    </div>
                    <div class="item-time">                        
                        <div class="time-title">                            
                            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.0315 11.4679C11.359 11.5771 11.7129 11.4001 11.8221 11.0726C11.9312 10.7452 11.7543 10.3912 11.4268 10.2821L11.0315 11.4679ZM8.41666 9.9375H7.79166C7.79166 10.2065 7.9638 10.4454 8.21901 10.5304L8.41666 9.9375ZM9.04166 6.01739C9.04166 5.67221 8.76183 5.39239 8.41666 5.39239C8.07148 5.39239 7.79166 5.67221 7.79166 6.01739H9.04166ZM11.4268 10.2821L8.6143 9.34457L8.21901 10.5304L11.0315 11.4679L11.4268 10.2821ZM9.04166 9.9375V6.01739H7.79166V9.9375H9.04166ZM15.2917 9C15.2917 12.797 12.2136 15.875 8.41666 15.875V17.125C12.904 17.125 16.5417 13.4873 16.5417 9H15.2917ZM8.41666 15.875C4.6197 15.875 1.54166 12.797 1.54166 9H0.291656C0.291656 13.4873 3.92934 17.125 8.41666 17.125V15.875ZM1.54166 9C1.54166 5.20304 4.6197 2.125 8.41666 2.125V0.875C3.92934 0.875 0.291656 4.51269 0.291656 9H1.54166ZM8.41666 2.125C12.2136 2.125 15.2917 5.20304 15.2917 9H16.5417C16.5417 4.51269 12.904 0.875 8.41666 0.875V2.125Z" fill="black"/>
                            </svg>
                            <span>开放时间：</span>
                        </div>
                        <div class="time-content">
                            <span>{{ time }}</span>
                        </div>
                    </div>
                    <div class="item-address">
                        
                    </div>
                </div>
        </div>
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
.activity-box {
    width: 100%;
    height: 199px;
    display: flex;
    position: relative;
    border: solid 1px #987B5B;
    border-left: none;
    border-radius: 7px;
    background: linear-gradient(279.36deg, #FFF6E9 0%, #FFFFFF 93.53%);
}
.item-img {
    flex: 0 0 150px; 
    height: 199px;
    position: relative;
    top: -1px;
    left: -1px;
    background-color: #D5D5D5; 
}
.item-info {
    padding: 10px;
}
.item-title {
    font-size: 18px;
}
.item-tag {
    display: flex;
    padding: 10px 0;
    justify-content: space-around;
}
.tag {
    border: 0.5px solid #6C5944;
    border-radius: 4px;
    color: #766450;
    font-size: 10px;
    padding: 0 5px;
}
.item-time {
   font-size: 14px; 
}
.time-title {
    display: flex;
    align-items: center;
    gap: 5px; 
}
.time-content {
    padding-left: 20px;;
}
</style>