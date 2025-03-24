<template>
    <el-container>
        <el-header>
            <el-icon size="20" @click="router.back()">
                <ArrowLeft />
            </el-icon>
            <div class="title">申诉和反馈处理</div>
        </el-header>
        <el-main>
            <div class="user">
                <div class="user-top">
                    <el-avatar class="avatar" :size="40" :src="data.avatarUrl" />
                    <div class="user-detail">
                        <div class="user-nickName">{{ data.nickName }}</div>
                        <div class="user-complaintDate">{{ data.complaintDate }}</div>
                    </div>
                </div>
                <div class="content">
                    {{ data.complaintContent }}
                </div>
            </div>
            <div class="answer">
                <el-input class="big-input" v-model="answer" type="textarea" :rows="10" placeholder="填写回复"
                    autocomplete="off" />
            </div>
            <div class="post">
                <el-button class="post-btn" type="primary" @click="handleApply()">发布回复</el-button>
            </div>
        </el-main>
        <img class="blueCloud" src="/icon/blueCloud.png" />
    </el-container>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import router from '@/router';
import * as management from '@/axios/api/management';
import { useAdminStore } from '@/stores/user';

const adminStore = useAdminStore();
const data = adminStore.userData;
const answer = ref('');

function handleApply() {
    management.dealAppealApi(data.id, answer.value).then((res) => {
        router.back();
        ElMessage({
            type: 'success',
            message: '处理成功',
        })
    });
}
</script>

<style scoped>
.el-container {
    overflow: hidden;
}

.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px rgba(228, 228, 228, 1);

    .title {
        flex: 1;
        font-size: 20px;
        text-align: center;
    }
}

.user {
    font-size: 15px;

    .user-top {
        display: flex;
        align-items: center;
        gap: 10px;

        .user-detail {
            flex: 1;
            display: flex;
            justify-content: space-between;
            color: rgba(178, 178, 178, 1);

            .user-nickName {
                font-size: 20px;
                color: #000;
            }
        }
    }

    .content {
        margin-left: 50px;
        font-size: 14px;
        color: rgba(178, 178, 178, 1);
        margin-bottom: 20px;
    }

}

:deep(.big-input .el-textarea__inner) {
    color: #000;
    background-color: rgba(230, 230, 230, 0.61);
}

.post {
    position: absolute;
    bottom: 20px;
    right: 20px;

    .post-btn {
        width: 145px;
        height: 45px;
        font-size: 24px;
        padding: 5px 10px;
        opacity: 0.9;
    }
}

.blueCloud {
    z-index: -1;
    position: absolute;
    bottom: 0;
    right: 0;
    background-size: cover;
    background-size: 100% 100%;
    height: 70vh;
    background-repeat: no-repeat;
    opacity: 0.5;
}
</style>