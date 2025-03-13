<template>
    <SvgBackgroundLion />
    <PageHeader :title='userId ? `"${username}" 的关注列表` : listType' />

    <ResponseListContainer v-if="userRenponse" v-model="userRenponse">
        <UserListItem v-for="user in [...userRenponse.data].reverse()" :user="user" />
    </ResponseListContainer>
</template>

<script setup lang="ts">
import * as Self from '@/axios/api/self';
import * as User from '@/axios/api/user';
import PageHeader from '@/components/slot/PageHeader.vue';
import SvgBackgroundLion from '@/components/slot/SvgBackgroundLion.vue';
import UserListItem from '@/components/user/UserListItem.vue';
import { onMounted, ref, computed } from 'vue';
import ResponseListContainer from '@/components/slot/ResponseListContainer.vue';
import { Response } from '@/axios/api/common';


const { listType, userId } = defineProps<{
    listType: string
    userId?: string
}>()

const userRenponse = computed(() => {
    if (listType == '我的关注') return Self.FollowController.following.userResponse
    else if (listType == '我的粉丝') return Self.FollowController.followers.userResponse
    else return response.value
})

const response = ref<Response<Self.FollowUser[]>>()
const username = ref('用户')

onMounted(() => {
    if (!userId) {
        Self.FollowController.loadBoth()
    } else {
        User.getFollowing(userId).then(r => response.value = r.data)
        User.getUser(userId).then(r => username.value = r.data.data.nickName)
    }
})
</script>

<style scoped lang="scss"></style>
