<script setup>
import { ref , watch ,watchEffect,onBeforeMount } from 'vue';
import { getInfoApi } from '@/axios/api/search';
import { useSearchStore } from '@/stores/user';
const headTitle = ref('火树银花不夜天，大沥持续上演千年绝技打铁花');
const nickname = ref('南海大沥');
const time = ref('12小时前');
const itemNickname = ref('确山打铁花');
const itemTime = ref('1天前');

const data = ref([]);
const searchStore = useSearchStore();
watchEffect(() => {
    if (searchStore.ifHistory||(searchStore.ifSearch && searchStore.search)) {
        getInfoApi(searchStore.search).then(res => {
        data.value = res.data.data;
    })
    }
});
</script>

<template>
    <div v-if="data.length">
    <div class="head" :style="{backgroundImage:`url(${data[0]?.urls[0]?.url})`}">
        <div class="headTitle">{{ data[0].title }}</div>
        <div class="head-bottom">
            <span>{{ data[0].nickName }}</span>
            <span>{{ data[0].formattedTime }}</span>
        </div>
    </div>
    <div class="content">
        <div class="content-item" v-for="(item, index) in data.slice(1)" :key="index">
            <div class="item-head">
                <div>{{ item.title }}</div>
                <img class="item-img" :src="item.urls[0].url"/>
            </div>
            <div class="item-bottom">
                <span>{{ itemNickname }}</span>
                <span>{{ itemTime }}</span>
            </div>
        </div>
    </div>
</div>
</template>


<style scoped>
.head,.item-img {
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
    border-top: 1px solid #C7C7C7 ;
    margin: 15px 20px;
    padding: 10px 15px;
    padding-right: 10px;
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
    object-fit: cover;
}
.item-head span {
    flex-grow: 1;
}

</style>