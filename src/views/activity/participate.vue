<template>
    <template v-if="activity">
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large" @click="router.back()"></el-button>
            活动详情
        </div>

        <el-carousel trigger="click" height="20vh">
            <template v-if="activity.acmedias">
                <el-carousel-item v-for="item in activity.acmedias">
                    <img :src="item.url">
                </el-carousel-item>
            </template>
            <el-carousel-item v-else>
                <div class="text">{{ activity.title }}</div>
            </el-carousel-item>
        </el-carousel>

        <div class="detail-card">
            <div style="font-weight: bold;">{{ activity.title }}</div>

            <div style="font-size: 0.9em; color: #444;">{{ parseDate(activity.startTime).toLocaleString() }} - {{ parseDate(activity.endTime).toLocaleString() }}</div>

            <div>
                <div style="margin: 4px 0;">选择日期</div>
                <div>
                    <el-radio-group v-model="payload.participationTime" size="small">
                        <el-radio border v-for="day in daySelections" :value="day">{{ day }}</el-radio>
                    </el-radio-group>
                </div>
            </div>

            <div>
                <div>参与人信息</div>

                <el-form v-for="(person, index) in payload.eventDetailList" label-width="auto" label-position="left">
                    <el-form-item label="姓名"><el-input v-model="person.name" /></el-form-item>
                    <el-form-item label="手机号码"><el-input v-model="person.phoneNumber" /></el-form-item>
                    <el-form-item label="身份证号"><el-input v-model="person.idNumber" /></el-form-item>
                    <el-form-item v-if="payload.eventDetailList.length > 1">
                        <div style="flex: 1;"></div>
                        <el-button @click="payload.eventDetailList.splice(index, 1)">删除</el-button>
                    </el-form-item>
                </el-form>

                <div style="text-align: center;">
                    <el-button style="width: 80%;" @click="payload.eventDetailList.push({
                        name: '', phoneNumber: '', idNumber: ''
                    })">添加参与人</el-button>
                </div>
            </div>

            <div>{{ activity.participationInstructions }}</div>

            <div style="position: fixed; left: 0; right: 0; bottom: 0; background-color: white; border-top: 1px solid #ddd; padding: 8px; z-index: 10;">
                <el-button :disabled="!isPayloadValid()" type="primary" style="width: 100%;">确认预约 ￥{{ activity.chargeAmount }}</el-button>
            </div>
        </div>
    </template>

    <ErrorPage v-else-if="error" :message="error" />
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import * as Activity from '@/axios/api/activity'
import ErrorPage from '@/components/ErrorPage.vue';
import router from '@/router';
import { parseDate } from '@/utils';

const route = useRoute()

const activityId = ref(route.params.id)
const activity = ref<Activity.Activity>()

const error = ref('')

watch(() => route.params.id, id => activityId.value = id)


const daySelections = computed(() => {
    const dates: string[] = [];

    const start = parseDate(activity.value.startTime);
    const end = parseDate(activity.value.endTime);

    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)

    while (start <= end) {
        // Convert to YYYY-MM-DD format
        const year = start.getFullYear();
        const month = String(start.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        const day = String(start.getDate()).padStart(2, '0'); // Ensure two digits

        dates.push(`${year}-${month}-${day}`);

        // Move to the next day
        start.setDate(start.getDate() + 1);
    }

    if (dates.length == 1) payload.participationTime = dates[0]

    return dates;
})

const payload: Activity.ActivityParticipate = reactive({
    get activityId() { return activity.value.id },
    eventDetailList: [
        {
            name: "",
            phoneNumber: "",
            idNumber: ""
        },
    ],
    participationTime: ''
})

function isPayloadValid() {
    if (payload.eventDetailList.length == 0) return false
    for (const person of payload.eventDetailList) {
        if (!(person.name.length >= 2 && person.phoneNumber.length == 11 && person.idNumber.length >= 15)) return false
    }
    return payload.activityId && payload.participationTime
}

onMounted(() => {
    Activity.getActicity(activityId.value).then(r => {
        if (r.data.success) activity.value = r.data.data
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

.detail-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px 12px 100px;
    background-color: #f4f4f4;
    border-radius: 16px 16px 0 0;

    &>div {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    :deep(.el-radio) {
        margin: 0 8px 8px 0;
    }

    :deep(.el-radio__input) {
        display: none;
    }

    :deep(.el-radio__label) {
        padding: 0;
    }

    .el-form-item {
        margin: 6px 0;
    }
}
</style>