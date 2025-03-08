<template>
    <UserListItem v-for="n in Array(10).keys().map(x => x + 1)" :user="{
        id: n,
        avatarUrl: '',
        nickName: 'username',
        userType: 2,
        tag: 'Tag1 Tag2',
    }" />
</template>

<script setup lang="ts">
import UserListItem from '@/components/user/UserListItem.vue';
import * as Self from '@/axios/api/self';
import { onMounted } from 'vue';

onMounted(() => {
    // Self.FollowController.loadBoth()
})
</script>

<style scoped lang="scss"></style>
