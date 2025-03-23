<template>
    <div class="detail" v-if="activity && activityParticipateDetail">
        <div class="top">
            <el-icon size="24" @click="router.back()">
                <ArrowLeft />
            </el-icon>
            <div class="title">参与详情</div>
        </div>

        <div class="activity-detail">
            <div class="activity-detail-box">
                <el-image class="detail-img" :src="activity.acmedias?.at(0)?.url" fit="cover" @click="gotoActivity(activity.id)"></el-image>

                <div class="activity-info">
                    <div class="activity-title" @click="gotoActivity(activity.id)">{{ activity.title }}</div>
                    <div>
                        <div class="activity-time">预约日期</div>
                        <span>{{activityParticipateDetail.map(x => x.participationTime).join(', ')}}</span>
                    </div>
                    <div class="money">￥{{ activity.chargeAmount }}</div>
                </div>
            </div>
            <div class="time">预约时间 : {{activityParticipateDetail.map(x => parseDate(x.createdTime).toLocaleString()).join(', ')}}</div>
        </div>

        <div class="participator-info">
            <div class="info-title">参与人信息</div>
            <div class="info-item" v-for="item in activityParticipateDetail.map(x => x.eventDetailList).flat()" key="item.index">
                <div class="info-left">
                    <div>姓名</div>
                    <div>手机号码</div>
                    <div>身份证号</div>
                </div>
                <div class="info-right">
                    <div>{{ item.name }}</div>
                    <div>{{ item.phoneNumber }}</div>
                    <div>{{ item.idNumber }}</div>
                </div>
            </div>
        </div>

        <div class="order-info">
            <div class="info-title">订单信息</div>
            <div class="info-item order">
                <div class="info-left">
                    <div>订单编号 : </div>
                    <!-- <div>付款时间 : </div>
                    <div>发货时间 : </div>
                    <div>完成时间 : </div> -->
                </div>
                <div class="info-right">
                    <div>{{activityParticipateDetail.map(x => x.id).join(', ')}}</div>
                    <!-- <div>{{ 2222 }}</div>
                    <div>{{ 3333 }}</div>
                    <div>{{ 4444 }}</div> -->
                </div>
            </div>
        </div>
        <div class="cancel">
            <el-button class="cancel-btn" @click="handleCancel()">
                <span v-if="!isCancel">取消预约</span>
                <span v-else>已取消</span>
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import router from '@/router';
import * as Activity from '@/axios/api/activity'
import { gotoActivity, parseDate, promiseSuccess, tryShowErrorMsg } from '@/utils';

const { activityId } = defineProps<{
    activityId: string
}>()

const isCancel = computed(() => activityParticipateDetail.value?.every(x => x.status == '已取消'));

const activity = ref<Activity.Activity>()
const activityParticipateDetail = ref<Activity.ActivityParticipateDetail[]>()

function handleCancel() {
    ElMessageBox.confirm(
        '<span style="color: rgba(0, 0, 0); font-size: 28px">确认取消预约 ?</span>',
        //'确认取消预约 ?',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            showClose: false,
            customClass: 'confirm-addGoods'
        }).then(() => {
            activityParticipateDetail.value.forEach(x => {
                promiseSuccess(Activity.cancelParticipateActivity(x.id)).then(() => {
                    ElMessage({
                        type: 'success',
                        message: '取消成功!',
                        customClass: 'message'
                    });
                    loadActivity()
                }).catch(tryShowErrorMsg)
            })
        })
}

function loadActivity() {
    Activity.getActicity(activityId).then(r => activity.value = r.data.data)
    Activity.getParticipateDetails(activityId).then(r => activityParticipateDetail.value = r)
}

onMounted(() => {
    // ElMessage({
    //     type: 'success',
    //     message: '预约成功 !',
    //     customClass: 'message'
    // });

    loadActivity()
})
</script>

<style scoped>
.detail {
    width: 100%;
    height: 100vh;
    overflow: auto;
    padding: 20px;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    background-color: rgba(247, 239, 226, 1);
}

.top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.title {
    flex: 1;
    font-size: 28px;
    text-align: center;
}

.activity-detail {
    padding: 10px 5px 5px;

    .time {
        color: rgba(129, 129, 129, 1);
    }

    .activity-detail-box {
        display: flex;
        color: #000;
        gap: 15px;
        margin-bottom: 5px;

        .detail-img {
            width: 113px;
            height: 155px;
            flex-shrink: 0;
        }

        .activity-info {
            font-size: 20px;
            position: relative;

            .activity-title {
                padding: 10px 0;
            }

            .activity-time {
                font-size: 16px;
                padding: 5px 0;
            }

            .money {
                position: absolute;
                bottom: 5px;
                color: rgba(140, 120, 49, 1);
            }
        }
    }
}

.participator-info {
    margin-bottom: 10px;
}

.info-title {
    font-size: 18px;
    padding: 10px 0;
    font-weight: 700;
    color: #000;
}

.info-item {
    color: #000;
    display: flex;
    gap: 20px;
    font-size: 18px;
    margin-bottom: 10px;

    .info-left div,
    .info-right div {
        margin-bottom: 15px;
    }
}

.order {
    color: rgba(129, 129, 129, 1);
    gap: 5px;
    font-size: 15px;
}

.cancel {
    text-align: right;

    .cancel-btn {
        width: 124px;
        height: 43px;
        padding: 5px;
        margin-bottom: 10px;
        color: rgba(152, 123, 91, 1);
        font-size: 25px;
        font-family: 'Alimama DaoLiTi';
        border: none;
    }
}
</style>