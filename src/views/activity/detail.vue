<template>
    <template v-if="acticity">
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large" @click="router.back()"></el-button>
            活动详情
        </div>

        <el-carousel trigger="click" height="20vh">
            <template v-if="acticity.acmedias">
                <el-carousel-item v-for="item in acticity.acmedias">
                    <img :src="item.url">
                </el-carousel-item>
            </template>
            <el-carousel-item v-else>
                <div class="text">{{ acticity.title }}</div>
            </el-carousel-item>
        </el-carousel>

        <div style="padding: 8px; background-color: rgba(240, 240, 240, 0.5);">
            <div style="display: flex; flex-direction: row; gap: 4px; margin: 4px 0;">
                <div>
                    <span class="title-type">{{ acticity.firstType }}</span>
                </div>

                <div style="flex: 1;">
                    <div style="font-weight: bold;">{{ acticity.title }}</div>
                    <div class="tags" v-if="typeof acticity.tag == 'string'">
                        <span v-for="tag in acticity.tag.split(' ')">{{ tag }}</span>
                    </div>
                </div>

                <div style="display: flex; flex-direction: column; align-items: center; padding: 4px;" @click="acticity.currentUserFavorite ? null : Activity.addFav(acticity.id)">
                    <mdiStar v-if="acticity.currentUserFavorite" color="gold" style="font-size: 2em;" />
                    <mdiStarOutline v-else style="font-size: 2em;" />
                    <span style="font-size: 0.8em;">{{ acticity.favoritesNumber }}人收藏</span>
                </div>
            </div>

            <div style="margin: 12px 0;">
                <div>活动时间:</div>
                <div>{{ new Date(acticity.startTime).toLocaleString() }} - {{ new Date(acticity.endTime).toLocaleString() }}</div>
            </div>

            <div style="margin: 12px 0;">
                <mdiMapMarker style="vertical-align: middle;" /> 地址: {{ acticity.activityAddresses.addressDetail }}
            </div>

            <div style="background-color: white; height: 25vh; overflow: hidden; border-radius: 8px;">
                地图
            </div>
        </div>

        <el-tabs stretch>
            <el-tab-pane label="活动详情">
                <div>{{ acticity.description }}</div>
            </el-tab-pane>

            <el-tab-pane label="预约须知">
                <div>{{ acticity.participationInstructions }}</div>
            </el-tab-pane>
        </el-tabs>

        <div style="position: fixed; left: 0; right: 0; bottom: 0; background-color: white; border-top: 1px solid #ddd; padding: 8px; z-index: 10;">
            <el-button type="primary" style="width: 100%;">立即预约 ￥{{ acticity.chargeAmount }}</el-button>
        </div>
    </template>

    <ErrorPage v-else-if="error" :message="error" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import * as Activity from '@/axios/api/activity'
import ErrorPage from '@/components/ErrorPage.vue';
import router from '@/router';

const route = useRoute()

const activityId = ref(route.params.id)
const acticity = ref<Activity.Activity>()

const error = ref('')



watch(() => route.params.id, id => activityId.value = id)

onMounted(() => {
    Activity.getActicity(activityId.value).then(r => {
        if (r.data.success) acticity.value = r.data.data
        else error.value = r.data.errorMsg
    })
})
</script>

<style scoped lang="less">
.header {
    text-align: center;
    padding: 12px 0;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
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
        color: #888;
        padding: 1px 4px;
        border: 1px solid #888;
        margin-right: 4px;
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 6px;
    }
}

.el-tab-pane>div {
    padding: 0 8px 100px;
}
</style>