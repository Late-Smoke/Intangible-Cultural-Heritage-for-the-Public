<template>
    <SvgBackgroundFan />
    <PageHeader title="非遗课程">
        <div style="flex: 1;"></div>

        <div v-if="isSelf && !editing" @click="editing = true">管理课程</div>
        <div v-if="isSelf && editing" @click="editing = false">退出管理</div>
    </PageHeader>

    <template v-if="user">
        <div class="user">
            <img :src="user.avatarUrl" @click="gotoUser(userId)">
            <div @click="gotoUser(userId)">{{ user.nickName }}</div>
        </div>

        <template v-if="hasCourses || editing">
            <div class="head-img" v-if="user.topImageUrl || editing">
                <template v-if="user.topImageUrl">
                    <img :src="user.topImageUrl">
                    <div v-if="editing" class="edit">
                        <ElButton type="primary" plain round size="large" @click="uploadTopImage">修改头图</ElButton>
                        <ElButton type="danger" plain round size="large" @click="removeTopImage">删除头图</ElButton>
                    </div>
                </template>
                <div v-else class="add" @click="uploadTopImage">+ 添加头图</div>
            </div>

            <div :class="{ 'title': true, 'no-title': !user.name }">
                {{ user.name || '该课程暂无标题' }}
                <ElIcon v-if="editing" @click="changeTitle">
                    <EditPen />
                </ElIcon>
            </div>

            <ElTabs class="tabs outline">
                <ElTabPane label="目录">
                    <CourseListItem v-if="editing" action="add" />
                    <CourseListItem v-for="course in user.courses" :course="course" :action="isSelf ? (editing ? 'edit' : undefined) : 'unlock'" :user-id="userId" />
                </ElTabPane>

                <ElTabPane label="详情">
                    <div ref="divDescription" :class="{ 'description': true, 'empty': !user.description }">
                        <div class="btn-edit" v-if="editing">
                            <span class="btn-outline" @click="changeDescription">编辑</span>
                        </div>
                        {{ user.description || '该课程暂无描述' }}
                    </div>
                </ElTabPane>
            </ElTabs>
        </template>

        <div v-else class="no-courses">该用户暂无课程</div>
    </template>

    <ElButton v-if="!isSelf && hasCourses" size="large" type="primary" class="btn-unlock" @click="router.push({ name: 'userCourses', params: { id: userId }, query: { unlock: null } })">解锁课程</ElButton>

    <OverlayCard v-if="unlock !== undefined && user" class="unlock-overlay" :close-action="() => router.back()">
        <div class="overlay-header">
            选择课程
            <svg width="80" height="55" viewBox="0 0 80 55" fill="none" xmlns="http://www.w3.org/2000/svg" class="btn-close" @click="router.back()">
                <path d="M80 55V0H36L0 55H80Z" fill="#D3A579" />
                <path d="M60 19L42 37M60 37L42 19" stroke="white" stroke-width="2" stroke-linecap="round" />
            </svg>
        </div>

        <div class="info">
            <img :src="user.topImageUrl">

            <div class="main">
                <div class="name">{{ user.name }}</div>
                <div style="flex: 1;"></div>
                <div class="price">
                    <span class="rmb">￥</span>{{ selectedPriceSum }}
                </div>
            </div>
        </div>

        <CourseListItem v-for="course in user.courses.filter(x => !x.unLock)" :course="course" action="unlock" selectable />

        <div style="height: 80px;"></div>
        <ElButton v-if="!isSelf" size="large" type="primary" class="btn-unlock" @click="">确认支付</ElButton>
    </OverlayCard>
</template>

<script setup lang="ts">
import PageHeader from '@/components/slot/PageHeader.vue';
import SvgBackgroundFan from '@/components/slot/SvgBackgroundFan.vue';
import * as Courses from '@/axios/api/courses';
import { ref } from 'vue';
import CourseListItem from '@/components/courses/CourseListItem.vue';
import * as User from '@/axios/api/user'
import { computed } from 'vue';
import OverlayCard from '@/components/slot/OverlayCard.vue';
import router from '@/router';
import { watch } from 'vue';
import { gotoUser } from '@/utils';
import { onActivated } from 'vue';
import { selectAndUploadFile } from '@/axios/api/upload';
import { ElMessage, ElMessageBox } from 'element-plus';


const { userId, unlock } = defineProps<{
    userId?: string
    unlock?: boolean
}>()

const user = ref<Courses.CourseUser>()

const isSelf = computed(() => User.isSelf(userId))
const editing = ref(false)
const hasCourses = computed(() => Array.isArray(user.value?.courses) && user.value?.courses.length)

watch(() => unlock, () => {
    if (unlock === undefined) {
        user.value?.courses.forEach(c => c.selected = false)
    }
})
const selectedPriceSum = computed(() => user.value?.courses.filter(c => c.selected).reduce((sum, c) => sum + c.price * 100, 0) / 100)

const divDescription = ref<HTMLDivElement>()

function uploadTopImage() {
    selectAndUploadFile('image/*').then(topImageUrl => {
        Courses.updateUser({ topImageUrl }).then(r => {
            r.data.success ? ElMessage.success(r.data.data) : ElMessage.error(r.data.errorMsg)
            loadUser()
        })
    })
}

function removeTopImage() {
    ElMessageBox.confirm('确定要删除头图吗？', '删除头图', { type: 'warning', }).then(() => {
        Courses.updateUser({ topImageUrl: '' }).then(r => {
            r.data.success ? ElMessage.success(r.data.data) : ElMessage.error(r.data.errorMsg)
            loadUser()
        })
    }).catch(() => { })
}

function changeTitle() {
    ElMessageBox.prompt('请输入课程标题', '修改标题', { inputValue: user.value?.name }).then(({ value }) => {
        Courses.updateUser({ name: value }).then(r => {
            r.data.success ? ElMessage.success(r.data.data) : ElMessage.error(r.data.errorMsg)
            loadUser()
        })
    }).catch(() => { })
}

function changeDescription() {
    ElMessageBox.prompt('请输入课程简介', '修改简介', {
        inputValue: user.value?.description,
        inputType: 'textarea',
        appendTo: divDescription.value,
        customClass: 'description-edit',
        closeOnClickModal: false,
    }).then(({ value }) => {
        Courses.updateUser({ description: value }).then(r => {
            r.data.success ? ElMessage.success(r.data.data) : ElMessage.error(r.data.errorMsg)
            loadUser()
        })
    }).catch(() => { })
}

function loadUser() {
    Courses.getUser(userId).then(r => user.value = r.data.data)
}

onActivated(() => {
    loadUser()
    if (!history.state.forward) {
        editing.value = false
    }
})

</script>

<style scoped lang="scss">
.user {
    display: flex;
    align-items: center;
    margin: 12px 16px;
    gap: 8px;

    >img {
        width: 40px;
        height: 40px;
        border-radius: 100%;
        object-fit: cover;
    }
}

.head-img {
    width: 100%;
    height: 30vh;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    >img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .add {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #666;
        font-size: 1.4em;
    }

    .edit {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 24px;
        background-color: rgba(0, 0, 0, 0.25);

        >button {
            margin: 0;
        }
    }
}

.title {
    margin: 12px 20px;
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 4px;

    &.no-title {
        font-weight: normal;
        color: #666;
    }

    .el-icon {
        font-size: 1.1em;
    }
}

.tabs {
    border: 2px solid #BEA882;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    padding-bottom: 80px;
    min-height: 40vh;

    .description {
        margin: 4px 20px;
        position: relative;

        &.empty {
            color: #666;
        }

        .btn-edit {
            text-align: right;
            margin-bottom: 4px;
        }

        :deep(.description-edit textarea) {
            height: 40vh;
        }
    }
}

.no-courses {
    text-align: center;
    margin: 32px 0;
    color: #888;
}

.btn-unlock {
    position: fixed;
    bottom: 16px;
    left: 50%;
    width: 70%;
    transform: translateX(-50%);
    font-size: 1em;
}

.unlock-overlay {
    .overlay-header {
        text-align: center;
        line-height: 3em;
        position: relative;
        font-size: 1.1em;

        .btn-close {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
        }
    }

    .info {
        display: flex;
        gap: 8px;
        margin: 14px;

        >img {
            width: 160px;
            height: 120px;
            max-width: 36vw;
            max-height: 27vw;
            object-fit: cover;
        }

        .main {
            flex: 1;
            display: flex;
            flex-direction: column;

            .price {
                color: #B19780;
                font-size: 1.3em;

                .rmb {
                    font-size: 1.3em;
                }
            }
        }
    }
}
</style>
