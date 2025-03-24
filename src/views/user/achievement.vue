<template>
    <el-container>
        <el-header>
            <el-icon :size="24" @click="router.back()">
                <ArrowLeft />
            </el-icon>
            <div class="title">成就称号</div>
        </el-header>
        <el-main>
            <el-radio-group v-model="tag" size="large">
                <el-radio-button v-for="(item, index) in tagData" :label="item.label" :value="item.value"
                    @click="currentResource = item.resource" />
            </el-radio-group>
        </el-main>
        <el-footer>
            <div class="resource-title">获取途径</div>
            <div class="resource">{{ currentResource }}</div>
            <div class="btn-box">
                <el-button type="primary" size="large" :class="[tagStatus === 0 ? 'orange' : 'gray']">
                    <span v-if="tagStatus === 1">使用中</span>
                    <span v-else-if="tagStatus === 0" @click="changeTag()">更改</span>
                    <span v-else>未解锁</span>
                </el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus';
import router from '@/router'
import { getAchievement } from '@/axios/api/achievement'

const props = defineProps({
    userId: Number,
});
const tag = ref('国潮掌门人');
const tagData = [
    {
        label: '国潮掌门人',
        value: '国潮掌门人',
        resource: '投稿达到20篇',
    },
    {
        label: '非遗活字典',
        value: '非遗活字典',
        resource: '投稿达到30篇',
    },
    {
        label: '江湖传灯人',
        value: '江湖传灯人',
        resource: '发表评论达到50条',
    },
    {
        label: '非遗捧场王',
        value: '非遗捧场王',
        resource: '投稿收藏量达到50',
    },
    {
        label: '传承引路人',
        value: '传承引路人',
        resource: '投稿收藏量达到100',
    },
]
const currentResource = ref('投稿达到20篇');
const haveTag = ref([]);
const tagStatus = ref(-1);
function judgeTag(name) {
    if (haveTag.value.includes(name)) {
        if (localStorage.getItem('tag') === name) {
            return 1;
        } else return 0;
    } else return -1;
}

function changeTag() {
    localStorage.setItem('tag', tag.value);
    tagStatus.value = 1;
    ElMessage({
        message: '更改成功',
        type: 'success',
    })
}

onMounted(() => {
    getAchievement(props.userId).then((res) => {
        haveTag.value = res.data.data.map((item) => item.titleName);
        tagStatus.value = judgeTag(tag.value);
    })
    
})
watch(tag, () => {
    tagStatus.value = judgeTag(tag.value);
})

</script>

<style lang="scss" scoped>
.el-container {
    background-position: center;
    background-image: url('/icon/dialogBackground.svg');
    background-size: 100% 100%;
    height: 100vh;
    background-size: cover
}

.el-header {
    display: flex;
    align-items: center;
    border-bottom: solid 1px #c3c0c0;

    .title {
        flex: 1;
        text-align: center;
        font-size: 24px;
    }
}

.el-main {
    text-align: center;
}

.el-radio-group {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    // .el-radio-button {
    //     margin-bottom: 10px;
    // }

    :deep(.el-radio-button__inner) {
        border: solid 2px rgba(156, 104, 52, 0.71);
        padding: 10px;
        border-radius: 5px;
        background-color: rgb(255,255,255,0.5);
    }
}

.el-footer {
    border-top: solid 1px #c3c0c0;
    height: 30vh;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 0 15px;

    img {
        width: 50%;
        position: absolute;
        right: -5vh;
        top: 0;
        z-index: -1;
    }

    .resource-title {
        color: #fff;
        font-size: 20px;
        border-radius: 15px;
        padding: 10px 20px;
        background-color: rgba(246, 185, 55, 0.83);
        background-image: url('/icon/fish.png');
        background-size: 80% 100%;
        background-repeat: no-repeat;
        background-position: right;
        width: 100%;
        margin: 20px 0;
    }

    .resource {
        font-size: 18px;
        width: fit-content;
        padding: 0 10px;
        box-shadow: inset 0 -10px 0 0px #ffe431d4;
        margin-left: 20px;
    }

    .btn-box {
        width: 40%;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 5vh;

        :deep(.el-button) {
            width: 100%;
            font-size: 20px;
        }
    }
}

.gray {
    background-color: #c3c0c0;
    border: none;
}

.orange {
    background-color: #f6b937;
    border: none;
}
</style>