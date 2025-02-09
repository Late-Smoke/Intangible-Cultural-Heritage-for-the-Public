<script setup>
import { ref } from 'vue';
const headTitle = ref('火树银花不夜天，大沥持续上演千年绝技打铁花');
const nickname = ref('南海大沥');
const time = ref('12小时前');
const itemNickname = ref('确山打铁花');
const itemTime = ref('1天前');
</script>

<template>
    <div class="head">
        <div class="headTitle">{{ headTitle }}</div>
        <div class="head-bottom">
            <span>{{ nickname }}</span>
            <span>{{ time }}</span>
        </div>
    </div>
    <div class="content">
        <div class="content-item">
            <div class="item-head">
                <div>确山铁花即将北上南下 天津杭州两地新年绽放</div>
                <div class="item-img"></div>
            </div>
            <div class="item-bottom">
                <span>{{ itemNickname }}</span>
                <span>{{ itemTime }}</span>
            </div>
        </div>
    </div>
</template>


<style scoped>
.head,.item-img {
    aspect-ratio: 16 / 9;
    background-color: #ccc;
}
.head {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #000000A6;
}
.headTitle {
    font-size: 24px;
    padding: 0 10px;
}
.head-bottom {
    display: flex;
    padding: 5px 30px;
    gap: 10px;
    justify-content: flex-end;
}
.content {
    margin: 5px 20px;
    padding: 10px 15px;
    padding-right: 10px;
    gap: 10px;
    box-shadow: 0px 2px 10px 0px #00000026;
    border-top: 1px solid #C7C7C7 
}
.content-item {
    display: flex;
    flex-direction: column;
    gap: 10px; 
}
.item-head {
    display: flex;
    gap:5px;
    font-size: 22px;
    font-family: 'Inter';
}
.item-img {
    width: 137px;
    margin-top: 30px;
    border-radius: 5px;
    flex-shrink: 0;
}
.item-head span {
    flex-grow: 1;
}

</style>