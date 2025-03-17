<template>
    <div class="root el-dialog-center">
        <el-dialog v-model="show" @close="close" title="修改头像">
            <div class="avatar-container">
                <img class="avatar" :src="payload.avatarUrl || oldAvatar">

                <ElButton class="btn-choose" type="primary" @click="selectAvatar">选择图片</ElButton>
            </div>

            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="submit">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElDialog, ElMessage, ElButton } from 'element-plus';
import * as Self from '@/axios/api/self'
import { selectAndUploadFile } from '@/axios/api/upload';

const show = true

const { oldAvatar } = defineProps<{
    oldAvatar?: string
}>()
const emit = defineEmits(['close'])

const payload = ref<Self.ProfileUpdateDTO>({})

function selectAvatar() {
    selectAndUploadFile('image/*').then(url => {
        payload.value.avatarUrl = url
    })
}

function submit() {
    if (!payload.value.avatarUrl) {
        close()
        return
    }

    Self.updateProfile(payload.value).then(r => {
        if (r.data.success) {
            ElMessage.success('修改成功')
            close()
        } else ElMessage.error(r.data.errorMsg)
    })
}

function close() {
    emit('close')
}
</script>

<style scoped lang="scss">
.root {
    .avatar-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        .avatar {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 100%;
            margin: 16px 0 8px;
        }

        .btn-choose {
            width: 240px;
            max-width: 90vw;
        }
    }
}
</style>
