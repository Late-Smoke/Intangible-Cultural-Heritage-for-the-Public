<template>
    <div class="action">
        <div class="date">{{ formatDate(comment.createdTime) }}</div>

        <el-button text type="info" size="small" @click="replyAction">回复</el-button>

        <div style="flex: 1;"></div>

        <button class="thumb-btn" v-if="comment.userIsLike" @click="Comments.removeLike(comment.id).then(reloadAction)">
            <mdiThumbUp color="red" />{{ comment.likes }}
        </button>
        <button class="thumb-btn" v-else @click="Comments.addLike(comment.id).then(reloadAction)">
            <mdiThumbUpOutline />{{ comment.likes }}
        </button>

        <button class="thumb-btn" v-if="comment.userIsDisLike" @click="Comments.removeDislike(comment.id).then(reloadAction)">
            <mdiThumbDown color="red" />{{ comment.disLikes }}
        </button>
        <button class="thumb-btn" v-else @click="Comments.addDislike(comment.id).then(reloadAction)">
            <mdiThumbDownOutline />{{ comment.disLikes }}
        </button>
    </div>
</template>

<script setup lang="ts">
import * as Comments from '@/axios/api/comments'
import { defineProps } from 'vue';
import { formatDate } from '@/utils'

defineProps<{
    comment: Comments.Comment,
    replyAction: () => any,
    reloadAction?: () => any,
}>()
</script>

<style scoped lang="less">
.action {
    display: flex;
    align-items: center;
    gap: 8px;

    .date {
        color: #888;
        font-size: 0.8em;
    }

    .thumb-btn {
        margin: 0;
        padding: 8px;
        border: none;
        background: none;
        display: flex;
        align-items: center;
        gap: 8px;
    }
}
</style>
