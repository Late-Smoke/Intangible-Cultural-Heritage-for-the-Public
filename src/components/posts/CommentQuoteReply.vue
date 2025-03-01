<template>
    <div class="comment-quote-reply">
        <div class="date">{{ formatDate(comment.createdTime) }}</div>

        <div class="reply" @click="gotoSource">{{ comment.content }}</div>

        <div class="quote" @click="gotoSource">{{ comment.replyContent }}</div>
    </div>
</template>

<script setup lang="ts">
import * as Self from '@/axios/api/self'
import { formatDate } from '@/utils'
import router from '@/router';

const props = defineProps<{
    comment: Self.Comment
}>()

function gotoSource() {
    router.push(props.comment.rootCommentId ? {
        name: 'postComment',
        params: { postId: props.comment.postId, commentId: props.comment.rootCommentId }
    } : {
        name: 'post',
        params: { postId: props.comment.postId }
    })
}
</script>

<style scoped lang="scss">
.comment-quote-reply {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    border-bottom: 1px solid #ddd;

    .date {
        font-size: 0.8em;
        color: #888;
    }

    .quote {
        padding: 8px;
        font-size: 0.8em;
        color: #666;
        background-color: #f6f6f6;
    }
}
</style>