<template>
    <div class="detail">
        <div class="top">
            <el-icon size="24" @click="">
                <ArrowLeft />
            </el-icon>
            <div class="title">参与详情</div>
        </div>
        <div class="activity-detail">
            <div class="activity-detail-box">
                <el-image class="detail-img" :src="imgUrl" fit="cover"></el-image>
                <div class="activity-info">
                    <div class="activity-title">{{ 1 }}</div>
                    <div>
                        <div class="activity-time">预约日期</div>
                        <span>{{ 1 }}</span>
                    </div>
                    <div class="money">￥{{ 1 }}</div>
                </div>
            </div>
            <div class="time">预约时间 : {{ 1 }}</div>
        </div>
        <div class="participator-info">
            <div class="info-title">参与人信息</div>
            <div class="info-item" v-for="item in personList" key="item.index">
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
                    <div>付款时间 : </div>
                    <div>发货时间 : </div>
                    <div>完成时间 : </div>
                </div>
                <div class="info-right">
                    <div>{{ 1111 }}</div>
                    <div>{{ 2222 }}</div>
                    <div>{{ 3333 }}</div>
                    <div>{{ 4444 }}</div>
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

const imgUrl = ref('');// 测试用
const personList = ref([
    {
        name: "1",
        phoneNumber: "1",
        idNumber: "1"
    },
    {
        name: "2",
        phoneNumber: "2",
        idNumber: "2"
    }
]);//测试用

const isCancel = ref(false);

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
            isCancel.value = true;
            ElMessage({
                type: 'success',
                message: '取消成功!',
                customClass: 'message'
            });
        })

}

onMounted(() => {
    ElMessage({
        type: 'success',
        message: '预约成功 !',
        customClass: 'message'
    });
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