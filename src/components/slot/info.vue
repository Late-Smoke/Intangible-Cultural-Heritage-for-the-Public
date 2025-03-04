<script setup>
const info = defineModel();
</script>

<template>
    <div v-if="info.length">
        <div class="head" :style="{ backgroundImage: `url(${info[0]?.urls[0]?.url})` }">
            <div class="headTitle">{{ info[0].title }}</div>
            <div class="head-bottom">
                <span>{{ info[0].nickName }}</span>
                <span>{{ info[0].formattedTime }}</span>
            </div>
        </div>
        <div class="content">
            <div class="content-item" v-for="(item, index) in info.slice(1)" :key="index">
                <div class="item-head">
                    <div>{{ item.title }}</div>
                    <img v-if="item?.urls[0]?.url" class="item-img" :src="item?.urls[0]?.url" />
                </div>
                <div class="item-bottom">
                    <span>{{ item.nickName }}</span>
                    <span>{{ item.formattedTime }}</span>
                </div>
            </div>
        </div>
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
    font-size: 24px;
    padding: 0 10px;
}

.head-bottom {
    display: flex;
    padding: 5px 30px;
    gap: 10px;
    justify-content: flex-end;
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
    font-size: 22px;
    font-family: 'Inter';
}

.item-img {
    width: 137px;
    margin-top: 30px;
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
}
</style>