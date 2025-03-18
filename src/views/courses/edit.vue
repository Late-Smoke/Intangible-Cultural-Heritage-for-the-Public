<template>
    <PageHeader :back="false">
        <mdiClose @click="router.back()" />
        <div style="flex: 1;"></div>
        <ElButton type="primary" @click="submit()">{{ courseId ? '保存课程' : '发布课程' }}</ElButton>
    </PageHeader>

    <div class="video-input" v-show="course.type == '视频'">
        <div class="video">
            <video v-if="course.videoUrl" :src="course.videoUrl" controls></video>
            <div v-else class="add" @click="uploadVideo">+ 上传视频</div>
        </div>

        <div class="action" v-if="course.videoUrl">
            <ElButton type="primary" plain round @click="uploadVideo">修改视频</ElButton>
            <ElButton type="danger" plain round @click="deleteVideo">删除视频</ElButton>
        </div>
    </div>

    <div class="title-input">
        <input placeholder="输入标题" v-model="course.title" />
    </div>

    <div class="class-content">
        <RichEditor v-show="course.type == '图文'" v-model:html="course.classContent" placeholder="在此处填写课程内容" />
        <RichEditor v-show="course.type == '视频'" v-model:text="course.introduction" placeholder="请输入课程简介" :toolbar="false" />
        <!-- <el-input v-if="course.type == '视频'" v-model="course.introduction" :autosize="{ minRows: 3, maxRows: 12 }" type="textarea" placeholder="请输入课程简介" /> -->
    </div>

    <div class="price">
        <div class="label">价格</div>
        <div class="input">
            <span class="rmb">￥</span>
            <PriceInput v-model="course.price" />
        </div>
    </div>

    <div style="height: 80px;"></div>

    <ElTabs class="tabs outline center" v-model="course.type">
        <ElTabPane label="图文" name="图文"></ElTabPane>
        <ElTabPane label="视频" name="视频"></ElTabPane>
    </ElTabs>
</template>

<script setup lang="ts">
import router from '@/router';
import { selectAndUploadFile } from '@/axios/api/upload';
import { onMounted } from 'vue';
import * as Courses from '@/axios/api/courses';
import { ref } from 'vue';
import RichEditor from '@/components/slot/RichEditor.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import PriceInput from '@/components/slot/PriceInput.vue';
import PageHeader from '@/components/slot/PageHeader.vue';

const { userId, courseId } = defineProps<{
    userId?: string
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

function uploadVideo() {
    selectAndUploadFile('video/*').then(url => course.value.videoUrl = url)
}

function deleteVideo() {
    ElMessageBox.confirm('确定要删除视频吗?', '删除视频').then(() => {
        course.value.videoUrl = undefined
    }).catch(() => { })
}

function submit() {
    if (courseId) {
        Courses.updateCourse({
            ...course.value,
            id: parseInt(courseId)
        }).then(r => {
            if (r.data.success) {
                ElMessage.success('修改成功')
                router.back()
            } else ElMessage.error(r.data.errorMsg)
        })
    } else {
        Courses.publishCourse(course.value).then(r => {
            if (r.data.success) {
                ElMessage.success('发布成功')
                router.back()
            } else ElMessage.error(r.data.errorMsg)
        })
    }
}

onMounted(() => {
    if (courseId) {
        Courses.getUserCourse(userId, courseId).then(c => {
            for (const key in course.value) {
                course.value[key] = c[key]
            }
        })
    }
})
</script>

<style scoped lang="scss">
.video-input {
    .video {
        width: 100%;
        aspect-ratio: 16 / 9;
        margin-bottom: 4px;

        video {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: black;
            display: block;
        }

        .add {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            background-color: #eee;
            color: #666;
            font-size: 1.4em;
        }
    }

    .action {
        text-align: center;
        margin: 8px 0 4px;
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
    background: radial-gradient(circle at calc(50% + 64px), #DCA16A 68px, white 0);

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
        background: linear-gradient(to right, transparent 8px, #DCA16A 8px);

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
    padding-bottom: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
}
</style>
