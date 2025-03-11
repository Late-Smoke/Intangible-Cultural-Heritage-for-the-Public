<template>
    <ElForm label-width="auto">
        <ElFormItem label="短信验证码">
            <ElInput v-model="code" style="flex: 1; margin-right: 8px;" />
            <ElButton>获取</ElButton>
        </ElFormItem>

        <ElFormItem label="新密码">
            <ElInput v-model="password" type="password" />
        </ElFormItem>

        <ElFormItem label="确认密码">
            <ElInput v-model="passwordConfirm" type="password" />
        </ElFormItem>
    </ElForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import * as Self from '@/axios/api/self'

const code = ref('')
const password = ref('')
const passwordConfirm = ref('')

function submit() {
    return Self.updatePassword(null, code.value, passwordConfirm.value)
}

defineExpose({ submit })
</script>

<style scoped lang="scss"></style>
