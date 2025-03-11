<template>
    <SvgBackgroundDragon />
    <page-header-sticky-with-back title="账号与安全" />

    <SettingItem name="昵称" type="input" :value="settings.nickname" :input-action="() => changeNickname(settings.nickname, loadSettings)" />
    <SettingItem name="个性签名" type="input" :value="settings.signature" :action="updateSignature" input-tips="修改个性签名" />
    <SettingItem name="手机号码" type="input" :value="settings.phone" input-tips="修改手机号码" />
    <SettingItem name="修改密码" type="input" :input-action="updatePassword" />

    <div ref="overlay"></div>
</template>

<script setup lang="tsx">
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';
import SettingItem from '@/components/settings/SettingItem.vue';
import { reactive } from 'vue';
import { changeNickname } from '@/settings';
import { ElMessage, ElMessageBox } from 'element-plus';
import { h } from 'vue';
import { ref } from 'vue';
import PasswordUpdate from '@/components/settings/PasswordUpdate.vue';
import { AxiosResponse } from 'axios';
import { Response } from '@/axios/api/common';

const overlay = ref<HTMLDivElement>()

const settings = reactive({
    avatar: undefined as File,
    nickname: '',
    signature: '',
    phone: '暂不支持修改',
})

function updateSignature(value: string) {
    return Self.updateProfile({ signature: value }).then(loadSettings)
}

function updatePassword() {
    let submitAction: () => Promise<AxiosResponse<Response<any>, any>>

    ElMessageBox({
        title: '修改密码',
        message: h(PasswordUpdate, {
            onVnodeMounted: ({ el, component }) => {
                submitAction = component.exposed.submit
            }
        }),
        showCancelButton: true,
        appendTo: overlay.value,

        beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
                instance.confirmButtonLoading = true
                submitAction().then(() => {
                    done()
                    ElMessage.success('修改成功')
                }).finally(() => instance.confirmButtonLoading = false)
            } else done()
        },
    })
}


function loadSettings() {
    Self.getSelf().then(r => {
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
