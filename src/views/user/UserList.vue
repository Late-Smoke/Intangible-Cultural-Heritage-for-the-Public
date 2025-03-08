<template>
    <SvgBackgroundLion />
    <page-header-sticky-with-back :title='userId ? `"${username}" 的关注列表` : listType' />

    <ContentListContainer v-if="userRenponse" v-model="userRenponse">
        <UserListItem v-for="user in userRenponse.data" :user="user" />
    </ContentListContainer>
    <UserListItem v-else v-for="user in users" :user="user" />
</template>

<script setup lang="ts">
import * as Self from '@/axios/api/self';
import * as User from '@/axios/api/user';
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import SvgBackgroundLion from '@/components/slot/SvgBackgroundLion.vue';
import UserListItem from '@/components/user/UserListItem.vue';
import { onMounted, ref } from 'vue';
import ContentListContainer from '@/components/slot/ContentListContainer.vue';
import { Response } from '@/axios/api/common';


const { listType, userId } = defineProps<{
    listType: string
    userId?: string
}>()

const users = ref<Self.FollowUser[]>()

const userRenponse = ref<Response<Self.FollowUser[]>>()
const username = ref('用户')

onMounted(() => {
    if (!userId) {
        Self.FollowController.loadBoth().then(() => {
            if (listType == '我的关注') users.value = Self.FollowController.followingList
            else if (listType == '我的粉丝') users.value = Self.FollowController.followersList
        })
    } else {
        User.getFollowing(userId).then(r => userRenponse.value = r.data)
        User.getUser(userId).then(r => username.value = r.data.data.nickName)
    }
})
</script>

<style scoped lang="scss"></style>
