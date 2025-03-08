<template>
    <div class="user-list-item">
        <img :src="user.avatarUrl" @click="gotoUser(user.id)">

        <div class="main">
            <div class="name" @click="gotoUser(user.id)">
                <span>{{ user.nickName }}</span>
                <span class="user-type" v-if="user.userType"> {{ ['', '媒体', '非遗传承人', '管理员'][user.userType] }}</span>
            </div>

            <div class="tags" v-if="typeof user.tag == 'string'">
                <span v-for="tag in splitStringBySpace(user.tag)">{{ tag }}</span>
            </div>
        </div>

        <div class="action">
            <div class="outline" v-if="!isFollowing" @click="setFollowing(true)">关注</div>
            <div class="gray" v-else-if="!Self.FollowController.isFollower(user.id).value" @click="setFollowing(false)">已关注</div>
            <div class="gray" v-else @click="setFollowing(false)">已互粉</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Self from '@/axios/api/self';
import * as User from '@/axios/api/user';
import { gotoUser, promiseSuccess, splitStringBySpace } from '@/utils';
import { ref } from 'vue';

const { user } = defineProps<{
    user: Self.FollowUser
}>()

const isFollowing = ref(Self.FollowController.isFollowing(user.id).value)

function setFollowing(value: boolean) {
    promiseSuccess(value ? User.follow(user.id) : User.unfollow(user.id))
        .then(() => isFollowing.value = value)
}
</script>

<style scoped lang="scss">
.user-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px;

    >img {
        width: 44px;
        height: 44px;
        border-radius: 100%;
        object-fit: cover;
    }

    .main {
        flex: 1;

        .name {
            .user-type {
                font-size: 0.75em;
                color: white;
                padding: 1px 3px;
                background-color: #90A9DC;
                border-radius: 4px;
                margin-left: 4px;
            }
        }

        .tags {
            >span {
                color: #766450;
                border: 1px solid #766450;
                padding: 0 3px;
                font-size: 0.75em;
                border-radius: 4px;
                margin-right: 4px;
            }
        }
    }

    .action {
        display: flex;
        align-items: center;
        justify-content: center;

        >div {
            text-align: center;
            width: 64px;
            font-size: 0.8em;
            padding: 4px 0;
            border-radius: 4px;

            &.outline {
                color: #987B5B;
                border: 1px solid #987B5B;
            }

            &.gray {
                background-color: #ddd;
                color: #444;
                border: 1px solid #bbb;
            }
        }
    }
}
</style>
