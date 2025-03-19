<template>
    <template v-if="course">
        <PageHeader :title="course?.title" />

        <video class="video" ref="videoEl" v-if="course.type == '视频'" :src="course.videoUrl" controls></video>

        <div class="title-container">
            <div class="title">{{ course.title }}</div>
            <div class="progress" v-if="!isSelfViewing">学习进度: {{ course.process }}%</div>
        </div>

        <div class="description" v-if="course.type == '视频'">{{ course.introduction }}</div>

        <div class="content rich-text-content" v-if="course.type == '图文'" v-html="course.classContent"></div>

        <div class="bottom">- 已经到底啦 -</div>
    </template>

    <ErrorPage v-else-if="error" :message="error" />
</template>

<script setup lang="ts">
import PageHeader from '@/components/slot/PageHeader.vue';
import * as Courses from '@/axios/api/courses';
import { ref } from 'vue';
import { onMounted } from 'vue';
import { onUnmounted } from 'vue';
import { computed } from 'vue';
import ErrorPage from '../error/ErrorPage.vue';
import { promiseSuccess } from '@/utils';

const { userId, courseId } = defineProps<{
    userId: number,
    courseId: number,
}>()

const isSelfViewing = computed(() => Boolean(userId))

const course = ref<Courses.Course>()
const error = ref<string>()

const videoEl = ref<HTMLVideoElement>()
const progressController = {
    videoElement: undefined as HTMLVideoElement,
    progressUpdateInterval: undefined as number,
    active: false,
    getVideoProgress() {
        if (this.videoElement?.duration) {
            return this.videoElement.currentTime / this.videoElement.duration * 100
        }
        return 0
    },
    updateProgress() {
        const progress = this.getVideoProgress()
        if (progress) {
            if (progress > parseFloat(course.value.process)) {
            }
        }
    },
    init() {
        this.progressUpdateInterval = setInterval(() => {
            this.updateProgress()
        }, 5000)
        this.active = true
    },
    dispose() {
        clearInterval(this.progressUpdateInterval)
    },
}

function updateProgress(progress: number | string) {
    if (typeof progress == 'number') progress = progress.toFixed(0)
    promiseSuccess(Courses.updateCourseProgress(courseId, progress)).then(() => course.value.process = progress)
}

onMounted(() => {
    if (!isSelfViewing.value) {
        Courses.getSelfCourse(courseId).then(c => {
            if (c) {
                course.value = c
                progressController.videoElement = videoEl.value
                progressController.init()
            } else error.value = '课程未解锁或课程不存在'
        })
    } else {
        Courses.getUserCourse(userId, courseId).then(c => {
            if (c) course.value = c
            else error.value = '课程不存在'
        })
    }
})

onUnmounted(() => {
    if (progressController.active) progressController.dispose()
})
</script>

<style scoped lang="scss">
.video {
    width: 100%;
    max-height: 75vh;
    object-fit: contain;
    display: block;
}

.title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 12px;

    .title {
        font-size: 1.15em;
        font-weight: bold;
        word-break: break-word;
    }

    .progress {
        font-size: 0.9em;
        color: #666;
        white-space: nowrap;
    }
}

.description {
    margin: 8px 12px;
}

.content {
    margin: 8px 12px;
}

.bottom {
    padding: 30px 0 50px;
    text-align: center;
    color: #888;
}
</style>
