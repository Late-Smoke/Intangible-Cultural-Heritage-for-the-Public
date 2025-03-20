<template>
    <div class="post-list-item-self">
        <div class="header" v-if="self">
            <div class="time">{{ formatDate(post.createdTime) }}</div>
            <el-dropdown trigger="click" size="large">
                <div class="action-btn">
                    <mdiDotsHorizontal />
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item v-if="!post.pinned" @click="Posts.pinPost(post.id).then(reloadAction)" icon="mdiPublish">置顶</el-dropdown-item>
                        <el-dropdown-item v-else @click="Posts.unpinPost(post.id).then(reloadAction)" icon="mdiPublishOff">取消置顶</el-dropdown-item>

                        <el-dropdown-item @click="gotoPostEdit(post.id)" icon="Edit">编辑</el-dropdown-item>
                        <el-dropdown-item @click="confirmDeletePost" icon="Delete">删除</el-dropdown-item>
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

        <div class="content" @click="gotoPost(post.id)">
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
import { formatDate, gotoPostEdit, gotoPost } from '@/utils'
import { html2txt } from '@/utils'
import { ElMessage, ElMessageBox } from 'element-plus';

const { post, self = true, reloadAction } = defineProps<{
    post: Posts.Post
    self?: boolean
    reloadAction?: () => any
}>()

function confirmDeletePost() {
    ElMessageBox.confirm('确定要删除帖子吗?', '删除帖子', { type: 'warning' }).then(() => {
        Posts.deletePost(post.id).then(r => {
            r.data.success ? ElMessage.success(r.data.data) : ElMessage.error(r.data.errorMsg)
            reloadAction()
        })
    }).catch(() => { })
}

</script>

<style scoped lang="scss">
.post-list-item-self {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 16px 4px;
    border-bottom: 1px solid #ddd;

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
            margin-top: 6px;
            word-break: break-word;
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
        margin-top: 2px;

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
            padding: 10px;
            font-size: 0.9em;

            >svg {
                font-size: 1.25em;
                vertical-align: bottom;
                margin-right: 2px;
            }
        }
    }
}
</style>