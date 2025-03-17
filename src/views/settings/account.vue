<template>
    <SvgBackgroundDragon />
    <PageHeader title="账号与安全" />

    <SettingItem name="头像" type="image" :value="settings.avatar" :action="() => showChangeAvatar(settings.avatar, loadSettings)" rounded-image />
    <SettingItem name="昵称" type="input" :value="settings.nickname" :input-action="() => showChangeNickname(settings.nickname, loadSettings)" />
    <SettingItem name="个性签名" type="input" :value="settings.signature" :action="updateSignature" input-tips="修改个性签名" />
    <SettingItem name="手机号码" type="input" :value="settings.phone" input-tips="修改手机号码" />
    <SettingItem name="修改密码" type="input" :input-action="showChangePassword" />

    <div ref="overlay"></div>
</template>

<script setup lang="tsx">
import PageHeader from '@/components/slot/PageHeader.vue';
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';
import SettingItem from '@/components/settings/SettingItem.vue';
import { reactive } from 'vue';
import { showChangeNickname, showChangeAvatar, showChangePassword } from '@/settings';
import { ref } from 'vue';

const overlay = ref<HTMLDivElement>()

const settings = reactive({
    avatar: undefined as string,
    nickname: '',
    signature: '',
    phone: '暂不支持修改',
})

function updateSignature(value: string) {
    return Self.updateProfile({ signature: value }).then(loadSettings)
}

function loadSettings() {
    Self.getSelf().then(r => {
        settings.avatar = r.data.data.avatarUrl
        settings.nickname = r.data.data.nickName
        settings.signature = r.data.data.signature
    })
}

onMounted(() => {
    loadSettings()
})
</script>

<style scoped lang="scss">
:deep(.el-message-box__container) {
    flex-direction: column;
    align-items: stretch;
}
</style>
