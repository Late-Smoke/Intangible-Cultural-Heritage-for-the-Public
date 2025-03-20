<template>
    <el-container>
        <el-drawer v-model="menu" direction="ltr" size="75%" :show-close="false" class="menu">
            <div class="user">
                <el-avatar class="avatar" :size="60" :src="url" />
                <div class="name">管理员</div>
                <div class="uid">123456</div>
            </div>
            <div class="menu-list">
                <div class="item" @click="title = '申诉和反馈处理'; menu = false;"
                    :class="{ 'selected': title === '申诉和反馈处理' }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.60001 15.5996H6.00001C6.66275 15.5996 7.20001 16.1369 7.20001 16.7996V19.1996C7.20001 19.8624 6.66275 20.3996 6.00001 20.3996H3.60001V11.9996C3.60001 7.36042 7.36081 3.59961 12 3.59961C16.6392 3.59961 20.4 7.36042 20.4 11.9996V20.3996H18C17.3373 20.3996 16.8 19.8624 16.8 19.1996V16.7996C16.8 16.1369 17.3373 15.5996 18 15.5996H20.4"
                            stroke="black" stroke-width="2" stroke-linejoin="round" />
                    </svg>
                    <div>申诉和反馈处理</div>
                </div>
                <div class="item" @click="title = '活动管理'; menu = false;" :class="{ 'selected': title === '活动管理' }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_1780_3304)">
                            <path
                                d="M3.47867 3.73317L3.76728 3.62008L3.882 3.96809L4.60921 3.77751C6.08379 3.39107 7.59515 3.19743 9.11125 3.20042C10.5407 3.22953 11.9456 3.87107 13.4259 4.60993C13.5257 4.65974 13.6261 4.71007 13.7268 4.76062C14.3496 5.07297 14.9884 5.39339 15.6081 5.64636C16.3268 5.93974 17.0849 6.17103 17.8514 6.19499C18.7174 6.24058 19.5794 6.13166 20.4037 5.87746C20.216 6.42884 19.9549 7.06606 19.6013 7.6892C19.0626 8.63832 18.3393 9.50207 17.3861 10.0131C16.2027 10.6298 14.7944 10.7799 13.1782 10.9521C13.0228 10.9687 12.8655 10.9855 12.7063 11.0029C10.9665 11.193 9.02432 11.4632 7.39401 12.6407L6.88694 13.0069L3.47867 3.73317ZM9.58899 20.359L6.94286 13.159L7.12311 13.5949L9.87404 20.2473L9.58899 20.359ZM9.20856 20.5081C9.20876 20.508 9.20896 20.5079 9.20916 20.5078L9.20856 20.5081Z"
                                fill="white" stroke="black" stroke-width="1.6" />
                        </g>
                        <defs>
                            <clipPath id="clip0_1780_3304">
                                <rect width="19.2" height="20.8" fill="white" transform="translate(2.39999 2.40039)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div>活动管理</div>
                </div>
                <div class="item" @click="title = '运营管理'; menu = false;" :class="{ 'selected': title === '运营管理' }">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.6 21.6004H14.4M6 8.40039C6 5.08668 8.68629 2.40039 12 2.40039C15.3137 2.40039 18 5.08668 18 8.40039C18 10.8608 16.5191 12.8745 14.4 13.8004V17.4004C14.4 18.0631 13.8627 18.6004 13.2 18.6004H10.8C10.1373 18.6004 9.6 18.0631 9.6 17.4004V13.9011C7.48091 12.9753 6 10.8608 6 8.40039Z"
                            stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div>运营管理</div>
                </div>
            </div>
            <div class="logout">
                <el-button class="logout-btn" type="primary">
                    <span>退出登录</span>
                </el-button>
            </div>
        </el-drawer>
        <el-header>
            <svg @click="menu = true" width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M20 18H4M14.5 12H4M20 6H4" stroke="black" stroke-width="2" stroke-linecap="round" />
            </svg>
            <div class="title">{{ title }}</div>
        </el-header>
        <el-main>
            <div v-if="title === '申诉和反馈处理'">
                <div class="appeal-title">全部申诉和反馈</div>
                <div class="appeal-list">
                    <div class="appeal-item" v-for="(item, index) in appealData" :key="index">
                        <div class="appeal-left">
                            <el-avatar class="appeal-avatar" :size="40" :src="item.url" />
                        </div>
                        <div class="appeal-right">
                            <div class="appeal-top">
                                <div class="appeal-name">{{ item.name }}</div>
                                <div class="appeal-time">{{ item.time }}</div>
                            </div>
                            <div class="appeal-bottom">
                                <div class="appeal-content">
                                    {{ item.content }}
                                </div>
                                <div class="appeal-sort" :class="{ unAppeal: item.sort === '未处理' }">{{ item.sort }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else-if="title === '活动管理'">
                <div class="activity-title">全部活动</div>
                <div class="activity-top">
                    <el-dialog v-model="dialogAddActivity" fullscreen draggable custom-class="dialog-addGoods"
                        title="发布活动" :before-close="handleCloseAddActivity">
                        <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                            label-width="auto" class="goods-form">
                            <el-form-item label="" prop="img">
                                <ImageUpload v-model="fileList" />
                            </el-form-item>
                            <el-form-item class="small-form" label="" prop="name">
                                <el-input class="small-input" v-model="ruleForm.name" placeholder="此处填写活动名称 ( 必填 )"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item class="small-form" label="" prop="time">
                                <el-input class="small-input" v-model="ruleForm.time" placeholder="此处填写活动时间 ( 必填 )"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item class="small-form" label="">
                                <el-input class="small-input" v-model="ruleForm.money" placeholder="此处填写活动金额"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item class="small-form" label="">
                                <el-input-tag v-model="ruleForm.tag" placeholder="此处填写活动标签"
                                    aria-label="" />
                            </el-form-item>
                            <el-form-item class="small-form" label="" prop="address">
                                <el-input class="small-input" v-model="ruleForm.address" placeholder="在此输入活动地址 ( 必填 )"
                                    autocomplete="off" />
                            </el-form-item>
                            <el-form-item class="big-form" label="" prop="info">
                                <el-input class="big-input" v-model="ruleForm.info" type="textarea" :rows="7"
                                    placeholder="活动详情 ( 必填 )" autocomplete="off" />
                            </el-form-item>
                            <el-form-item class="submit-btn-box">
                                <el-button class="form-submit-btn" type="primary" @click="submitForm(ruleFormRef)">
                                    发布
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </el-dialog>
                    <div class="activity-add" @click="dialogAddActivity = true">
                        <el-icon color="rgba(177, 151, 128, 1)">
                            <Plus />
                        </el-icon>
                        发布活动
                    </div>
                    <div class="activity-search">
                        <el-input v-model="activitySearch" placeholder="在此搜索活动">
                            <template #suffix>
                                <el-icon class="suffix-icon" @click="searchActivity()">
                                    <Search />
                                </el-icon>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="activity-list">
                    <div class="activity-item" v-for="(item, index) in currentActivity" :key="index">
                        <div class="activity-left">
                            <el-image class="activity-img" :src="item.url" />
                        </div>
                        <div class="activity-right">
                            <div class="activity-name">{{ item.name }}</div>
                            <div class="activity-time">活动时间 : {{ item.time }}</div>
                            <div class="activity-tag">
                                <el-tag v-for="tag in item.tag">{{ tag }}</el-tag>
                            </div>
                            <div class="activity-bottom">
                                <div class="money">
                                    <span v-if="item.money">￥{{ item.money }}</span>
                                </div>
                                <div class="status" @click="cancelActivity(index)">取消活动</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>

            </div>
        </el-main>
    </el-container>

</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed, reactive } from 'vue';
import { ElMessageBox , ElMessage } from 'element-plus';
import ImageUpload from '@/components/slot/ImageUpload.vue';
import type { FormInstance, FormRules } from 'element-plus'

const title = ref('申诉和反馈处理');
const menu = ref(false);

const url = ref('');//测试

const appealData = [{
    url: '',
    name: '张三',
    time: '03-05',
    content: '我是一个测试的内容',
    sort: '未处理'
},
{
    url: '',
    name: '李四',
    time: '03-05',
    content: '我是一个测试的内容',
    sort: '已处理'
}]

const activityData = ref([
    {
        url: '',
        name: '活动01',
        time: '2024.08.06 - 08.08',
        tag: ['tag1', 'tag2', 'tag3'],
        money: '99'
    },
    {
        url: '',
        name: '活动02',
        time: '2024.08.06 - 08.08',
        tag: ['tag1', 'tag2', 'tag3'],
        money: '99'
    }
]);
const currentActivity = ref(activityData.value);
const activitySearch = ref('');
function cancelActivity(index) {
    ElMessageBox.confirm(
        '<span style="color: rgba(0, 0, 0); font-size: 28px">确认取消该商品？</span>',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            showClose: false,
            customClass: 'confirm-addGoods'
        }
    ).then(() => {
        activityData.value.splice(index, 1);
    }).catch(() => {
        return;
    })
}
function searchActivity() {
    if (activitySearch.value === '') {
        currentActivity.value = activityData.value;
        return;
    }
    currentActivity.value = activityData.value.filter((item) => {
        return item.name.includes(activitySearch.value);
    });
}
watch(activityData, () => {
    currentActivity.value = activityData.value;
});

const dialogAddActivity = ref(false);
const ruleFormRef = ref<FormInstance>();
const nameRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写活动名称'))
    } else callback();
}

const infoRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写活动详情'))
    } else callback();
}

const addressRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写活动地址'))
    } else callback();
}

const timeRule = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请填写活动时间'))
    } else callback();
}

const imgRule = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
        callback(new Error('请上传活动图片'))
    } else callback();
}

const ruleForm = reactive({
    img: [],
    name: '',
    info: '',
    address: '',
    time: '',
    money: '',
    tag: [],
})

const fileList = ref<string[]>([]);

watch(fileList, () => ruleForm.img = fileList.value)

const rules = reactive<FormRules<typeof ruleForm>>({
    name: [{ validator: nameRule, trigger: 'blur' }],
    info: [{ validator: infoRule, trigger: 'blur' }],
    address: [{ validator: addressRule, trigger: 'blur' }],
    img: [{ validator: imgRule, trigger: 'blur' }],
    time: [{ validator: timeRule, trigger: 'blur' }],
})

function handleCloseAddActivity() { // 关闭添加活动弹窗
    if (ruleForm.address === '' && ruleForm.info === '' && ruleForm.address === '' && ruleForm.name === '' && fileList.value.length === 0) {
        dialogAddActivity.value = false;
        return;
    }
    ElMessageBox.confirm(
        '<span style="color: rgba(0, 0, 0, 0.5); font-size: 18px">退出后已填写信息不会保留</span>',
        '已填写部分信息，确认要退出吗？',
        {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            center: true,
            showClose: false,
            customClass: 'confirm-cancel-addGoods'
        }
    ).then(() => {
        dialogAddActivity.value = false;
        ruleFormRef?.value.resetFields();
        fileList.value = [];
    }).catch(() => {
        return;
    })

}

const submitForm = (formEl: FormInstance | undefined) => { // 发布活动
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            ElMessageBox.confirm(
                '<span style="color: rgba(0, 0, 0, 0.5); font-size: 20px">发布活动后不可修改</span>',
                '确认发布活动？',
                {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    center: true,
                    showClose: false,
                    customClass: 'confirm-addGoods'
                }
            ).then(() => {
                activityData.value.push({
                    url: fileList.value[0],
                    name: ruleForm.name,
                    time: ruleForm.time,
                    tag: ruleForm.tag,
                    money: ruleForm.money
                });
                dialogAddActivity.value = false;
                ruleFormRef?.value.resetFields();
                fileList.value = [];
                ElMessage({
                    message: '发布成功',
                    type: 'success',
                    showClose: true,
                })
            }).catch(() => {
                return;
            })

        }
    })
}
</script>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px rgba(228, 228, 228, 1);
}

.title {
    flex: 1;
    font-size: 20px;
    text-align: center;
}

:deep(.menu) {
    max-width: 300px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
}

.user {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    .avatar {
        margin-bottom: 10px;
        box-shadow: 2px 2px 25px 13px rgba(194, 128, 63, 0.25);
    }

    .name {
        font-size: 24px;
    }

    .uid {
        color: darkgray;
    }

}

.menu-list {
    margin-top: 20px;

    .item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 20px;
        cursor: pointer;
    }

    .selected {
        transition: smooth;
        border-radius: 5px;
        background-color: rgba(255, 222, 174, 0.32);
    }
}

.logout {
    text-align: center;

    .logout-btn {
        margin-top: 20px;
        width: 155px;
        height: 35px;
        padding: 5px 10px;
        color: rgba(152, 123, 91, 1);
        background-color: #fff;
        border: solid 1px rgba(141, 82, 37, 1);
    }
}

/*appeal*/
.appeal-title {
    color: rgba(178, 178, 178, 1);
}

.appeal-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .appeal-item {
        display: flex;
        width: 100%;
        gap: 10px;
        font-size: 15px;
        padding: 10px 0;

        .appeal-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            flex: 1;

            .appeal-top {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 5px;
                color: rgba(178, 178, 178, 1);

                .appeal-name {
                    font-size: 18px;
                    color: #000;
                }
            }

            .appeal-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-bottom: 20px;
                border-bottom: solid 1px rgba(228, 228, 228, 1);

                .appeal-content {
                    color: rgba(178, 178, 178, 1);
                }

                .appeal-sort {
                    margin-top: 10px;
                    font-size: 18px;
                    color: rgba(76, 149, 43, 1);
                }

                .unAppeal {
                    margin-top: 10px;
                    font-size: 18px;
                    color: rgba(255, 0, 0, 1);
                }
            }
        }
    }
}

/*activity*/
.activity-title {
    color: rgba(178, 178, 178, 1);
}

.activity-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;

    .activity-add {
        display: flex;
        align-items: center;
        font-size: 20px;
        gap: 5px;
        color: rgba(177, 151, 128, 1);
    }

    .activity-search {
        width: 125px;

        :deep(.el-input__wrapper) {
            height: 25px;
            padding: 0;
            padding-left: 7px;
            border-radius: 10px;
            border: solid 1px rgba(177, 151, 128, 1);
        }

        :deep(.el-input__suffix) {
            padding-right: 10px;
        }
    }
}

.activity-list {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .activity-item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 10px;
        padding: 10px;
        border: solid 1px rgba(201, 201, 201, 1);
        border-radius: 4px;

        .activity-left {
            width: 120px;
            height: 75px;
            border-radius: 5px;
            overflow: hidden;

            .activity-img {
                width: 100%;
                height: 100%;
            }
        }

        .activity-right {
            display: flex;
            flex-direction: column;
            flex: 1;
            gap: 5px;

            .activity-name {
                font-size: 20px;
            }

            .activity-time {
                font-size: 13px;
                color: rgba(178, 178, 178, 1);
            }


            .activity-tag {
                display: flex;
                align-items: center;
                gap: 5px;

                .el-tag {
                    width: fit-content;
                    font-size: 12px;
                    height: 17px;
                    color: rgba(164, 164, 164, 1);
                    background-color: transparent;
                    border: solid 0.5px rgba(172, 172, 172, 1);
                }
            }

            .activity-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .money {
                    font-size: 18px;
                    color: rgba(177, 151, 128, 1);
                }

                .status {
                    font-size: 15px;
                    color: rgba(227, 32, 32, 1);
                }
            }
        }
    }
}

/*uploader*/
.upload {
    margin-top: 1vh;
}

:deep(.el-upload--picture-card),
:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 120px;
    height: 120px;
    border: solid 1px rgba(177, 151, 128, 1);
    background-color: rgb(255, 255, 255);
}

.upload-img .el-upload-list__item-thumbnail {
    object-fit: cover;
}

.el-icon.uploader-icon {
    font-size: 28px;
    color: rgba(177, 151, 128, 1);
    text-align: center;
}

.upload .el-icon svg {
    color: rgba(177, 151, 128, 1);
}

/*form*/
.goods-form {
    margin-top: 20px;
}

:deep(.small-input .el-input__wrapper) {
    box-shadow: none;
    border-bottom: solid 1px rgba(177, 151, 128, 0.5);
    border-radius: 0;
}

:deep(.el-input-tag) {
    box-shadow: none;
    border-bottom: solid 1px rgba(177, 151, 128, 0.5);
    border-radius: 0;
}

.small-form {
    margin-bottom: 15px;
}

.big-form {
    margin-top: 30px;
    position: relative;
}

:deep(.big-input .el-textarea__inner) {
    background-color: rgba(230, 230, 230, 0.61);
    z-index: 2;
}

.dialog-showGoods {
    position: relative;
}

.my-header-big {
    position: relative;
    height: 55px;
}

.big-svg {
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}

.el-icon--right {
    position: absolute;
    right: 0;
    z-index: 2;
    margin: 10px 10px 0 0;
}

.submit-btn-box {
    margin: 0;
}

:deep(.submit-btn-box .el-form-item__content) {
    justify-content: flex-end;
}

.form-submit-btn {
    width: 103px;
    height: 45px;
    font-size: 24px;
}
</style>