<template>
    <el-container>
        <el-header>
            <el-icon size="20">
                <ArrowLeft />
            </el-icon>
            <div class="title">申诉和反馈处理</div>
        </el-header>
        <el-main>
            <div class="user">
                <div class="user-top">
                    <el-avatar class="avatar" :size="40" :src="url" />
                    <div class="user-detail">
                        <div class="user-name">张三</div>
                        <div class="user-time">03-05</div>
                    </div>
                </div>
                <div class="content">
                    我是一个测试的内容
                </div>
            </div>
            <div class="answer">
                <el-input class="big-input" v-model="answer" type="textarea" :rows="10" placeholder="填写回复"
                    autocomplete="off" />
            </div>
            <div class="post">
                <el-button class="post-btn" type="primary">发布回复</el-button>
            </div>
        </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue';

const url = ref('');//测试
const answer = ref('');
</script>

<style scoped>
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

            .user-name {
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
    }
}
</style>