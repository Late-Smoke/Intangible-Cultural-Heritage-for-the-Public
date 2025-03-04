<template>
    <div class="comment-quote-reply">
        <div class="date">{{ formatDate(comment.createdTime) }}</div>

        <div class="reply" @click="gotoSource">{{ comment.content }}</div>

        <div class="quote" @click="gotoSource">{{ comment.replyContent }}</div>
    </div>
</template>

<script setup lang="ts">
import * as Self from '@/axios/api/self'
import { formatDate, gotoPost, gotoPostComment } from '@/utils'
import router from '@/router';

const props = defineProps<{
    comment: Self.Comment
}>()

function gotoSource() {
    if (props.comment.rootCommentId) {
        gotoPostComment(props.comment.postId, props.comment.rootCommentId)
    } else {
        gotoPost(props.comment.postId)
    }
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
        background-color: #F6DAA93D;
    }
}
</style>