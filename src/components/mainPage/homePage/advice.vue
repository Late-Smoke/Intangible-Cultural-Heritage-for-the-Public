<script setup>
import { ref , onMounted } from 'vue';
import PostListItem from '@/components/posts/PostListItem.vue'
import Info from '@/components/slot/info.vue';
import { getFindPostApi, getFollowPostApi } from '@/axios/api/mainPage';
import { getInfoApi } from '@/axios/api/search';


const selectedTag = ref('find');
const handleClickTag = (tag) => {
    selectedTag.value = tag;
}
const findPost = ref([]);
const followPost = ref([]);
const infoData = ref([]);
onMounted(() => {
    getFindPostApi().then(res => {
        if (res.status == 200) {
            findPost.value = res.data.data;
        }
    })
    getFollowPostApi().then(res => {
        if (res.status == 200) {
            followPost.value = res.data.data;
        } 
    })
    getInfoApi("").then(res => {
        infoData.value = res.data.data;
    })
})
</script>

<template>
    <div class="tag">
        <el-button
        class="btn-left"
        type="text"
        :class="selectedTag === 'follow' ? 'clickTag' : 'unclickTag'"
        @click="handleClickTag('follow')"
        >
        关注
        </el-button>
        <el-button
        class="btn"
        type="text"
        :class="selectedTag === 'find' ? 'clickTag' : 'unclickTag'"
        @click="handleClickTag('find')"
        >
        发现
        </el-button>
        <el-button
        class="btn-right"
        type="text"
        :class="selectedTag === 'info' ? 'clickTag' : 'unclickTag'"
        @click="handleClickTag('info')"
        >
        资讯
        </el-button>
    </div>
    <div class="router">
        <dvi v-if="selectedTag === 'follow'">
            <div class="follow">
                <PostListItem v-for="post in findPost" :post="post" />
            </div>
        </dvi>
        <dvi v-if="selectedTag === 'find'">
            <div class="carousel">
                <el-carousel height="150px">
                    <el-carousel-item v-for="item in 3" :key="item">
                        <h3 class="small justify-center" text="2xl">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="find">
                <PostListItem v-for="post in followPost" :post="post" />
            </div>
        </dvi>
        <dvi v-if="selectedTag === 'info'">
            <div class="info">
                <info v-model="infoData"/>
            </div>
        </dvi>
    </div>
</template>


<style  scoped>
/*tag*/
.tag {
    margin: 10px 0 0;
    text-align: center;    
}
.tag .el-button {
    width: 75px;
    height: 25px;
    background-color: transparent;
    font-size: 14px;
    border: none;
    box-shadow: none;
    transition: 0.3;
    position: relative;
}
.btn-left {
    left: 30px;
}
.btn-right {
    right: 30px; 
}
.unclickTag {
    color: #000;
    background-image: url('/icon/unClick.png');
    z-index: 1;
}
.unclickTag:hover {
    color: #987B5B;
}
.clickTag {
    color: #FFF;
    background-image: url('/icon/click.png'); 
    z-index: 2;
}
.clickTag:hover {
    color: #FFF; 
}

/*router*/
.router {
    padding: 0 15px;
}
/*find*/
.carousel {
    background-color: aquamarine;
    border-radius: 5px;
}
:deep(.el-carousel__container) {
    height: 175px !important;
}
:deep(.el-carousel__indicators) {
    right: 1px;
    left: auto;
    justify-content: flex-end;
}
:deep(.el-carousel__indicator button) {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #FFF;
    border: solid 1px #00000080;
}
:deep(.el-carousel__indicator.is-active button) {
  background-color: #987B5B;
}
.find {
    margin-top: 10px;
}
</style>