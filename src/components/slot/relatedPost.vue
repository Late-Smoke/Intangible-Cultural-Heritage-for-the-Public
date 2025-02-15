<script setup>
import { ref } from 'vue'

const nickName = ref('非遗进大众');
const date = ref('2024-01-10');
const contentTitle = ref('【今日非遗-打铁花】');
const contentText = ref('打铁花是一种传统民间烟火表演，被誉为“民间烟火之最”，是中...');
const contentSign = ref('打铁花');
const comment = ref('15');
const like = ref('200');

// const scrolling = (e) => {
//     const clientHeight = e.target.clientHeight
//     const scrollHeight = e.target.scrollHeight
//     const scrollTop = e.target.scrollTop
//      console.log(clientHeight, scrollHeight, scrollTop)
//     if (scrollTop + clientHeight >= scrollHeight) {
//       console.log('到底了!');
//     } else {
//         console.log('没到底!');
//     }
//   }
</script>

<template>
    <div class="post-list" >
        <div class="post-item">
            <div class="item-header">
                <div class="header-left">
                    <div class="profile"></div>
                    <span class="nickName">{{ nickName }}</span>                        
                    <svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="30" height="17" rx="2" fill="#90A9DC"/>
                        <path d="M13.335 10.314V13.9556H12.5078V13.3218H6.90039V13.9448H6.0625V6.50049H12.9268V9.63721H12.0996V9.28271H6.90039V10.314H13.335ZM4.62305 4.74951H9.49463C9.2762 4.37354 9.05241 4.02262 8.82324 3.69678L9.56445 3.27783C9.80794 3.59294 10.0765 3.98682 10.3701 4.45947L9.86523 4.74951H14.3877V6.70459H13.5498V5.49072H5.46094V6.70459H4.62305V4.74951ZM12.5078 11.0337H6.90039V12.6128H12.5078V11.0337ZM12.0996 7.22021H6.90039V8.56299H12.0996V7.22021ZM15.333 5.21143H20.4893C20.1276 4.52393 19.8447 4.02262 19.6406 3.70752L20.4785 3.31006C20.679 3.618 20.9798 4.1193 21.3809 4.81396L20.5967 5.21143H25.6885V6.02783H19.1733C19.1483 6.67952 19.1214 7.23454 19.0928 7.69287H24.2812C24.1953 9.24691 24.1022 10.5968 24.002 11.7427C23.9232 13.0389 23.293 13.687 22.1113 13.687C21.5671 13.687 20.8402 13.6584 19.9307 13.6011C19.8949 13.3289 19.8411 12.9995 19.7695 12.6128C20.679 12.7345 21.4167 12.7954 21.9824 12.7954C22.6413 12.7954 23.0101 12.4051 23.0889 11.6245C23.1748 10.7723 23.25 9.73031 23.3145 8.49854H19.0337C18.8332 10.8618 17.7393 12.6951 15.752 13.9985C15.5586 13.7694 15.3402 13.5259 15.0967 13.2681C16.9873 12.022 18.0007 10.3534 18.1367 8.26221C18.1868 7.69645 18.228 6.95166 18.2603 6.02783H15.333V5.21143Z" fill="white"/>
                    </svg>                        
                </div>
                <span class="date">{{ date }}</span>
            </div>
            <div class="item-content">
                <span class="content-title">{{ contentTitle }}</span>
                <div class="content-text">{{ contentText }}</div>
                <div class="content-img"></div>
            </div>
            <div class="item-footer">
                <span class="content-sign">{{ contentSign }}</span>
                <div class="footer-right">
                    <span class="comment">                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.49957 12.0846V12M11.9991 12.0846V12M16.4987 12.0846V12M20.9983 12C20.9983 13.2938 20.7253 14.5238 20.2338 15.6356L21 20.9991L16.4039 19.85C15.1019 20.5823 13.5993 21 11.9991 21C7.02906 21 3 16.9706 3 12C3 7.02944 7.02906 3 11.9991 3C16.9692 3 20.9983 7.02944 20.9983 12Z" stroke="#766552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ comment }}
                    </span>
                    <span class="like">                            
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 10H18.764C19.1049 10 19.4401 10.0871 19.7378 10.2531C20.0355 10.4191 20.2859 10.6584 20.4651 10.9484C20.6444 11.2383 20.7465 11.5692 20.7619 11.9098C20.7773 12.2503 20.7054 12.5891 20.553 12.894L17.053 19.894C16.8869 20.2265 16.6314 20.5061 16.3152 20.7014C15.999 20.8968 15.6347 21.0002 15.263 21H11.246C11.083 21 10.92 20.98 10.761 20.94L7 20M14 10V5C14 4.46957 13.7893 3.96086 13.4142 3.58579C13.0391 3.21071 12.5304 3 12 3H11.905C11.405 3 11 3.405 11 3.905C11 4.619 10.789 5.317 10.392 5.911L7 11V20M14 10H12M7 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10H7.5" stroke="#766552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        {{ like }}
                    </span>
                </div>
            </div>
        </div>
        <p v-for="(item, index) in Array(10).fill('')" :key="index">
        这是第 {{ index + 1 }} 行文本，用于增加页面高度以测试滚动效果。
      </p>
    </div>
</template>

<style scoped>
.post-list {
    padding-top: 10px;
    gap: 10px;
}
.post-item {
    width: 100%;
    height: auto;
    border-radius: 6px;
    border: solid 1px #E6DBCD;
    box-shadow: 0px 4px 8px 0px #00000029;
}
.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-bottom: 5px;
}
.profile {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background-color: #E6DBCD;
}
.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}
.nickName {
    font-size: 18px;
    color: #000000;
}
.date {
    font-size: 12px;
    color: #9D9393;
}
.content-title {
    margin-left: 5px;
    font-size: 18px;
    color: #9F7638;
}
.content-text {
    font-size: 14px;
    font-family: 'Inter';
    line-height: 20px;
    padding: 5px 15px 10px;
}
.content-img {
    width: 128px;
    aspect-ratio: 16 / 9;
    background-color: #9D9393; 
    margin: 10px;
    margin-left: 15px;
    border-radius: 5px;
}
.item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px; 
}
.content-sign {
    font-size: 10px;
    color: #766450;
    padding: 5px 10px; 
    border-radius: 4px;
    border: solid 1px #6C5944;
}
.footer-right {
    display: flex;
    align-items: center;
    gap: 10px; 
}
</style>