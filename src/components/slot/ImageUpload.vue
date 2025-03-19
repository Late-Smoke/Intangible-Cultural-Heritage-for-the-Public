<template>
    <div class="image-upload">
        <div class="image" v-for="image, index in uploadController.files">
            <img :src="image.url || image.dataUrl">

            <div class="status" v-if="image.status != 'success'">{{ statusText[image.status] }}</div>

            <mdiClose class="btn-delete" @click="uploadController.removeFile(index)" />
        </div>

        <div class="btn-upload" @click="uploadController.addFile('image/*')">
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 9L22.5 36M36 22.5L9 22.5" stroke="#B19780" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createUploadController } from '@/axios/api/upload';
import { arraySame } from '@/utils';
import { computed, watch } from 'vue';

const model = defineModel<string[]>()

const uploadController = createUploadController()

function needUpdate() {
    return !arraySame(uploadController.fileUrls, model.value)
}

watch(() => uploadController.fileUrls, () => {
    if (needUpdate()) model.value = uploadController.fileUrls
})

watch(model, () => {
    if (needUpdate()) uploadController.fileUrls = model.value
})

const statusText = {
    uploading: '上传中',
    success: '上传成功',
    failed: '上传失败',
}
</script>

<style scoped lang="scss">
.image-upload {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    >div {
        width: 96px;
        height: 96px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    .image {
        position: relative;

        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .status {
            position: absolute;
            inset: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.9em;
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
        }

        .btn-delete {
            position: absolute;
            top: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.5);
            font-size: 1.5em;
            padding: 0.1em;
            color: white;
            border-radius: 0 0 0 0.4em;
        }
    }

    .btn-upload {
        border: 1px solid #B19780;
    }
}
</style>
