<template>
    <SvgBackgroundDragon />
    <page-header-sticky-with-back title="隐私设置" />

    <SettingItem name="公开评论" type="switch" :value="settings.commentSetting" :action="createToggleAction(Self.PrivacySettings.toggleComment, 'commentSetting')" />
    <SettingItem name="公开参与的活动" type="switch" :value="settings.activitySetting" :action="createToggleAction(Self.PrivacySettings.toggleActivities, 'activitySetting')" />
    <SettingItem name="公开关注列表" type="switch" :value="settings.followSetting" :action="createToggleAction(Self.PrivacySettings.toggleFollowing, 'followSetting')" />
    <SettingItem name="公开收藏夹" type="switch" :value="settings.favoriteSetting" :action="createToggleAction(Self.PrivacySettings.toggleFavorites, 'favoriteSetting')" />
</template>

<script setup lang="ts">
import PageHeaderStickyWithBack from '@/components/slot/PageHeaderStickyWithBack.vue';
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
import SvgBackgroundDragon from '@/components/slot/SvgBackgroundDragon.vue';
import SettingItem from '@/components/settings/SettingItem.vue';
import { ref } from 'vue';
import { promiseSuccess } from '@/utils';
import { AxiosResponse } from 'axios';
import { Response } from '@/axios/api/common';

const settings = ref<Self.IPrivacySettings>({})

function createToggleAction(action: () => Promise<AxiosResponse<Response<any>, any>>, toggleValue: keyof Self.IPrivacySettings) {
    return () => new Promise<void>((resolve, reject) => {
        promiseSuccess(action()).then(() => {
            settings.value[toggleValue] = !settings.value[toggleValue]
            resolve()
        }).catch(reject)
    })
}

onMounted(() => {
    Self.PrivacySettings.get().then(r => settings.value = r.data.data)
})
</script>

<style scoped lang="scss"></style>
