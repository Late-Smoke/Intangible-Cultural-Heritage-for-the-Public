<script setup>
import { ref  } from 'vue';
import router from '@/router';
const search = ref('');//输入框绑定值
const handleClean = () => {
    search.value = '';
}
const photoClick = () => {
    router.push('/searchView/pictureView');
}
const handleSearch = () => {
    if(search.value){
        router.push({
        name: 'result',
        params: {query: search.value}});
    }
}
</script>

<template>
    <el-header>
        <el-button class="return-btn" circle size="default" color="#F0E4D4">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="17.5" cy="17.5" r="17.5" fill="#F0E4D4"/>
                <path d="M20 26L12 18L20 10" stroke="#987B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </el-button>
        <el-input 
            v-model="search" 
            style="width:257px;height:32px;font-size: 18px;color:#BBB6B6;" 
            placeholder="搜获帖子、活动或用户" 
            size="default">
            <template #prefix>
                <svg width="16.8" height="16.8" style="margin-right:5px;" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9269 14.5401L18.4 17.9001M17.28 8.9401C17.28 13.27 13.7699 16.7801 9.44001 16.7801C5.11009 16.7801 1.60001 13.27 1.60001 8.9401C1.60001 4.61019 5.11009 1.1001 9.44001 1.1001C13.7699 1.1001 17.28 4.61019 17.28 8.9401Z" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </template>
            <template #suffix>
                <div v-show="search!=''" class="clean">
                    <svg @click="handleClean" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.5 1L1.5 12M12.5 12L1.5 1" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <svg width="2" height="23" viewBox="0 0 2 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 22.012L1 0.988167" stroke="#BBB6B6" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <svg @click="photoClick" width="28" height="25" style="margin:0;" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8602 6.6129V24C28.8602 24.3682 28.5617 24.6667 28.1935 24.6667H2C1.63181 24.6667 1.33333 24.3682 1.33333 24V13.4194V6.6129C1.33333 6.24471 1.63181 5.94624 2 5.94624H3.35484H5.04052C6.65148 5.94624 8.03191 4.79416 8.32009 3.20919L8.56163 1.88074C8.61926 1.56375 8.89535 1.33333 9.21754 1.33333H15.0968H20.976C21.2982 1.33333 21.5743 1.56375 21.6319 1.88074L21.8735 3.20919C22.1616 4.79415 23.5421 5.94624 25.153 5.94624H26.8387H28.1935C28.5617 5.94624 28.8602 6.24471 28.8602 6.6129ZM0 6.6129C0 5.50833 0.89543 4.6129 2 4.6129H3.35484H5.04052C6.0071 4.6129 6.83536 3.92166 7.00826 2.97067L7.2498 1.64223C7.42271 0.691249 8.25097 0 9.21754 0H15.0968H20.976C21.9426 0 22.7708 0.691248 22.9437 1.64223L23.1853 2.97067C23.3582 3.92165 24.1864 4.6129 25.153 4.6129H26.8387H28.1935C29.2981 4.6129 30.1935 5.50833 30.1935 6.6129V24C30.1935 25.1046 29.2981 26 28.1935 26H2C0.895432 26 0 25.1046 0 24V13.4194V6.6129ZM9.89249 13.8666C9.89249 11.2085 12.0473 9.05368 14.7054 9.05368C17.3635 9.05368 19.5183 11.2085 19.5183 13.8666C19.5183 15.2123 18.966 16.4291 18.0757 17.3025L18.0722 17.3059C17.2042 18.1556 16.016 18.6795 14.7054 18.6795C12.0473 18.6795 9.89249 16.5247 9.89249 13.8666ZM20.8516 13.8666C20.8516 15.34 20.3331 16.6924 19.4687 17.7511L21.4313 19.6498C21.6959 19.9058 21.7029 20.3279 21.4469 20.5925C21.1909 20.8571 20.7688 20.8641 20.5042 20.6081L18.5186 18.6872C17.4708 19.5172 16.146 20.0128 14.7054 20.0128C11.3109 20.0128 8.55916 17.2611 8.55916 13.8666C8.55916 10.4721 11.3109 7.72035 14.7054 7.72035C18.0999 7.72035 20.8516 10.4721 20.8516 13.8666Z" fill="#BBB6B6"/>
                </svg>
            </template>
        </el-input>
        <el-button @click="handleSearch" class="search-btn" color="#F0E4D4">搜索</el-button>
    </el-header>
    <div class="router">
        <router-view />
    </div>
</template>

<style scoped>
.el-header {
    width: 100%;
    height: auto;
    padding: 48px 15px 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.return-btn {
    margin-right: 0px;
}
.clean {
    display: flex;
    align-items: center; 
    gap: 10px;
    margin-right: 10px;
}
.search-btn {
    font-size: 18px;
    padding: 8px 10px;
}
:deep(.el-input__wrapper) {
    width: 200px;
    border-radius: 55px;
    background-color: #F3D2A42E;
    border: solid 1px #987B5B;
    box-shadow: none;
}
:deep(.el-input__inner::placeholder) {
    font-size: 18px; 
    color:#BBB6B6;
}

</style>