<template>
    <div class="post-preview">
        <div class="header" v-if="self">
            <div class="time">{{ formatDate(post.createdTime) }}</div>
            <el-dropdown trigger="click" size="large">
                <div class="action-btn">
                    <mdiDotsHorizontal />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="!post.pinned" @click="Posts.pinPost(post.id).then(reloadAction)">置顶</el-dropdown-item>
                        <el-dropdown-item v-else @click="Posts.unpinPost(post.id).then(reloadAction)">取消置顶</el-dropdown-item>

                        <el-dropdown-item @click="">编辑</el-dropdown-item>
                        <el-dropdown-item @click="">删除</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <div class="user" v-else>
            <img :src="post.avatarUrl">
            <div>
                <div class="name">{{ post.nickName }}</div>
                <div class="time">{{ formatDate(post.createdTime) }}</div>
            </div>
        </div>

        <div class="content" @click="router.push({ name: 'post', params: { postId: post.id } })">
            <div class="title">{{ post.title }}</div>
            <div class="body">{{ html2txt(post.content).slice(0, 100) }}</div>

            <template v-if="post.urls && post.urls.length">
                <img class="img" v-if="post.urls[0].type == 0" :src="post.urls[0].url">
                <video class="img" v-if="post.urls[0].type == 1" :src="post.urls[0].url"></video>
            </template>
        </div>

        <div class="tags" v-if="typeof post.tag == 'string'">
            <span v-for="tag in post.tag.split(' ')">{{ tag }}</span>
        </div>

        <div class="action">
            <div @click="">
                <mdiShare />转发
            </div>
            <div @click="">
                <mdiForumOutline />评论
            </div>
            <div @click="">
                <mdiThumbUpOutline />点赞
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Posts from '@/axios/api/posts'
import router from '@/router';
import { formatDate } from '@/utils'
import { html2txt } from '@/utils'

const { self = true } = defineProps<{
    post: Posts.Post
    self?: boolean
    reloadAction?: () => any
}>()
</script>

<style scoped lang="scss">
.post-preview {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px 16px 4px;
    border-bottom: 1px solid #ddd;
}

.header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .time {
        font-size: 0.8em;
        color: #444;
    }

    .action-btn {
        font-size: 1.5em;
        padding: 4px;

        svg {
            display: block;
        }
    }
}

.user {
    display: flex;
    gap: 8px;
    margin-bottom: 4px;

    >img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        object-fit: cover;
    }

    >div {
        display: flex;
        flex-direction: column;
        gap: 2px;
        justify-content: center;

        .name {
            font-size: 0.9em;
        }

        .time {
            font-size: 0.8em;
            color: #666;
        }
    }
}

.content {
    .title {
        font-weight: bold;
    }

    .body {
        font-size: 0.9em;
        color: #333;
        margin: 4px 0;
    }

    .img {
        display: block;
        width: 100%;
        max-height: 30vh;
        object-fit: cover;
        margin-top: 8px;
        box-sizing: border-box;
        border-radius: 8px;
    }
}

.tags {
    font-size: 0.8em;
    margin-top: 6px;

    >span {
        padding: 1px 3px;
        border: 1px solid #aaa;
        color: #888;
        margin-right: 6px;
        display: inline-block;
        border-radius: 4px;
    }
}

.action {
    display: flex;
    align-items: center;
    justify-content: space-around;

    >div {
        padding: 12px;
        font-size: 0.9em;

        >svg {
            font-size: 1.25em;
            vertical-align: bottom;
            margin-right: 2px;
        }
    }
}
</style>