<template>
    <PageHeader :back="false" title="编辑帖子">
        <mdiClose @click="router.back()" />
        <div style="flex: 1;"></div>
        <ElButton type="primary" @click="submit()">{{ postId ? '保存' : '发布' }}</ElButton>
    </PageHeader>

    <div class="title-input">
        <input placeholder="输入标题" v-model="post.title" />
    </div>

    <div class="content">
        <RichEditor v-model:html="post.content" placeholder="在此输入帖子内容" />
    </div>

    <ImageUpload v-model="imageList" class="uploader" />

    <div style="height: 80px;"></div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';
import RichEditor from '@/components/slot/RichEditor.vue';
import { ElMessage } from 'element-plus';
import PageHeader from '@/components/slot/PageHeader.vue';
import * as Posts from '@/axios/api/posts'
import { importProps } from '@/utils';
import ImageUpload from '@/components/slot/ImageUpload.vue';

const { postId } = defineProps<{
    postId?: string
}>()

const post = ref<Posts.BasePost>({
    category: '帖子',
    title: '',
    content: '',
    tag: null,
    get urls() {
        return imageList.value?.map(url => ({ type: 0, url } as Posts.Url)) || null
    },
    set urls(value) {
        imageList.value = value?.map(url => url.url)
    },
})

const imageList = ref<string[]>()

function submit() {
    if (postId) {
        Posts.updatePost({
            ...post.value,
            id: parseInt(postId)
        }).then(r => {
            if (r.data.success) {
                ElMessage.success('修改成功')
                router.back()
            } else ElMessage.error(r.data.errorMsg)
        })
    } else {
        Posts.postPost(post.value).then(r => {
            if (r.data.success) {
                ElMessage.success('发布成功')
                router.back()
            } else ElMessage.error(r.data.errorMsg)
        })
    }
}

onMounted(() => {
    if (postId) {
        Posts.getPostById(postId).then(x => importProps(post.value, x.data.data))
    }
})
</script>

<style scoped lang="scss">
.title-input {
    margin: 0 16px 12px;

    input {
        display: block;
        border: none;
        font-size: 1.15em;
        width: 100%;
        padding: 12px 0;
        border-bottom: 1px solid #aaa;
        outline: none;
    }
}

.content {
    margin: 12px 16px;
    outline: none;
}

.uploader {
    margin: 16px;
}
</style>
