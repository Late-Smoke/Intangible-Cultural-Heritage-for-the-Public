<template>
    <div class="user-info">
        <div class="menu" v-if="isSelf">
            <div @click="">
                <mdiCog />
            </div>
            <div @click="">
                <mdiMenu />
            </div>
        </div>
        <div class="menu menu-back" v-else>
            <div @click="">
                <mdiChevronLeft />
            </div>
        </div>

        <div class="user" v-if="user">
            <div class="top">
                <img :src="user.avatarUrl">

                <div class="main">
                    <div class="name">
                        {{ user.nickName }}
                        <span @click="">
                            <el-icon>
                                <EditPen />
                            </el-icon>
                        </span>
                    </div>
                    <div class="other-info">
                        <div>UID: {{ }}</div>
                        <div>IP属地: {{ }}</div>
                    </div>
                </div>

                <div class="action" v-if="!isSelf">
                    <el-button type="warning" plain>关注</el-button>
                </div>
            </div>

            <div class="signature">{{ user.signature }}</div>

            <TagsEditor v-model="userTags"></TagsEditor>

            <div class="user-type">
                <span :class="['gray', 'purple', 'gold', 'green'].at(user.userType)">{{ user.userType ? '身份认证: ' : '' }}{{ ['普通用户', '媒体', '非遗传承人', '管理员'].at(user.userType) }}</span>
            </div>

            <div class="social-status">
                <div @click=""><span>{{ humanizeNumber(user.fans) }}</span>粉丝</div>
                <div @click=""><span>{{ humanizeNumber(user.idols) }}</span>关注</div>
                <div @click=""><span>{{ humanizeNumber(user.likes) }}</span>获赞</div>
            </div>
        </div>
    </div>

    <div class="card">
        <div class="entry-button">
            <div v-if="user && user.userType" @click="">
                <div class="text-main">
                    <mdiStore />工坊
                </div>
                <div class="text-secondary">在售商品管理</div>
            </div>

            <div v-if="isSelf" @click="">
                <div class="text-main">
                    <mdiLightbulbOutline />创作中心
                </div>
                <div class="text-secondary">投稿收益管理</div>
            </div>

            <div v-if="user && user.userType" @click="">
                <div class="text-main">
                    <mdiBookOpenVariantOutline />非遗课程
                </div>
                <div class="text-secondary">课程收益管理</div>
            </div>
        </div>

        <el-tabs class="tabs" v-model="currentTab">
            <el-tab-pane label="发布" :name="tabs.posts">
                <PostPreview v-for="post in myPosts" :post="post" self />
            </el-tab-pane>

            <el-tab-pane label="评论" :name="tabs.comments">
                <CommentQuoteReply v-for="comment in myComments" :comment="comment"/>
            </el-tab-pane>

            <el-tab-pane label="收藏" :name="tabs.favorites">
                <PostPreview v-for="post in myFavorites" :post="post" />
            </el-tab-pane>

            <el-tab-pane label="活动" :name="tabs.activities">
                活动
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import TagsEditor from '@/components/slot/TagsEditor.vue';
import { humanizeNumber } from '@/utils'
import * as Posts from '@/axios/api/posts'
import PostPreview from '@/components/posts/PostPreview.vue'
import CommentQuoteReply from '@/components/posts/CommentQuoteReply.vue';

const route = useRoute()
const isSelf = route.name == 'self'

const user = ref<Self.Self | null>()
const userTags = ref<string[]>([])


enum tabs { posts, comments, favorites, activities }
const currentTab = ref(tabs.posts)

watch(currentTab, () => {
    switch (currentTab.value) {
        case tabs.posts:
            Self.getPosts().then(r => myPosts.value = r.data.data.reverse())
            break
        case tabs.comments:
            Self.getComments().then(r => myComments.value = r.data.data.reverse())
            break
        case tabs.favorites:
            Self.getFavPosts().then(r => myFavorites.value = r.data.data.reverse())
            break
    }
}, { immediate: true })


const myPosts = ref<Posts.Post[]>()
const myFavorites = ref<Posts.Post[]>()
const myComments = ref<Self.Comment[]>()


function getSelf() {
    Self.getSelf().then(r => {
        user.value = r.data.data
        userTags.value = r.data.data.tag ? [...user.value.tag.split(' ')] : []
    })
}

onMounted(() => {
    getSelf()
})
</script>

<style scoped lang="scss">
.user-info {
    padding: 12px 12px 24px;
    background: linear-gradient(150deg, #fff1d7, #f1b96d);

    .menu {
        display: flex;
        align-items: center;
        justify-content: right;
        font-size: 1.5em;
        gap: 8px;

        >div {
            padding: 6px;

            svg {
                display: block;
            }
        }

        &.menu-back {
            justify-content: left;
            padding-bottom: 12px;

            >div {
                padding: 0;
            }
        }
    }


    .user {
        padding: 0 8px;

        .top {
            display: flex;
            gap: 8px;

            >img {
                width: 48px;
                height: 48px;
                border-radius: 100%;
            }

            .main {
                flex: 1;

                .name {
                    font-size: 1.1em;

                    .el-icon {
                        vertical-align: bottom;
                        font-size: 1.25em;
                    }
                }

                .other-info {
                    padding: 4px 0;
                    font-size: 0.8em;
                    color: #666;

                    >div {
                        margin: 2px 0;
                    }
                }
            }

            .action {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
        }

        .signature {
            font-size: 0.9em;
        }

        .tags-editor {
            margin: 8px 0;
        }

        .user-type {
            margin: 8px 0;

            span {
                display: inline-block;
                font-size: 0.9em;
                padding: 2px 8px;
                color: white;
                font-weight: bold;
                border-radius: 4px;

                &.gray {
                    background-color: #aaa;
                }

                &.purple {
                    background: linear-gradient(120deg, #e21be3, #fe94ff);
                }

                &.gold {
                    background: linear-gradient(120deg, #ffc600, #ffd851);
                }

                &.green {
                    background: linear-gradient(120deg, #25dd77, #7ef1b2);
                }
            }
        }

        .social-status {
            display: flex;
            gap: 16px;
            margin: 12px 0;

            >div {
                font-size: 0.8em;

                >span {
                    font-size: 1.25em;
                    margin-right: 4px;
                }
            }
        }
    }
}

.card {
    background-color: white;
    border-radius: 16px 16px 0 0;
    margin-top: -16px;
    padding: 12px 0;

    .entry-button {
        padding: 0 16px;
        display: flex;
        gap: 8px;

        >div {
            flex: 1;
            flex-shrink: 0;
            background-color: #eee;
            padding: 8px 0;
            margin: 4px 0;
            border-radius: 10px;
            text-align: center;

            .text-main {
                font-size: 1.1em;

                >svg {
                    font-size: 1.3em;
                    vertical-align: bottom;
                    margin-right: 2px;
                }
            }

            .text-secondary {
                margin-top: 2px;
                font-size: 0.75em;
                color: #444;
            }
        }
    }

    .tabs {
        --el-color-primary: #9F7638;

        :deep(.el-tabs__nav) {
            margin-left: 16px;
        }

        :deep(.el-tabs__nav-wrap:after) {
            opacity: 0;
        }

        :deep(.el-tabs__header) {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            background-color: rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(8px);
            margin-bottom: 8px;
        }

        :deep(.el-tabs__item.is-active) {
            font-weight: bold;
        }
    }
}
</style>