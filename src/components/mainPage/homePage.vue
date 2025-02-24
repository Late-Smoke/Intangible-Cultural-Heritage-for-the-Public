<script setup>
import { ref , onMounted } from 'vue';
import router from '@/router';
import { useScrollStore } from '@/stores/user';

const handleInput = () => {
    router.push('/searchView');
}
const photoClick = () => {
    router.push('/searchView/pictureView');
}

const selectedTab = ref('cultureMap');
const handleTabClick = (tab) => {
    selectedTab.value = tab;
    router.push(`/mainPageView/homePage/${tab}`);
}

const scrollStore = useScrollStore();
const scrollRef = ref(null);
scrollStore.setScrollContainer(scrollRef);
const scrolling = (e) => {
    const clientHeight = e.target.clientHeight;
    const scrollHeight = e.target.scrollHeight;
    const scrollTop = e.target.scrollTop;
    if (!scrollTop){
        scrollStore.changeScrollTop(true);
        scrollStore.changeScrollBottom(false);
    }
    else{
        scrollStore.changeScrollTop(false);
        if (scrollTop + clientHeight >= scrollHeight) {
            scrollStore.changeScrollBottom(true);
        }
    }
  }

onMounted(() => {
//    handleTabClick('cultureMap'); 
})
</script>

<template>
    <el-header>
        <el-input 
        class="homePage-input"
            v-model="search" 
            style="width:257px;height:32px;font-size: 18px;color:#BBB6B6;" 
            placeholder="搜获帖子、活动或用户" 
            size="default"
            @click="handleInput">
            <template #prefix>
                <svg width="16.8" height="16.8" style="margin-right:5px;" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9269 14.5401L18.4 17.9001M17.28 8.9401C17.28 13.27 13.7699 16.7801 9.44001 16.7801C5.11009 16.7801 1.60001 13.27 1.60001 8.9401C1.60001 4.61019 5.11009 1.1001 9.44001 1.1001C13.7699 1.1001 17.28 4.61019 17.28 8.9401Z" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </template>
            <template #suffix>
                <svg @click="photoClick" width="28" height="25" style="margin:0;" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8602 6.6129V24C28.8602 24.3682 28.5617 24.6667 28.1935 24.6667H2C1.63181 24.6667 1.33333 24.3682 1.33333 24V13.4194V6.6129C1.33333 6.24471 1.63181 5.94624 2 5.94624H3.35484H5.04052C6.65148 5.94624 8.03191 4.79416 8.32009 3.20919L8.56163 1.88074C8.61926 1.56375 8.89535 1.33333 9.21754 1.33333H15.0968H20.976C21.2982 1.33333 21.5743 1.56375 21.6319 1.88074L21.8735 3.20919C22.1616 4.79415 23.5421 5.94624 25.153 5.94624H26.8387H28.1935C28.5617 5.94624 28.8602 6.24471 28.8602 6.6129ZM0 6.6129C0 5.50833 0.89543 4.6129 2 4.6129H3.35484H5.04052C6.0071 4.6129 6.83536 3.92166 7.00826 2.97067L7.2498 1.64223C7.42271 0.691249 8.25097 0 9.21754 0H15.0968H20.976C21.9426 0 22.7708 0.691248 22.9437 1.64223L23.1853 2.97067C23.3582 3.92165 24.1864 4.6129 25.153 4.6129H26.8387H28.1935C29.2981 4.6129 30.1935 5.50833 30.1935 6.6129V24C30.1935 25.1046 29.2981 26 28.1935 26H2C0.895432 26 0 25.1046 0 24V13.4194V6.6129ZM9.89249 13.8666C9.89249 11.2085 12.0473 9.05368 14.7054 9.05368C17.3635 9.05368 19.5183 11.2085 19.5183 13.8666C19.5183 15.2123 18.966 16.4291 18.0757 17.3025L18.0722 17.3059C17.2042 18.1556 16.016 18.6795 14.7054 18.6795C12.0473 18.6795 9.89249 16.5247 9.89249 13.8666ZM20.8516 13.8666C20.8516 15.34 20.3331 16.6924 19.4687 17.7511L21.4313 19.6498C21.6959 19.9058 21.7029 20.3279 21.4469 20.5925C21.1909 20.8571 20.7688 20.8641 20.5042 20.6081L18.5186 18.6872C17.4708 19.5172 16.146 20.0128 14.7054 20.0128C11.3109 20.0128 8.55916 17.2611 8.55916 13.8666C8.55916 10.4721 11.3109 7.72035 14.7054 7.72035C18.0999 7.72035 20.8516 10.4721 20.8516 13.8666Z" fill="#BBB6B6"/>
                </svg>
            </template>
        </el-input>
        <div @click="handlePost" class="post-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5365 19.2428L13.2788 18.4109C14.1896 17.3902 15.8236 17.5229 16.5577 18.6772C17.2416 19.7525 18.7274 19.9563 19.6757 19.105L21.0211 17.8969M2.97888 19.4699L7.34487 18.5902C7.57664 18.5435 7.78946 18.4293 7.9566 18.2621L17.7303 8.48307C18.1989 8.01422 18.1986 7.25423 17.7296 6.78577L15.6591 4.71769C15.1903 4.24942 14.4307 4.24974 13.9623 4.7184L4.18764 14.4985C4.02083 14.6654 3.90693 14.8777 3.86018 15.109L2.97888 19.4699Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            发帖
        </div>
    </el-header>
    <div class="title">
        <div class="tab">
            <span @click="handleTabClick('cultureMap')">非遗地图</span>            
            <svg v-show="selectedTab == 'cultureMap'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('advice')">推荐</span>            
            <svg v-show="selectedTab == 'advice'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('sort')">遗珍普系</span>            
            <svg v-show="selectedTab == 'sort'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    </div>
    <div class="router" @scroll="scrolling" ref="scrollRef">
        <router-view />
    </div>
</template>


<style scoped>
.el-header {
    width: 100%;
    height: 90px;
    padding: 40px 15px 10px 15px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
.post-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F0E4D4;
    font-size: 13px;
    padding: 0px 5px;
    border-radius: 8px;
}
:deep(.homePage-input .el-input__wrapper) {
    width: 200px;
    border-radius: 55px;
    background-color: #F3D2A42E;
    border: solid 1px #987B5B;
    box-shadow: none;
}
:deep(.homePage-input .el-input__inner::placeholder) {
    font-size: 18px; 
    color:#BBB6B6;
}

.title {
    display: flex;
    height: 50px;
    padding: 10px 15px;
    font-size: 18px;
    gap: 40px;
    box-shadow: 0px 2px 2px 0px #00000026;
}
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px; 
}

.router {
    overflow-y: auto;
    height: calc(100vh  - 210px); 
}
</style>