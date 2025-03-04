<template>
    <SvgBackgroundLion />
    <page-header-sticky-with-back :title="getTitle()" />

    <template v-if="notifications">
        <div class="list-item" v-for="notification in notifications">
            <img :src="notification.userVo.avatarUrl" @click="gotoUser(notification.userVo.id)">

            <div class="content">
                <div class="nickname" @click="gotoUser(notification.userVo.id)">{{ notification.userVo.nickName }}</div>

                <template v-if="route.name == 'notificationsReplies'">
                    <div class="date">{{ notification.title }}　{{ formatDate(notification.createdTime) }}</div>

                    <div class="comment">{{ notification.firstContent }}</div>

                    <div class="link" v-if="notification.secondContent">
                        {{ notification.secondContent.slice(0, 30) }}
                        <mdiChevronRight />
                    </div>
                </template>

                <div class="tags" v-if="route.name == 'notificationsFollows' && typeof notification.userVo.tag == 'string'">
                    <span v-for="tag in notification.userVo.tag.split(' ')">{{ tag }}</span>
                </div>

                <template v-if="route.name == 'notificationsLikes'">
                    <div class="date">{{ formatDate(notification.createdTime) }}</div>

                    <div class="comment">{{ notification.title }}</div>

                    <div class="link" v-if="notification.firstContent" @click="gotoSource(notification)">
                        {{ notification.firstContent.slice(0, 30) }}
                        <mdiChevronRight />
                    </div>
                </template>
            </div>

            <template v-if="route.name == 'notificationsFollows'">
                <el-button class="button" type="primary" v-if="!notification.userVo.beFan" @click="User.follow(notification.userVo.id); loadNotification()">互关</el-button>
                <el-button class="button" v-else @click="unfollowDialog.showUnfollow(notification.userVo.id, notification.userVo.nickName)">已互关</el-button>
            </template>
        </div>

        <div class="no-notification" v-if="!notifications.length">没有新通知</div>
    </template>

    <ConfirmDialog v-model="unfollowDialog.show" :content='`确认取消关注${unfollowDialog.username ? ` "${unfollowDialog.username}" ` : ""}?`' :action="unfollowDialog.confirmUnfollow" />
</template>

<script setup lang="ts">
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import SvgBackgroundLion from '@/components/slot/SvgBackgroundLion.vue';
import * as Notifications from '@/axios/api/notifications'
import { ref, onMounted, reactive } from 'vue'
import { formatDate, gotoPost, gotoUser } from '@/utils';
import { useRoute } from 'vue-router';
import ConfirmDialog from '@/components/slot/ConfirmDialog.vue';
import * as User from '@/axios/api/user'
import router from '@/router';

const route = useRoute()

const notifications = ref<Notifications.Notification[]>()

function loadNotification() {
    Notifications.getUnread().then(r => {
        switch (route.name) {
            case 'notificationsReplies':
                notifications.value = r.data.data.replyMessages
                break
            case 'notificationsFollows':
                notifications.value = r.data.data.followMessages
                break
            case 'notificationsLikes':
                notifications.value = r.data.data.likeMessage
                break
        }
    })
}

function getTitle() {
    switch (route.name) {
        case 'notificationsReplies': return '回复我的'
        case 'notificationsFollows': return '新增关注'
        case 'notificationsLikes': return '收到的赞'
    }
}

function gotoSource(notification: Notifications.Notification) {
    switch (notification.relatedType) {
        case 'post':
            gotoPost(notification.relatedId)
            break;
        case 'user':
            gotoUser(notification.relatedId)
            break;
        case 'post':
            break;
    }
}

const unfollowDialog = reactive({
    show: false,
    userId: undefined,
    username: undefined,
    showUnfollow(userId, username = undefined) {
        unfollowDialog.userId = userId
        unfollowDialog.username = username
        unfollowDialog.show = true
    },
    confirmUnfollow() {
        User.unfollow(unfollowDialog.userId).then(() => {
            unfollowDialog.show = false
            loadNotification()
        })
    }
})

onMounted(() => {
    loadNotification()
})

</script>

<style scoped lang="scss">
.list-item {
    display: flex;
    gap: 8px;
    padding: 0 12px;
    margin: 8px 0 16px;

    >img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        object-fit: cover;
    }

    .content {
        flex: 1;

        .date {
            color: #666;
            font-size: 0.8em;
            margin: 4px 0;
        }

        .tags {
            >span {
                font-size: 0.8em;
                padding: 1px 3px;
                color: #666;
                border: 1px solid #666;
                border-radius: 4px;
                padding-right: 4px;
            }
        }

        .comment {
            margin: 6px 0;
        }

        .link {
            color: #987B5B;
            padding: 0 4px;
            border-left: 2px solid rgb(162, 136, 108);
            font-size: 0.8em;
            font-weight: bold;
            display: flex;
            align-items: center;

            >svg {
                font-size: 1.5em;
            }
        }
    }
}

.no-notification {
    margin: 20px 0;
    text-align: center;
    color: #888;
}
</style>
