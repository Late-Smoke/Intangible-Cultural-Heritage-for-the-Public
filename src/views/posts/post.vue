<template>
    <template v-if="post">
        <SvgBackgroundDragon />

        <!-- Header -->
        <div class="header">
            <el-button text circle icon="ArrowLeft" size="large" style="font-size: 1.25em;" @click="router.back()"></el-button>

            <img class="avatar" :src="post.avatarUrl" @click="gotoUser(post.userId)">
            <div class="name">
                <span @click="gotoUser(post.userId)">{{ post.nickName }}</span>
            </div>

            <el-button v-if="!post.beFan" round @click="setFollow(true)">
                <span style="color: #855D12; font-size: 1.7em; margin-right: 4px;">+</span>关注
            </el-button>
            <el-button v-else round @click="setFollow(false)">已关注</el-button>

            <el-button round icon="mdiShareOutline" style="font-size: 1.5em; color: #A0814D;" @click="showShare = true"></el-button>
        </div>


        <!-- Images -->
        <el-carousel v-if="post.urls" trigger="click" height="40vh" :autoplay="false">
            <el-carousel-item v-for="(item, index) in post.urls">
                <el-image v-if="item.type == 0" fit="contain" :preview-teleported="true" :src="item.url" :preview-src-list="post.urls.map(x => x.url)" :initial-index="index" />
                <video v-if="item.type == 1" :src="item.url"></video>
            </el-carousel-item>
        </el-carousel>


        <!-- Main content -->
        <h3 class="title">{{ post.title }}</h3>
        <div class="body" v-html="post.content"></div>


        <div v-if="typeof post.tag == 'string'" class="tags">
            <span v-for="item in post.tag.split(' ')">{{ item }}</span>
        </div>

        <div class="post-time">
            <el-icon>
                <EditPen />
            </el-icon>
            <span class="date">发布于 {{ formatDate(post.createdTime) }}</span>

            <button class="support" @click="">
                <svg width="33" height="36" viewBox="0 0 33 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.8005 15H19.25V7.5C19.25 6.70435 18.9603 5.94129 18.4445 5.37868C17.9288 4.81607 17.2293 4.5 16.5 4.5H16.3694C15.6819 4.5 15.125 5.1075 15.125 5.8575C15.125 6.9285 14.8349 7.9755 14.289 8.8665L9.625 16.5V30L14.7964 31.41C15.015 31.47 15.2391 31.5 15.4633 31.5H20.9866C21.4977 31.5003 21.9987 31.3452 22.4334 31.0521C22.8681 30.7591 23.2194 30.3397 23.4479 29.841L28.2604 19.341C28.4699 18.8836 28.5688 18.3754 28.5476 17.8646C28.5265 17.3539 28.386 16.8575 28.1395 16.4225C27.8931 15.9876 27.5488 15.6287 27.1395 15.3797C26.7301 15.1307 26.2692 15 25.8005 15Z" fill="#FFF1E3" />
                    <path d="M25.8005 15L25.8005 14H25.8005V15ZM19.25 15H18.25C18.25 15.5523 18.6977 16 19.25 16V15ZM18.4445 5.37868L17.7074 6.0544L18.4445 5.37868ZM14.289 8.8665L13.4363 8.34409L13.4357 8.34512L14.289 8.8665ZM9.625 16.5L8.77167 15.9786C8.67575 16.1356 8.625 16.316 8.625 16.5H9.625ZM9.625 30H8.625C8.625 30.451 8.92685 30.8462 9.36195 30.9648L9.625 30ZM14.7964 31.41L15.061 30.4457L15.0594 30.4452L14.7964 31.41ZM20.9866 31.5L20.9871 30.5H20.9866V31.5ZM22.4334 31.0521L21.8745 30.2229L21.8745 30.2229L22.4334 31.0521ZM23.4479 29.841L22.5388 29.4243L22.5387 29.4245L23.4479 29.841ZM28.2604 19.341L29.1694 19.7577L29.1695 19.7574L28.2604 19.341ZM28.5476 17.8646L29.5468 17.8233L28.5476 17.8646ZM28.1395 16.4225L29.0096 15.9295L29.0096 15.9295L28.1395 16.4225ZM27.1395 15.3797L27.6591 14.5253L27.6591 14.5253L27.1395 15.3797ZM25.8005 14H19.25V16H25.8005V14ZM20.25 15V7.5H18.25V15H20.25ZM20.25 7.5C20.25 6.46586 19.8742 5.45844 19.1817 4.70295L17.7074 6.0544C18.0463 6.42414 18.25 6.94284 18.25 7.5H20.25ZM19.1817 4.70295C18.4865 3.94456 17.524 3.5 16.5 3.5V5.5C16.9347 5.5 17.3711 5.68758 17.7074 6.0544L19.1817 4.70295ZM16.5 3.5H16.3694V5.5H16.5V3.5ZM16.3694 3.5C15.0495 3.5 14.125 4.6389 14.125 5.8575H16.125C16.125 5.73093 16.1716 5.63312 16.2265 5.57322C16.2801 5.5148 16.3312 5.5 16.3694 5.5V3.5ZM14.125 5.8575C14.125 6.74971 13.883 7.61502 13.4363 8.34409L15.1417 9.38891C15.7868 8.33597 16.125 7.10729 16.125 5.8575H14.125ZM13.4357 8.34512L8.77167 15.9786L10.4783 17.0214L15.1423 9.38788L13.4357 8.34512ZM8.625 16.5V30H10.625V16.5H8.625ZM9.36195 30.9648L14.5333 32.3748L15.0594 30.4452L9.88805 29.0352L9.36195 30.9648ZM14.5317 32.3743C14.8366 32.458 15.1498 32.5 15.4633 32.5V30.5C15.3285 30.5 15.1934 30.482 15.061 30.4457L14.5317 32.3743ZM15.4633 32.5H20.9866V30.5H15.4633V32.5ZM20.9861 32.5C21.7019 32.5004 22.3969 32.2827 22.9923 31.8813L21.8745 30.2229C21.6005 30.4076 21.2934 30.5002 20.9871 30.5L20.9861 32.5ZM22.9923 31.8813C23.5868 31.4807 24.0557 30.9152 24.357 30.2575L22.5387 29.4245C22.3831 29.7642 22.1495 30.0375 21.8745 30.2229L22.9923 31.8813ZM24.3569 30.2577L29.1694 19.7577L27.3513 18.9243L22.5388 29.4243L24.3569 30.2577ZM29.1695 19.7574C29.4458 19.1543 29.5743 18.489 29.5468 17.8233L27.5485 17.906C27.5632 18.2619 27.494 18.6129 27.3512 18.9246L29.1695 19.7574ZM29.5468 17.8233C29.5192 17.1576 29.3361 16.5058 29.0096 15.9295L27.2695 16.9156C27.4359 17.2091 27.5337 17.5502 27.5485 17.906L29.5468 17.8233ZM29.0096 15.9295C28.6828 15.3529 28.2206 14.8668 27.6591 14.5253L26.6199 16.2341C26.8771 16.3905 27.1034 16.6223 27.2695 16.9156L29.0096 15.9295ZM27.6591 14.5253C27.0968 14.1833 26.4567 14 25.8005 14L25.8005 16C26.0816 16 26.3634 16.0781 26.6199 16.2341L27.6591 14.5253Z" fill="black" />
                    <path d="M5.875 15H9V30H5.875C4.625 29.4 4 28.8 4 27.6V16.2C4.20833 15.8 4.875 15.48 5.875 15Z" fill="#FFF1E3" />
                    <path d="M9 15H10V14H9V15ZM5.875 15V14H5.64743L5.44227 14.0985L5.875 15ZM4 16.2L3.11309 15.7381L3 15.9552V16.2H4ZM5.875 30L5.44227 30.9015L5.64743 31H5.875V30ZM9 30V31H10V30H9ZM9 14H5.875V16H9V14ZM5.44227 14.0985C4.95768 14.3311 4.49325 14.553 4.12737 14.7718C3.78618 14.9758 3.35421 15.2751 3.11309 15.7381L4.88691 16.6619C4.85413 16.7249 4.85966 16.6642 5.15388 16.4882C5.42342 16.327 5.79232 16.1489 6.30773 15.9015L5.44227 14.0985ZM3 16.2V27.6H5V16.2H3ZM3 27.6C3 28.3963 3.21583 29.0836 3.70053 29.6652C4.15285 30.208 4.77922 30.5833 5.44227 30.9015L6.30773 29.0985C5.72078 28.8167 5.40965 28.592 5.23697 28.3848C5.09667 28.2164 5 28.0037 5 27.6H3ZM5.875 31H9V29H5.875V31ZM10 30V15H8V30H10Z" fill="black" />
                </svg>
                支持作者
            </button>
        </div>

        <div class="comments-header">
            <div style="flex: 1;">全部评论</div>
            <div style="font-size: 0.9em;">
                <span @click="commentsSort = Sort.hotest" :class="commentsSort == Sort.hotest ? 'active' : 'fade'">热门</span>
                <span style="color: #ccc;"> | </span>
                <span @click="commentsSort = Sort.latest" :class="commentsSort == Sort.latest ? 'active' : 'fade'">最新</span>
            </div>
        </div>


        <!-- Root comment list -->
        <template v-if="comments">
            <div v-for="item in comments" :key="item.id" class="comment">
                <img class="avatar" :src="item.avatarUrl" @click="gotoUser(item.userId)">

                <div class="content">
                    <div class="root-name">
                        <div class="author-name" @click="gotoUser(item.userId)">{{ item.nickName }}</div>
                        <div v-if="item.userId == post.userId" class="author-label">楼主</div>
                    </div>

                    <div style="margin: 8px 0;">{{ item.content }}</div>

                    <comment-actions :comment="item" :reply-action="() => reply.reply(item.id, item.id, item.nickName)"></comment-actions>

                    <div v-if="item.children && item.children.length" class="reply-block" @click="gotoPostComment(props.postId, item.id)">
                        <div class="reply" v-for="item1 in item.children.slice(0, 3)" :key="item1.id">
                            <img :src="item1.avatarUrl">
                            <div>
                                <div style="color: #888; font-size: 0.9em; margin-bottom: 2px;">
                                    {{ item1.nickName }}<span v-if="item1.userId == post.userId" class="author-label">楼主</span>
                                </div>
                                <div>{{ item1.content }}</div>
                            </div>
                        </div>

                        <div v-if="item.children.length > 0" class="more-btn">
                            <span style="width: 24px; margin: 0 12px 0 4px; border-bottom: 1px solid #ccc;"></span>
                            <span>查看全部{{ item.children.length }}条</span>
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <div style="padding: 20px 0 100px; text-align: center; color: #888;">{{ comments ? '- 已经到底啦 -' : '正在加载评论…' }}</div>

        <!-- Footer -->
        <div class="footer">
            <div class="input" @click="reply.reply()">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.4471 16.0355L11.0657 15.3422C11.8246 14.4916 13.1863 14.6021 13.7981 15.5641C14.368 16.4602 15.6062 16.63 16.3964 15.9205L17.5176 14.9139M2.48241 16.2247L6.12073 15.4916C6.31387 15.4526 6.49122 15.3575 6.6305 15.2182L14.7752 7.06898C15.1657 6.67827 15.1655 6.04495 14.7746 5.65456L13.0493 3.93117C12.6586 3.54094 12.0256 3.54121 11.6353 3.93176L3.48971 12.0818C3.3507 12.2209 3.25578 12.3979 3.21683 12.5906L2.48241 16.2247Z" stroke="#8D8D8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                发表评论…
            </div>

            <button @click="reply.reply()">
                <mdiForumOutline />{{ post.comments }}
            </button>

            <button @click="setLike(!post.currentUserLike)">
                <mdiThumbUp v-if="post.currentUserLike" color="red" />
                <mdiThumbUpOutline v-else />
                {{ post.likes }}
            </button>

            <button @click="setFav(!post.currentUserFavorite)">
                <mdiStar v-if="post.currentUserFavorite" color="gold" />
                <mdiStarOutline v-else />
                {{ post.favorite }}
            </button>
        </div>


        <!-- Comment overlay -->
        <overlay-card v-if="commentViewing" title="评论详情" :closeAction="() => router.back()">
            <!-- Root comment -->
            <div class="comment">
                <img class="avatar" :src="commentViewing.avatarUrl" @click="gotoUser(commentViewing.userId)">

                <div class="content">
                    <div class="root-name">
                        <div class="author-name" @click="gotoUser(commentViewing.userId)">{{ commentViewing.nickName }}</div>
                        <div v-if="commentViewing.userId == post.userId" class="author-label">楼主</div>
                    </div>

                    <div style="margin: 8px 0;">{{ commentViewing.content }}</div>

                    <comment-actions :comment="commentViewing" :reply-action="() => reply.reply(commentViewing.id, commentViewing.id, commentViewing.nickName)"></comment-actions>
                </div>
            </div>

            <template v-if="commentViewing.children && commentViewing.children.length">
                <div style="padding: 12px;">全部回复</div>

                <!-- Child comments -->
                <div v-for="item in commentViewing.children" :key="item.id" class="comment">
                    <img class="avatar" :src="item.avatarUrl" @click="gotoUser(item.userId)">

                    <div class="content">
                        <div class="root-name">
                            <div class="author-name" @click="gotoUser(item.userId)">{{ item.nickName }}</div>
                            <div v-if="item.userId == post.userId" class="author-label">楼主</div>
                        </div>

                        <div style="margin: 8px 0;">
                            <span v-if="item.parentId != item.rootCommentId">
                                回复 <span style="color: #987B5B;">{{commentViewing.children.find(x => x.id == item.parentId)?.nickName}}</span>:
                            </span>
                            {{ item.content }}
                        </div>

                        <comment-actions :comment="item" :reply-action="() => reply.reply(commentViewing.id, item.id, item.nickName)"></comment-actions>
                    </div>
                </div>
            </template>
        </overlay-card>


        <!-- Share menu -->
        <overlay-card v-if="showShare" :close-action="() => showShare = false" title="分享" bottom>
            <div class="share">
                <div>
                    <mdiShareOutline />转发
                </div>
                <div @click="copyLink()">
                    <mdiLink />复制链接
                </div>
            </div>
        </overlay-card>


        <!-- Comment input -->
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
import router from '@/router';
import { ref, watch } from 'vue';
import * as Posts from '@/axios/api/posts'
import * as Comments from '@/axios/api/comments'
import * as User from '@/axios/api/user'
import { onMounted, nextTick, reactive, computed } from 'vue';
import { ElButton, ElInput, ElMessage } from 'element-plus';
import commentActions from '@/components/posts/CommentActions.vue';
import OverlayCard from '@/components/slot/OverlayCard.vue';
import ErrorPage from '@/views/error/ErrorPage.vue';
import { formatDate, gotoPostComment, gotoUser, setClipboard } from '@/utils';
import * as Self from '@/axios/api/self'
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';

const props = defineProps<{
    postId: string
    commentId?: string
}>()


const post = ref<Posts.Post>()
const comments = ref<Comments.Comment[]>()

const error = ref('')

const commentViewing = computed(() => comments.value?.find(x => x.id == parseInt(props.commentId)))

enum Sort { hotest, latest }
const commentsSort = ref(Sort.hotest)
watch(commentsSort, loadComments)


const showShare = ref(false)

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
            ElMessage.warning('回复不能为空')
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


function setFollow(value: boolean) {
    (value ? User.follow(post.value.userId) : User.unfollow(post.value.userId))
        .then(loadPost)
}

function setLike(value: boolean) {
    (value ? Posts.addLike(post.value.id) : Posts.removeLike(post.value.id))
        .then(loadPost)
}

function setFav(value: boolean) {
    (value ? Posts.addFav(post.value.id) : Posts.removeFav(post.value.id))
        .then(loadPost)
}


function copyLink() {
    setClipboard(`${post.value.title} - ${post.value.nickName}\n${location.href}`).then(() => {
        ElMessage.success('复制成功')
        showShare.value = false
    }).catch(() => { })
}


function loadPost() {
    Posts.getPostById(props.postId).then(r => {
        if (r.data.success) post.value = r.data.data
        else error.value = r.data.errorMsg
    })
}

function loadComments() {
    if (commentsSort.value == Sort.hotest) Comments.getHotCommentsForPost(props.postId).then(r => comments.value = r.data.data)
    if (commentsSort.value == Sort.latest) Comments.getLatestCommentsForPost(props.postId).then(r => comments.value = r.data.data)
}

onMounted(() => {
    loadPost()
    loadComments()
})
</script>

<style scoped lang="scss">
.header {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px;
    background-color: #ffefd6bd;
    backdrop-filter: blur(8px);
    z-index: 10;

    .avatar {
        width: 40px;
        height: 40px;
        box-sizing: content-box;
        border-radius: 100%;
        object-fit: cover;
    }

    .name {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    button {
        margin: 0;
        border-radius: 100px;
        border: none;
    }
}

.el-carousel__item {

    .el-image,
    video {
        display: block;
        width: 100%;
        height: 100%;
    }

    video {
        object-fit: contain;
    }
}

.title {
    margin: 12px 8px;
}

.body {
    margin: 8px;

    :deep(*) {
        font-size: 1em !important;
        background: none !important;
        margin: 0 0 0.5em 0 !important;
        padding: 0 !important;
        line-height: 1.5em !important;
    }
}

.tags {
    margin: 12px 8px;
    color: #766450;

    span {
        padding: 2px 6px;
        font-size: 0.8em;
        border: 1px solid #766450;
        border-radius: 8px;
        margin-right: 4px;
    }
}

.post-time {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 8px 12px 8px;
    color: #444;

    .date {
        font-size: 0.8em;
        flex: 1;
    }

    .support {
        border: none;
        background-color: #FFE2B8;
        padding: 4px 8px 4px 40px;
        border-radius: 100px;
        position: relative;
        font-size: 0.9em;

        svg {
            position: absolute;
            left: 8px;
            bottom: 0;
        }
    }
}

.comments-header {
    display: flex;
    align-items: center;
    padding: 12px;
    border-top: 2px solid #ddd;

    .fade {
        color: #888;
    }

    .active {
        color: #987B5B;
        font-weight: bold;
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
        object-fit: cover;
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
                color: #444;
            }
        }

        .reply-block {
            .reply {
                display: flex;
                gap: 8px;
                margin-bottom: 8px;

                >img {
                    width: 32px;
                    height: 32px;
                    border-radius: 100%;
                    object-fit: cover;
                }

                .author-label {
                    padding: 0 0.2em;
                    margin-left: 0.2em;
                }
            }

            .more-btn {
                font-size: 0.9em;
                color: #766552;
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

    .input {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 5px 14px;
        border-radius: 100px;
        border: 1px solid #ccc;
        color: #888;
        background-color: #eee;
        font-size: 0.8em;
    }

    button {
        margin: 0;
        padding: 8px;
        border: none;
        background: none;
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 1em;
        color: #766552;

        svg {
            font-size: 1.25em;
        }
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

.share {
    display: flex;
    align-items: center;
    padding: 0 4px;

    >div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #555;
        padding: 4px 12px 16px;
        font-size: 0.9em;
        gap: 4px;

        >svg {
            font-size: 3em;
            background-color: #eee;
            border-radius: 100%;
            padding: 6px;
            color: var(--el-color-primary-dark-2)
        }
    }
}
</style>