<script setup>
import { ref } from 'vue'
const sort = ref('最热');
const sortShow = ref(false);
const nickName = ref('非遗进大众');
const date = ref('2024-01-10');
const contentTitle = ref('【今日非遗-打铁花】');
const contentText = ref('打铁花是一种传统民间烟火表演，被誉为“民间烟火之最”，是中...');
const contentSign = ref('打铁花');
const comment = ref('15');
const like = ref('200');
</script>

<template>
    <div class="baiKe">
        <span class="head">非遗百科</span>
        <span class="tip">点击查看详情</span>
    </div>
    <div class="post-box">
        <div class="post-title">
            <span class="title">相关帖子</span>
            <el-popover popper-class="sort-popover" :show-arrow="false" :visible="sortShow" :popper-style="{ minWidth:'107px',padding:'0',width:'auto' }">
                <div style="text-align: center; margin: 0; display: flex;flex-direction: column;align-items: center;">
                    <el-button class="popover-btn" text @click="sortShow = false;sort = '最热'">
                    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.2355 9.95617C16.7391 8.88176 16.0175 7.91742 15.1159 7.12349L14.3719 6.46695C14.3466 6.44527 14.3162 6.42989 14.2833 6.42215C14.2504 6.4144 14.2161 6.41455 14.1832 6.42256C14.1504 6.43057 14.1202 6.44621 14.0951 6.46809C14.07 6.48998 14.0509 6.51745 14.0395 6.5481L13.7071 7.46528C13.5 8.04067 13.119 8.62835 12.5795 9.2062C12.5437 9.24308 12.5028 9.25292 12.4747 9.25538C12.4466 9.25784 12.4031 9.25292 12.3648 9.21849C12.329 9.18899 12.3111 9.14472 12.3136 9.10046C12.4082 7.62019 11.948 5.95058 10.9406 4.13343C10.1071 2.62365 8.94885 1.44582 7.5017 0.624538L6.44573 0.0270191C6.30766 -0.0516666 6.13124 0.0516082 6.13891 0.206521L6.19516 1.38681C6.23352 2.19333 6.13636 2.90642 5.90624 3.49903C5.62499 4.22441 5.22102 4.89816 4.70454 5.50305C4.34511 5.92344 3.93773 6.30368 3.49005 6.63662C2.41186 7.43372 1.53515 8.45508 0.925567 9.62422C0.31749 10.8036 0.000741888 12.102 0 13.4183C0 14.579 0.237784 15.7027 0.708238 16.7625C1.1625 17.7829 1.81805 18.7089 2.63863 19.4894C3.46704 20.2763 4.4284 20.8959 5.49971 21.3263C6.60937 21.7738 7.7855 22 8.99999 22C10.2145 22 11.3906 21.7738 12.5003 21.3287C13.5689 20.9009 14.5407 20.277 15.3613 19.4919C16.1898 18.705 16.8392 17.7854 17.2917 16.7649C17.7615 15.708 18.0025 14.5702 18 13.4208C18 12.2208 17.7443 11.0553 17.2355 9.95617ZM14.1392 18.2993C12.7662 19.6075 10.9432 20.3255 8.99999 20.3255C7.05681 20.3255 5.2338 19.6075 3.86079 18.2993C2.4929 16.9936 1.73863 15.2625 1.73863 13.4208C1.73863 12.3512 1.9892 11.3258 2.48267 10.3717C2.96335 9.4398 3.67926 8.60622 4.54857 7.96444C5.10299 7.55673 5.60585 7.08798 6.04687 6.56777C6.68607 5.81779 7.18721 4.98176 7.53494 4.08425C7.67757 3.71403 7.78122 3.33098 7.84431 2.94085C8.4605 3.48673 8.97698 4.14572 9.40908 4.91783C10.2631 6.45712 10.6568 7.82674 10.5801 8.99227C10.5618 9.26678 10.6084 9.54171 10.7165 9.79639C10.8245 10.0511 10.9912 10.2789 11.204 10.4627C11.3884 10.6229 11.604 10.7463 11.8384 10.8256C12.0728 10.905 12.3212 10.9388 12.5693 10.925C13.073 10.9004 13.5358 10.6865 13.8733 10.325C14.2133 9.95863 14.5074 9.58487 14.7528 9.20374C15.1108 9.64389 15.4099 10.1234 15.6477 10.6398C16.0542 11.5201 16.2613 12.4569 16.2613 13.4208C16.2613 15.2625 15.5071 16.9961 14.1392 18.2993Z" fill="black" fill-opacity="0.85"/>
                    </svg>
                    最热
                    </el-button>                    
                    <svg width="82" height="1" viewBox="0 0 82 1" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line y1="0.5" x2="82" y2="0.5" stroke="black"/>
                    </svg>
                    <el-button class="popover-btn" text @click="sortShow = false;sort = '最新'">                        
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.6378 14.9615C16.0308 15.0925 16.4555 14.8801 16.5865 14.4872C16.7175 14.0942 16.5051 13.6695 16.1122 13.5385L15.6378 14.9615ZM12.5 13.125H11.75C11.75 13.4478 11.9566 13.7344 12.2628 13.8365L12.5 13.125ZM13.25 8.42087C13.25 8.00666 12.9142 7.67087 12.5 7.67087C12.0858 7.67087 11.75 8.00666 11.75 8.42087H13.25ZM16.1122 13.5385L12.7372 12.4135L12.2628 13.8365L15.6378 14.9615L16.1122 13.5385ZM13.25 13.125V8.42087H11.75V13.125H13.25ZM20.75 12C20.75 16.5563 17.0563 20.25 12.5 20.25V21.75C17.8848 21.75 22.25 17.3848 22.25 12H20.75ZM12.5 20.25C7.94365 20.25 4.25 16.5563 4.25 12H2.75C2.75 17.3848 7.11522 21.75 12.5 21.75V20.25ZM4.25 12C4.25 7.44365 7.94365 3.75 12.5 3.75V2.25C7.11522 2.25 2.75 6.61522 2.75 12H4.25ZM12.5 3.75C17.0563 3.75 20.75 7.44365 20.75 12H22.25C22.25 6.61522 17.8848 2.25 12.5 2.25V3.75Z" fill="black"/>
                        </svg>
                        最新
                    </el-button>
                </div>
                <template #reference>
                    <el-button @click="sortShow = true" type="text" class="sort-btn">
                        <span>{{ sort }}</span>
                        <span>                 
                            <svg width="13" height="8" viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.564 0H0.436042C0.0722788 0 -0.130838 0.392476 0.094437 0.660416L6.15839 7.84575C6.33197 8.05142 6.66619 8.05142 6.8416 7.84575L12.9056 0.660416C13.1308 0.392476 12.9277 0 12.564 0Z" fill="#987B5B"/>
                            </svg>
                        </span>   
                    </el-button>
                </template>
            </el-popover>
        </div>
        <div class="post-list">
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
        </div>
    </div>
</template>


<style scoped>
.baiKe {
    width: 100%;
    padding-top: 56.25%; 
    position: relative;
}
.baiKe span {
    position: absolute;
}
.head {
    top: 0;
    left: 0;
    margin: 0;
    padding:10px 20px;
}
.tip {
    bottom: 10px;
    right: 10px;
    padding: 5px 10px;
    font-size: 14px;
    background-color: #F1E6D8;
    border-radius: 9px;
}

.post-box {
    width: 100%;
    padding: 10px 15px;
}
.post-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.title {
    padding: 0 5px;
    font-size: 24px;
    color: #000000;
    box-shadow:inset 0 -8px 0 0px #F0E4D4; 
}
.sort-btn span{
    font-size: 18px;
    color: #000000;
    margin-right: 5px;
}
::deep .el-popover {
    border-radius: 14px;
}
.popover-btn {
    font-size: 18px;
    color: #000000;
    padding: 0;
}

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