<template>
    <div class="header">
        <mdiClose @click="router.back()" />
        <ElButton type="primary">发布课程</ElButton>
    </div>

    <div class="title-input">
        <input placeholder="输入标题" v-model="course.title" />
    </div>

    <div class="class-content">
        <RichEditor v-show="course.type == '图文'" v-model:html="course.classContent" placeholder="在此处填写课程内容" />
        <RichEditor v-show="course.type == '视频'" v-model:html="course.introduction" placeholder="请输入课程简介" :toolbar="false" />
        <!-- <el-input v-if="course.type == '视频'" v-model="course.introduction" :autosize="{ minRows: 3, maxRows: 12 }" type="textarea" placeholder="请输入课程简介" /> -->
    </div>

    <!-- <div class="image-list" v-if="course.type == '图文'">
        <div v-for="file in imageUploadController.files">
            <img :src="file.url">
        </div>

        <div class="image-add" @click="imageUploadController.addFile()">
            <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.5 9L22.5 36M36 22.5L9 22.5" stroke="#B19780" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>
    </div> -->

    <div class="price">
        <div class="label">价格</div>
        <div class="input">
            <span class="rmb">￥</span>
            <input v-model="price" type="number" step="0.01" />
        </div>
    </div>

    <ElTabs class="tabs outline center" v-model="course.type">
        <ElTabPane label="图文" name="图文"></ElTabPane>
        <ElTabPane label="视频" name="视频"></ElTabPane>
    </ElTabs>
</template>

<script setup lang="ts">
import router from '@/router';
import { createUploadController } from '@/axios/api/upload';
import { onMounted } from 'vue';
import * as Courses from '@/axios/api/courses';
import { ref } from 'vue';
import RichEditor from '@/components/slot/RichEditor.vue';
import { computed } from 'vue';

const { courseId } = defineProps<{
    courseId?: string
}>()

const course = ref<Courses.BaseCourse>({
    title: '',
    type: '图文',
    videoUrl: undefined,
    introduction: undefined,
    classContent: undefined,
    price: 0,
})

const price = ref(0)
// const price = computed({
//     get: () => course.value.price.toString(),
//     set(value: string) {
//         const num = parseFloat(value)
//         if (!Number.isNaN(num)) course.value.price = parseFloat(num.toFixed(2))
//     }
// })

const imageUploadController = createUploadController()

onMounted(() => {
    if (courseId) {

    }
})
</script>

<style scoped lang="scss">
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;

    >svg {
        padding: 4px;
        font-size: 2em;
    }
}

.title-input {
    margin: 0 20px 12px;

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

.class-content {
    margin: 12px 20px;
    outline: none;

    .el-textarea {
        font-size: 1em;

        :deep(textarea) {
            box-shadow: none;
            padding: 0;
            color: black;
        }
    }
}

.image-list {
    margin: 16px 20px;
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    >div {
        width: 96px;
        height: 96px;

        >img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .image-add {
        border: 1px solid #B19780;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.price {
    display: flex;
    align-items: center;
    margin: 24px;
    border: 1px solid #ddd;
    box-shadow: 0 1px 8px -4px #ccc;
    background: radial-gradient(circle at 70%, #DCA16A 30%, white 0%);

    .label {
        width: 50%;
        padding: 0 24px;
    }

    .input {
        width: 50%;
        padding: 10px 16px;
        display: flex;
        align-items: baseline;
        font-size: 1.5em;
        color: white;
        background: linear-gradient(to right, transparent 30%, #DCA16A 30%);

        .rmb {
            font-size: 1.2em;
            margin-right: 0.1em;
        }

        input {
            flex: 1;
            min-width: 0;
            border: none;
            font-size: 1em;
            padding: 0;
            outline: none;
            background: none;
            color: white;
        }
    }
}

.tabs {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    margin-bottom: 12px;
}
</style>
