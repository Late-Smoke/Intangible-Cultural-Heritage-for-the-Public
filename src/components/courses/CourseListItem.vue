<template>
    <div class="course-list-item" @click="handleClick">
        <template v-if="action != 'add' && course">
            <div :class="['type', course.type]">
                {{ course.type }}
            </div>

            <div class="main">
                <div>{{ course.title }}</div>
                <div class="subtitle">{{ course.introduction || html2txt(course.classContent) }}</div>
            </div>

            <div v-if="action == 'progress'" class="progress">
                学习进度: <span>{{ course.process }}%</span>
            </div>

            <template v-if="action == 'unlock'">
                <span v-if="course.unLock" class="unlocked">已解锁</span>
                <mdiLockOutline v-else class="locked" />
            </template>

            <div v-if="action == 'edit'" class="btn-outline" @click.stop="router.push({ name: 'courseEdit', params: { userId: computedUserId, courseId: course.id } })">编辑</div>

            <mdiCheck v-if="course.selected" class="selected-icon" />
        </template>

        <div v-else-if="action == 'add'" class="add">
            <mdiPlus />
            <span>添加课程</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Courses from '@/axios/api/courses';
import * as User from '@/axios/api/user';
import router from '@/router';
import { html2txt } from '@/utils';
import { computed } from 'vue';

const { course, action, userId, selectable } = defineProps<{
    course?: Courses.Course
    action?: 'progress' | 'unlock' | 'edit' | 'add'
    userId?: string | number
    selectable?: boolean
}>()

const computedUserId = computed(() => userId || course.userId)
const isSelfViewing = computed(() => User.isSelf(computedUserId.value))

function handleClick() {
    if (action == 'add') {
        router.push({ name: 'courseAdd' })
        return
    }

    if (selectable) {
        if (!course.unLock) course.selected = !course.selected
        return
    }

    if (action == 'unlock' && !course.unLock) {
        course.selected = true
        router.push({ name: 'userCourses', params: { id: computedUserId.value }, query: { unlock: null } })
        return
    }

    gotoCourse()
}

function gotoCourse() {
    isSelfViewing.value
        ? router.push({ name: 'courseSelfView', params: { userId: computedUserId.value, courseId: course.id } })
        : router.push({ name: 'course', params: { id: course.id } })
}

</script>

<style scoped lang="scss">
.course-list-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-right: 8px;
    border: 1px solid #ddd;
    margin: 14px 20px;
    min-height: 68px;
    box-shadow: 0 1px 8px -3px #aaa;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    position: relative;

    .type {
        --spacing: 0.2em;

        writing-mode: vertical-lr;
        letter-spacing: var(--spacing);
        font-size: 0.9em;
        height: 50px;
        text-align: center;
        padding: var(--spacing) 4px 0 4px;
        font-weight: bold;

        &.图文 {
            background: linear-gradient(90deg, #FFC28A5C 50%, transparent 50%);
            color: #CD7B33;
        }

        &.视频 {
            background: linear-gradient(90deg, #5A76B552 50%, transparent 50%);
            color: #3361CD;
        }
    }

    .main {
        flex: 1;
        min-width: 0;

        .subtitle {
            color: #888;
            font-size: 0.9em;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }
    }

    .progress {
        color: #888;
        font-size: 0.9em;
        white-space: nowrap;
        align-self: flex-end;
        margin-bottom: 8px;

        span {
            color: #987B5B;
        }
    }

    .unlocked {
        color: #15863E;
        font-size: 0.9em;
    }

    .locked {
        color: rgb(177, 151, 128);
        font-size: 2.5em;
        padding: 6px;
    }

    .selected-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #CB7B7AE8;
        color: white;
        padding: 0.1em;
        font-size: 1.2em;
        border-radius: 0.4em 0 0 0;
    }

    .add {
        display: flex;
        align-items: center;
        margin-left: 12px;
        gap: 4px;

        >svg {
            font-size: 1.5em;
        }
    }
}
</style>
