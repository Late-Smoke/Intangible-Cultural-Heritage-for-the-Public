<script setup>
import { gotoPost, gotoUser } from '@/utils'
const info = defineModel();
</script>

<template>
    <div v-if="info.length">
        <div class="head" @click="gotoPost(info[0]?.id)" :style="{ backgroundImage: `url(${info[0]?.urls[0]?.url})` }">
            <div class="headTitle">{{ info[0].title }}</div>
            <div class="head-bottom" @click="gotoUser(info[0].userId)" @click.stop="">
                <span>{{ info[0].nickName }}</span>
                <span>{{ info[0].formattedTime }}</span>
            </div>
        </div>
        <div class="content">
            <div class="content-item" v-for="(item, index) in info.slice(1)" :key="index" @click="gotoPost(item?.id)">
                <div class="item-head">
                    <div>{{ item.title }}</div>
                    <img v-if="item?.urls[0]?.url" class="item-img" :src="item?.urls[0]?.url" />
                </div>
                <div class="item-bottom" @click="gotoUser(item.userId)" @click.stop="">
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.formattedTime }}</span>
                </div>
            </div>
        </div>
        <div style="text-align: center;margin: 10px 0;color:darkgray">
            <span>到底了</span>
        </div>
    </div>
    <div v-else style="text-align: center;margin: 10px 0;color:darkgray">
        <span>暂无内容</span>
    </div>
</template>


<style scoped>
.head,
.item-img {
    aspect-ratio: 16 / 9;
}

.head {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: #fff;
}

.headTitle {
    font-size: 21px;
    padding: 0 10px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.head-bottom {
    display: flex;
    padding: 5px 30px;
    gap: 10px;
    justify-content: flex-end;
    font-size: 14px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.content-item {
    display: flex;
    flex-direction: column;
    box-shadow: 0px 2px 10px 0px #00000026;
    border-top: 1px solid #C7C7C7;
    margin: 15px 20px;
    padding: 10px 15px;
    padding-right: 10px;
}

.item-head {
    display: flex;
    gap: 5px;
    font-size: 18px;
    font-family: 'Inter';
}

.item-img {
    width: 137px;
    margin: 10px 0;
    border-radius: 5px;
    flex-shrink: 0;
    object-fit: cover;
}

.item-head span {
    flex-grow: 1;
}

.item-bottom {
    display: flex;
    gap: 10px;
    font-size: 14px;
}
</style>