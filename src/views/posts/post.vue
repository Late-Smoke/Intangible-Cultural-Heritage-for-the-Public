<template>
    <template v-if="post">
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large" @click="router.back()"></el-button>
            <img class="avatar" :src="post.avatarUrl">
            <div class="name">{{ post.nickName }}</div>
            <el-button v-if="!authorFollowed" type="primary" round @click="Follow.follow(post.userId)">关注</el-button>
            <el-button v-else round>已关注</el-button>
            <el-button text circle icon="share" size="large"></el-button>
        </div>

        <el-carousel v-if="post.urls" trigger="click" height="40vh">
            <el-carousel-item v-for="item in post.urls">
                <img v-if="item.type == 0" :src="item.url">
                <video v-if="item.type == 1" :src="item.url"></video>
            </el-carousel-item>
        </el-carousel>

        <h3 style="margin: 8px;">{{ post.title }}</h3>
        <p style="margin: 8px;">{{ post.content }}</p>

        <div v-if="typeof post.tag == 'string'" class="tags">
            <el-tag v-for="item in post.tag.split(' ')" type="info" effect="plain" round>{{ item }}</el-tag>
        </div>

        <div class="post-time">
            <el-icon>
                <EditPen />
            </el-icon>
            <span class="date">发布于 {{ new Date(post.createdTime).toLocaleDateString() }}</span>
            <el-button type="warning" round size="small">支持作者</el-button>
        </div>

        <div class="comments-header">
            <div style="flex: 1;">全部评论</div>
            <div style="font-size: 0.8em;">
                <span @click="commentsSort = Sort.hotest" :class="{ fade: commentsSort != Sort.hotest }">热门</span>
                <span style="color: #ccc;"> | </span>
                <span @click="commentsSort = Sort.latest" :class="{ fade: commentsSort != Sort.latest }">最新</span>
            </div>
        </div>

        <template v-if="comments">
            <div v-for="item in comments" :key="item.id" class="comment">
                <img class="avatar" :src="item.avatarUrl">
                <div class="content">
                    <div class="root-name">
                        <div class="author-name">{{ item.nickName }}</div>
                        <div v-if="item.userId == post.userId" class="author-label">楼主</div>
                    </div>

                    <div style="margin: 8px 0;">{{ item.content }}</div>

                    <comment-actions :comment="item" :reply-action="() => reply.reply(item.id, item.id, item.nickName)"></comment-actions>

                    <div v-if="item.children && item.children.length" class="reply-block" @click="router.push({ name: 'postComment', params: { postId, commentId: item.id } })">
                        <div v-for="item1 in item.children.slice(0, 3)" :key="item1.id">
                            <span style="color: #555;">{{ item1.nickName }}<span v-if="item1.userId == post.userId" class="author-label">楼主</span>: </span>
                            <span>{{ item1.content }}</span>
                        </div>
                        <div v-if="item.children.length > 0" class="more-btn">
                            <span>查看全部{{ item.children.length }}条</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div style="padding: 20px 0 80px; text-align: center; color: #888;">- 已经到底啦 -</div>

        <div class="footer">
            <el-input class="input" placeholder="发表评论…" @focus="reply.reply()" />

            <button @click="reply.reply()">
                <mdiForumOutline />{{ post.comments }}
            </button>

            <button v-if="post.currentUserLike" @click="Posts.removeLike(post.id)">
                <mdiThumbUp color="red" />{{ post.likes }}
            </button>
            <button v-else @click="Posts.addLike(post.id)">
                <mdiThumbUpOutline />{{ post.likes }}
            </button>

            <button v-if="post.currentUserFavorite" @click="Posts.removeFav(post.id)">
                <mdiStar color="gold" />{{ post.favorite }}
            </button>
            <button v-else @click="Posts.addFav(post.id)">
                <mdiStarOutline />{{ post.favorite }}
            </button>
        </div>

        <overlay-card v-if="commentViewing" title="评论详情" :closeAction="() => router.back()">
            <div class="comment">
                <img class="avatar" :src="commentViewing.avatarUrl">
                <div class="content">
                    <div class="root-name">
                        <div class="author-name">{{ commentViewing.nickName }}</div>
                        <div v-if="commentViewing.userId == post.userId" class="author-label">楼主</div>
                    </div>

                    <div style="margin: 8px 0;">{{ commentViewing.content }}</div>

                    <comment-actions :comment="commentViewing" :reply-action="() => reply.reply(commentViewing.id, commentViewing.id, commentViewing.nickName)"></comment-actions>
                </div>
            </div>

            <template v-if="commentViewing.children && commentViewing.children.length">
                <div style="padding: 12px;">全部回复</div>

                <div v-for="item in commentViewing.children" :key="item.id" class="comment">
                    <img class="avatar" :src="item.avatarUrl">
                    <div class="content">
                        <div class="root-name">
                            <div class="author-name">{{ item.nickName }}</div>
                            <div v-if="item.userId == post.userId" class="author-label">楼主</div>
                        </div>

                        <div style="margin: 8px 0;">
                            <span v-if="item.parentId != item.rootCommentId">
                                回复 <span style="color: #09f;">{{commentViewing.children.find(x => x.id == item.parentId)?.nickName}}</span>:
                            </span>
                            {{ item.content }}
                        </div>

                        <comment-actions :comment="item" :reply-action="() => reply.reply(commentViewing.id, item.id, item.nickName)"></comment-actions>
                    </div>
                </div>
            </template>
        </overlay-card>

        <div v-show="reply.show" class="reply-overlay" @click="reply.show = false">
            <div class="reply" @click="e => e.stopPropagation()">
                <el-input ref="replyInput" v-model="reply.data.content" :placeholder="reply.data.rootCommentId ? `回复 ${reply.replyUsername}…` : '发表评论…'"></el-input>
                <el-button ref="replySendBtn" type="primary" @click="reply.send()">发送</el-button>
            </div>
        </div>
    </template>

    <ErrorPage v-else-if="error" :message="error" />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import { ref, watch } from 'vue';
import * as Posts from '@/axios/api/posts'
import * as Comments from '@/axios/api/comments'
import * as Follow from '@/axios/api/follow'
import { onMounted, nextTick, reactive, computed } from 'vue';
import { ElButton, ElInput, ElMessage } from 'element-plus';
import commentActions from '@/components/posts/CommentActions.vue';
import OverlayCard from '@/components/slot/OverlayCard.vue';
import ErrorPage from '@/components/ErrorPage.vue';

const route = useRoute()

const postId = ref(typeof route.params.postId == 'string' ? parseInt(route.params.postId) : null)
const commentId = ref(typeof route.params.commentId == 'string' ? parseInt(route.params.commentId) : null)

watch(() => route.params.commentId, (newId) => {
    if (typeof newId != 'object') commentId.value = parseInt(newId) || null
})


const post = ref<Posts.Post>()
const comments = ref<Comments.Comment[]>()

const commentViewing = computed(() => comments.value?.find(x => x.id == commentId.value))


enum Sort { hotest, latest }
const commentsSort = ref(Sort.hotest)
watch(commentsSort, loadComments)

const error = ref('')

const authorFollowed = ref(false)

const replyInput = ref<InstanceType<typeof ElInput>>()
const replySendBtn = ref<InstanceType<typeof ElButton>>()

const reply = reactive({
    show: false,
    data: {
        postId: null,
        rootCommentId: null,
        parentId: null,
        content: '',
        status: null
    },
    replyUsername: '',

    reply(rootCommentId: number = null, parentId: number = null, replyUsername: string = null) {
        reply.data.postId = post.value.id
        reply.data.rootCommentId = rootCommentId
        reply.data.parentId = parentId
        reply.data.status = (rootCommentId && parentId) ? 2 : 1
        reply.show = true
        reply.replyUsername = replyUsername
        nextTick(() => replyInput.value.focus())
    },

    send() {
        if (!reply.data.content) {
            ElMessage.info('回复不能为空')
            return
        }

        replySendBtn.value.$el.disabled = true
        Comments.postComment(reply.data).then(r => {
            if (r.data.success) {
                reply.data.content = ''
                reply.show = false
                ElMessage.success('回复成功')
                loadComments()
            } else ElMessage.error(r.data.errorMsg)
        }).finally(() => {
            replySendBtn.value.$el.disabled = false
        })
    },
})


function loadPost() {
    Posts.getPostById(postId.value).then(r => {
        if (r.data.success) post.value = r.data.data
        else error.value = r.data.errorMsg
    })
}

function loadComments() {
    if (commentsSort.value == Sort.hotest) Comments.getHotCommentsForPost(postId.value).then(r => comments.value = r.data.data)
    if (commentsSort.value == Sort.latest) Comments.getLatestCommentsForPost(postId.value).then(r => comments.value = r.data.data)
}

onMounted(() => {
    loadPost()
    loadComments()
})
</script>

<style scoped lang="less">
.header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background-color: rgba(240, 240, 240, 0.75);
    backdrop-filter: blur(8px);
    z-index: 10;

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

.tags {
    margin: 12px 8px;

    .el-tag {
        margin-right: 4px;
    }
}

.post-time {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px;
    color: #888;

    .date {
        font-size: 0.8em;
        flex: 1;
    }
}

.comments-header {
    display: flex;
    align-items: center;
    padding: 12px;

    .fade {
        color: #888;
    }
}

.comment {
    display: flex;
    align-items: flex-start;
    padding: 12px;
    border-bottom: 1px solid #ccc;
    gap: 8px;

    .avatar {
        width: 40px;
        height: 40px;
        border-radius: 100%;
    }

    .content {
        flex: 1;

        .author-label {
            font-size: 0.8em;
            color: #09f;
            border: 1px solid #09f;
            padding: 0.2em 0.3em;
            border-radius: 0.6em;
        }

        .root-name {
            display: flex;
            align-items: baseline;
            gap: 4px;
            margin: 10px 0;

            .author-name {
                font-size: 0.9em;
            }
        }

        .reply-block {
            background-color: rgba(0, 0, 0, 0.025);
            font-size: 0.8em;
            margin: 8px 40px 8px 0;
            padding: 3px 0;

            div {
                padding: 3px 6px;
            }

            .author-label {
                padding: 0 0.2em;
                margin-left: 0.2em;
            }

            .more-btn {
                color: #09f;
                display: flex;
                align-items: center;
            }
        }
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
        padding: 8px;
        border: none;
        background: none;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1em;
    }
}

.reply-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 100;

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
</style>