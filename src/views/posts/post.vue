<template>
    <template v-if="post">
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large"></el-button>
            <img class="avatar" :src="post.avatarUrl">
            <div class="name">{{ post.nickName }}</div>
            <el-button v-if="!authorFollowed" type="primary" round>关注</el-button>
            <el-button v-else round>已关注</el-button>
            <el-button text circle icon="share" size="large"></el-button>
        </div>

        <el-carousel v-if="post.urls" trigger="click" height="40vh">
            <el-carousel-item v-for="item in post.urls" :key="item.url">
                <img v-if="item.type == 0" :src="item.url">
                <video v-if="item.type == 1" :src="item.url"></video>
            </el-carousel-item>
        </el-carousel>

        <h3 class="post-title" style="margin: 8px;">{{ post.title }}</h3>
        <p class="post-body" style="margin: 8px;">{{ post.content }}</p>

        <div v-if="typeof post.tag == 'string'">
            <el-tag v-for="item in post.tag.split(' ')" :key="item" type="info" effect="plain" round></el-tag>
        </div>

        <div class="post-time">
            <el-icon>
                <EditPen />
            </el-icon>
            <span class="date">发布于 {{ new Date(post.createdTime).toLocaleDateString() }}</span>
            <el-button type="warning" round size="small">支持作者</el-button>
        </div>

        <div class="footer">
            <el-input class="input" placeholder="发表评论…" @focus="() => { showReply = true; nextTick(() => replyInput.focus()) }" />
            <el-button text icon="comment">{{ post.comments }}</el-button>
            <el-button text icon="pointer">{{ post.likes }}</el-button>
            <el-button text icon="star">{{ post.favorite }}</el-button>
        </div>

        <template v-if="comments">
            <div>{{ JSON.stringify(comments) }}</div>
        </template>

        <div class="comment-overlay">
            <div></div>
            <div class="comment"></div>
        </div>

        <div v-show="showReply" class="reply-overlay" @click="showReply = false">
            <div class="reply" @click="e => e.stopPropagation()">
                <el-input ref="replyInput" v-model="replyMsg"></el-input>
                <el-button type="primary">发送</el-button>
            </div>
        </div>
    </template>

    <div v-else-if="error" class="error">
        <div>{{ error }}</div>
    </div>

    <div>Post: {{ postId }}</div>
    <div>Comment: {{ commentId }}</div>
    <button @click="gotoComment(2)">Go to comment 2</button>

</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref, watch } from 'vue';
import * as Posts from '@/axios/api/posts'
import * as Comments from '@/axios/api/comments'
import { onMounted } from 'vue';
import { ElInput } from 'element-plus';
import { nextTick } from 'vue';

const route = useRoute()
const postId = ref(route.params.postId)
const commentId = ref(route.params.commentId)

watch(() => route.params.commentId, (newId) => {
    commentId.value = newId
})


const post = ref<Posts.Post>(null)
const comments = ref<Comments.Comment[]>(null)
const error = ref('')

const authorFollowed = ref(false)

const replyInput = ref<InstanceType<typeof ElInput>>()
const showReply = ref(false)
const replyMsg = ref('')

function gotoComment(id) {
    router.push({ name: 'postComment', params: { postId: postId.value, commentId: id } })
}

onMounted(() => {
    Posts.getPostById(postId.value).then(r => {
        if (r.data.success) post.value = r.data.data
        else error.value = r.data.errorMsg
    })
    Comments.getHotCommentsForPost(postId.value).then(r=>{
        comments.value = r.data.data
    })
})
</script>

<style scoped lang="less">
.header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.025);

    .avatar {
        width: 40px;
        height: 40px;
        box-sizing: content-box;
        border-radius: 100%;
    }

    .name {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    button {
        margin: 0;
    }
}

.el-carousel__item * {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.post-time {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    color: #888;

    .date {
        font-size: 0.8em;
        color: 888;
        flex: 1;
    }
}

.footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-top: 1px solid #ccc;
    background-color: white;

    button {
        margin: 0;
    }
}

.reply-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);

    .reply {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        display: flex;
        align-items: center;
        padding: 8px;
        gap: 8px;
    }
}

.error {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>