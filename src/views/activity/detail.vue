<template>
    <template v-if="activity">
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large" @click="router.back()"></el-button>
            活动详情
        </div>

        <el-carousel trigger="click" height="25vh">
            <template v-if="activity.acmedias">
                <el-carousel-item v-for="item in activity.acmedias">
                    <img :src="item.url">
                </el-carousel-item>
            </template>
            <el-carousel-item v-else>
                <div class="text">{{ activity.title }}</div>
            </el-carousel-item>
        </el-carousel>

        <div class="info">
            <div>
                <div>
                    <span class="title-type">{{ activity.firstType }}</span>
                </div>

                <div style="flex: 1;">
                    <div style="font-weight: bold;">{{ activity.title }}</div>

                    <div class="tags" v-if="typeof activity.tag == 'string'">
                        <span v-for="tag in activity.tag.split(' ')">{{ tag }}</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: center; padding: 4px;"
                    @click="setFav(!activity.currentUserFavorite)">
                    <mdiStar v-if="activity.currentUserFavorite" color="gold" style="font-size: 2em;" />
                    <mdiStarOutline v-else style="font-size: 2em;" />
                    <span style="font-size: 0.8em;">{{ activity.favoritesNumber }}人收藏</span>
                </div>
            </div>

            <div>
                <mdiClockOutline />
                <div>
                    <div style="margin-bottom: 4px;">活动时间:</div>
                    <div>{{ timeRange2txt(activity.startTime, activity.endTime) }}</div>
                </div>
            </div>

            <div v-if="!isOnline">
                <mdiMapMarkerOutline style="vertical-align: middle;" />
                <div>
                    <div style="margin-bottom: 4px;">地址:</div>
                    <div>{{ activity.activityAddresses?.addressDetail || '未知' }}</div>
                </div>
            </div>

            <div v-if="!isOnline" id="map" class="map" @click="goToLink(activity.activityAddresses.gaodeMapLink)">
                <Map :long="activity.activityAddresses.longitude" :lat="activity.activityAddresses.latitude" />
                <!-- <div class="btn">导航</div> -->
            </div>
        </div>

        <el-tabs stretch>
            <el-tab-pane label="活动详情">
                <div>{{ activity.description }}</div>
            </el-tab-pane>

            <el-tab-pane label="预约须知">
                <div>{{ activity.participationInstructions }}</div>
            </el-tab-pane>
        </el-tabs>

        <div class="btn-apply" @click="onParticipateClick">
            <div v-if="isOnline">立即参与</div>

            <template v-else>
                <div>立即预约</div>
                <span>￥{{ activity.chargeAmount }}</span>
            </template>
        </div>
    </template>

    <ErrorPage v-else-if="error" :message="error" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as Activity from '@/axios/api/activity'
import ErrorPage from '@/views/error/ErrorPage.vue';
import router from '@/router';
import { promiseSuccess, timeRange2txt, tryShowErrorMsg } from '@/utils';
import { computed } from 'vue';
import { HistoryController, historyType } from '@/controllers/history';
import { ElMessageBox } from 'element-plus';
import Map from '@/views/activity/activityMap.vue'

const route = useRoute()

const activityId = ref(route.params.id)
const activity = ref<Activity.Activity>()

const error = ref('')

watch(() => route.params.id, id => activityId.value = id)

const isOnline = computed(() => activity.value.firstType == '线上')

function setFav(value: boolean) {
    (value ? Activity.addFav(activity.value.id) : Activity.removeFav(activity.value.id))
        .then(loadActivity)
}

function onParticipateClick() {
    if (isOnline.value) {
        promiseSuccess(Activity.participateActivityOnline(activity.value.id))
            .then(r => ElMessageBox.alert(r.data.data, '活动链接:'))
            .catch(tryShowErrorMsg)
    } else {
        router.push({ name: 'activityParticipate', params: { id: activity.value.id } })
    }
}

function loadActivity() {
    Activity.getActicity(activityId.value).then(r => {
        if (r.data.success) {
            activity.value = r.data.data
            HistoryController.add({
                type: historyType.activity,
                title: activity.value.title,
                subtitle: '活动时间: ' + timeRange2txt(activity.value.startTime, activity.value.endTime),
                image: activity.value.acmedias?.at(0)?.url,
                tags: activity.value.tag,
                price: activity.value.chargeAmount,
            })
            initMap(activity.value.activityAddresses?.latitude, activity.value.activityAddresses?.longitude)
        }
        else error.value = r.data.errorMsg
    })
}

declare const AMap: any;
let map = null;
function initMap(lat, long) {
    map = new AMap.Map('map', {
        center: [lat, long],
        zoom: 10,
    });
}
const goToLink = (url) => {
    window.location.href = url;
};

onMounted(() => {
    loadActivity()
})
</script>

<style scoped lang="less">
.header {
    text-align: center;
    padding: 12px 0;
    position: sticky;
    top: 0;
    background-color: rgba(240, 240, 240, 0.75);
    backdrop-filter: blur(8px);
    z-index: 10;

    .el-button {
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
    }
}

.el-carousel {
    margin: 8px 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .text {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px;
    }
}

.info {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;

    >div:not(.map) {
        display: flex;
        flex-direction: row;
        gap: 8px;

        .title-type {
            font-size: 0.8em;
            color: #3089EA;
            padding: 2px 4px;
            border: 1px solid #3089EA;
        }

        .tags {
            margin: 8px 0;

            span {
                font-size: 0.8em;
                color: #766450;
                padding: 1px 4px;
                border: 1px solid #766450;
                margin-right: 4px;
                background-color: rgba(255, 255, 255, 0.75);
                border-radius: 6px;
            }
        }

        >svg {
            font-size: 1.75em;
        }
    }

    .map {
        margin: 8px;
        // background-color: white;
        height: 25vh;
        width: 95%;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 8px 2px #ddd;
        position: relative;

        .btn {
            background-color: #DFCDB5;
            border-radius: 8px;
            color: white;
            padding: 8px 0;
            text-align: center;
            position: absolute;
            bottom: 16px;
            left: 25%;
            right: 25%;
            z-index: 99;
        }
    }
}

.map {
    height: 25vh;
    width: 100%;
}

.el-tab-pane>div {
    padding: 0 8px 100px;
}

.btn-apply {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #E1CFAF;
    color: white;
    padding: 10px;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 1.25em;
    font-family: "Alimama DaoLiTi";

    >div {
        font-size: 1.1em;
    }
}
</style>