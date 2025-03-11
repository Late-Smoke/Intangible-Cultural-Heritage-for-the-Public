<template>
    <div class="history-list-item" @click="selectable ? history.selected = !history.selected : router.push({ path: history.url })">
        <img v-if="history.image" :src="history.image">

        <div class="main">
            <div>{{ history.title }}</div>

            <div class="user" v-if="history.type == historyType.post">
                <img :src="history.userAvatar">
                {{ history.username }}
            </div>
            <div class="address" v-if="history.type == historyType.activity">
                {{ history.subtitle }}
                <TagList :tags="history.tags" style="margin-top: 4px;" />
            </div>

            <div style="flex: 1;"></div>

            <div class="bottom">
                <div v-if="history.type == historyType.post">
                    <TagList :tags="history.tags" />
                </div>
                <div class="price" v-if="history.type == historyType.activity">￥{{ history.price }}</div>

                <div class="time">{{ formatDate(history.time) }}</div>
            </div>
        </div>

        <div class="action" v-if="selectable">
            <mdiCheckCircle color="rgb(177,151,128)" v-if="history.selected" />
            <mdiCircleOutline color="#888" v-if="!history.selected" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { HistoryItem, historyType } from '@/controllers/history';
import { formatDate } from '@/utils';
import TagList from '../slot/TagList.vue';
import router from '@/router';

defineProps<{
    history: HistoryItem
    selectable?: boolean
}>()
</script>

<style scoped lang="scss">
.history-list-item {
    display: flex;
    gap: 8px;

    >img {
        width: 150px;
        height: 100px;
        max-width: 30vw;
        object-fit: cover;
    }

    .main {
        flex: 1;
        display: flex;
        flex-direction: column;

        .user {
            display: flex;
            align-items: center;
            font-size: 0.9em;
            gap: 6px;
            color: #555;
            margin: 4px 0;

            >img {
                width: 28px;
                height: 228x;
                border-radius: 100%;
                object-fit: cover;
            }
        }

        .address {
            font-size: 0.9em;
            color: #555;
            margin: 4px 0;
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.9em;
            color: #666;

            .price {
                font-weight: bold;
                color: #8C7831;
            }
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;

        >svg {
            font-size: 1.5em;
        }
    }
}
</style>
