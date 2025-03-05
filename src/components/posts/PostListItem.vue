<script setup lang="ts">
import * as Posts from '@/axios/api/posts'
import { formatDate, gotoPost, gotoUser, html2txt } from '@/utils'


defineProps<{
    post: Posts.Post
}>()
</script>

<template>
    <div class="post-list-item" v-if="post">
        <div class="post-item">
            <svg class="icon-right" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.2711 4.45982C6.90316 7.26328 10.095 9.19397 11.7663 7.84392C13.4376 6.49387 12.9677 5.08069 11.9177 3.90966C10.8676 2.73862 9.92053 3.69362 9.90429 4.22583C9.88804 4.75803 11.3475 5.51825 10.2685 5.40453C9.18943 5.29081 8.39666 3.68865 9.24109 3.00473C10.0855 2.32082 10.952 2.65326 12.4283 3.56363C13.752 4.383 13.6707 4.68932 13.6322 4.75319C13.8214 4.46798 14.0709 4.22776 14.3631 4.04946C14.6552 3.87115 14.9829 3.75911 15.3231 3.72123C17.0641 3.65706 18.8074 3.73407 20.5359 3.9515C21.0767 5.98298 21.7957 7.6563 20.6564 8.99077C19.5171 10.3252 17.0726 8.32112 18.1528 7.74362C19.233 7.16613 18.8933 8.88647 19.6844 8.44153C20.4754 7.99659 20.4341 7.00687 19.4027 5.98775C18.3712 4.96863 16.0344 4.417 15.4135 6.40774C15.2983 7.1493 15.3365 7.90661 15.5258 8.63282C15.715 9.35902 16.0513 10.0387 16.5137 10.6297C16.5137 10.6297 15.1634 12.1528 16.3245 13.5565C16.977 14.2509 17.3512 15.161 17.3758 16.1135C18.3256 16.1286 19.2373 16.4895 19.9399 17.1287C21.3716 18.2656 22.8802 16.9024 22.8802 16.9024C23.4782 17.355 24.162 17.6814 24.8899 17.8618C25.6179 18.0421 26.3749 18.0728 27.1151 17.9518C29.0947 17.3211 28.522 14.9805 27.4888 13.9596C26.4556 12.9387 25.4531 12.9182 25.0195 13.7128C24.5858 14.5074 26.2879 14.1507 25.7304 15.2306C25.173 16.3106 23.1396 13.8974 24.4532 12.7386C25.7668 11.5799 27.4452 12.2893 29.4936 12.7985C29.7185 14.5249 29.8158 16.2657 29.7848 18.0064C29.7646 18.3517 29.6638 18.6874 29.4902 18.9866C29.3167 19.2858 29.0754 19.5401 28.7857 19.729C28.8297 19.6845 29.1404 19.619 29.9897 20.9185C30.9195 22.3855 31.25 23.2568 30.5851 24.097C29.9202 24.9372 28.3156 24.1601 28.1731 23.0985C28.0306 22.037 28.8277 23.4676 29.3561 23.4485C29.8846 23.4294 30.844 22.4584 29.648 21.4315C28.4521 20.4045 27.0387 19.9428 25.7141 21.6284C24.3896 23.314 26.3621 26.4859 29.1729 27.0842C29.353 28.1994 29.7513 29.2681 30.3449 30.2292C30.9386 31.1903 31.716 32.0248 32.6326 32.685L32.4173 6.91226C32.3897 3.60962 29.6982 0.95029 26.3954 0.962434L0.62196 1.05721C1.29379 1.96777 2.13852 2.73696 3.10785 3.32081C4.07717 3.90466 5.15208 4.29171 6.2711 4.45982Z" fill="#E6DBCD" />
            </svg>
            <svg class="icon-left" width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.0132 28.2876C26.379 25.4846 23.1857 23.5563 21.5154 24.9076C19.8451 26.2589 20.3161 27.6717 21.367 28.8419C22.4179 30.0122 23.3643 29.0565 23.3802 28.5243C23.396 27.9921 21.936 27.2329 23.0151 27.3458C24.0942 27.4588 24.8882 29.0603 24.0443 29.7449C23.2003 30.4294 22.3336 30.0976 20.8567 29.1883C19.5324 28.37 19.6134 28.0636 19.6518 27.9997C19.4628 28.285 19.2135 28.5254 18.9215 28.704C18.6295 28.8825 18.3019 28.9948 17.9617 29.0329C16.2208 29.0984 14.4774 29.0226 12.7487 28.8065C12.2064 26.7754 11.4862 25.1026 12.6245 23.7673C13.7628 22.432 16.2088 24.4343 15.1291 25.0126C14.0493 25.5909 14.3877 23.8703 13.597 24.3158C12.8062 24.7614 12.8483 25.7511 13.8805 26.7694C14.9127 27.7878 17.2499 28.3377 17.8693 26.3465C17.984 25.6048 17.9452 24.8475 17.7554 24.1215C17.5656 23.3954 17.2289 22.716 16.766 22.1253C16.766 22.1253 18.1151 20.6012 16.953 19.1983C16.3 18.5045 15.9251 17.5946 15.8998 16.6421C14.95 16.6278 14.0381 16.2675 13.335 15.6288C11.9024 14.493 10.3949 15.8573 10.3949 15.8573C9.79649 15.4052 9.11251 15.0793 8.38441 14.8995C7.65631 14.7196 6.89927 14.6896 6.1592 14.8111C4.17999 15.4432 4.75444 17.7834 5.78843 18.8035C6.82242 19.8237 7.8249 19.8434 8.25794 19.0485C8.69099 18.2536 6.98924 18.6116 7.54587 17.5312C8.1025 16.4509 10.1376 18.8625 8.82492 20.0223C7.5122 21.182 5.8333 20.4738 3.78452 19.9662C3.55834 18.2399 3.45972 16.4992 3.48946 14.7584C3.50933 14.4131 3.60996 14.0774 3.78325 13.778C3.95655 13.4787 4.19767 13.2243 4.48723 13.0351C4.44333 13.0796 4.13264 13.1454 3.28239 11.8465C2.35145 10.3802 2.02029 9.50913 2.68461 8.66847C3.34892 7.82781 4.95403 8.60364 5.09733 9.66512C5.24062 10.7266 4.44251 9.29654 3.91407 9.31602C3.38563 9.3355 2.42697 10.3072 3.62364 11.3333C4.82031 12.3594 6.23414 12.82 7.55743 11.1335C8.88073 9.44686 6.90587 6.27639 4.09457 5.68019C3.91366 4.56514 3.51459 3.49671 2.92022 2.53609C2.32584 1.57546 1.54783 0.741511 0.630723 0.0819713L0.865181 25.8546C0.895226 29.1572 3.58873 31.8145 6.89145 31.7999L32.6648 31.686C31.9923 30.776 31.147 30.0074 30.1773 29.4243C29.2075 28.8411 28.1323 28.4549 27.0132 28.2876Z" fill="#E6DBCD" />
            </svg>

            <div class="item-header">
                <div class="header-left">
                    <img class="profile" :src="post.avatarUrl" @click="gotoUser(post.userId)"></img>
                    <span class="nickName" @click="gotoUser(post.userId)">{{ post.nickName }}</span>
                    <div v-show="post.userType != 0" class="category">
                        <span v-if="post.userType === 3">官方</span>
                        <span v-if="post.userType === 2">非遗传承人</span>
                        <span v-if="post.userType === 1">媒体</span>
                    </div>
                </div>
                <span class="date">{{ formatDate(post.createdTime) }}</span>
            </div>

            <div class="item-content" @click="gotoPost(post.id)">
                <div class="content-title">{{ post.title }}</div>
                <div class="content-text">{{ html2txt(post.content).slice(0, 100) }}</div>
                <el-image class="content-img" v-if="post.urls.length" :src="post.urls[0].url" :preview-src-list="[post.urls[0].url]" fit="cover" @click.stop="" />
            </div>

            <div class="item-footer">
                <div class="tags">
                    <template v-if="typeof post.tag == 'string'">
                        <span v-for="tag in post.tag.split(' ')">{{ tag }}</span>
                    </template>
                </div>

                <div class="footer-right">
                    <div class="comment">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.49957 12.0846V12M11.9991 12.0846V12M16.4987 12.0846V12M20.9983 12C20.9983 13.2938 20.7253 14.5238 20.2338 15.6356L21 20.9991L16.4039 19.85C15.1019 20.5823 13.5993 21 11.9991 21C7.02906 21 3 16.9706 3 12C3 7.02944 7.02906 3 11.9991 3C16.9692 3 20.9983 7.02944 20.9983 12Z" stroke="#766552" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        {{ post.comments }}
                    </div>
                    <div class="like" @click="
                        (post.currentUserLike ? Posts.removeLike(post.id) : Posts.addLike(post.id))
                            .then(r => {
                                if (r.data.success) {
                                    post.currentUserLike = !post.currentUserLike
                                    post.likes += post.currentUserLike ? 1 : -1
                                }
                            })
                        ">
                        <mdiThumbUp v-if="post.currentUserLike" color="red" />
                        <mdiThumbUpOutline v-else color="rgba(118, 101, 82, 1)" />
                        {{ post.likes }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.post-list-item {
    margin-bottom: 12px;
}

.post-item {
    width: 100%;
    height: auto;
    position: relative;
    border-radius: 6px;
    border: solid 1px #E6DBCD;
    box-shadow: 0px 4px 8px 0px #00000029;

    >div {
        position: relative;
    }
}

.icon-right {
    position: absolute;
    top: -1px;
    right: -1px;
}

.icon-left {
    position: absolute;
    bottom: -1px;
    left: -1px;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    padding-bottom: 0;
}

.profile {
    display: block;
    width: 34px;
    height: 34px;
    border-radius: 100%;
    object-fit: cover;
    background-color: #E6DBCD;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.nickName {
    color: #000000;
}

.category {
    width: 30px;
    height: 17px;
    text-align: center;
    font-size: 11px;
    border-radius: 2px;
    color: rgba(255, 255, 255, 1);
    background-color: rgba(144, 169, 220, 1);
}

.date {
    font-size: 12px;
    color: #9D9393;
}

.content-title {
    margin: 8px 15px 0;
    font-size: 14px;
    color: #9F7638;
    font-weight: bold;
}

.content-text {
    font-size: 14px;
    font-family: 'Inter';
    line-height: 20px;
    margin: 4px 15px;
    width: calc(100% - 45px);
    /* 设置固定宽度 */
    white-space: nowrap;
    /* 不换行 */
    overflow: hidden;
    /* 隐藏超出部分 */
    text-overflow: ellipsis;
    /* 添加省略号 */
}

.content-img {
    display: block;
    width: 128px;
    aspect-ratio: 16 / 9;
    margin: 5px 0px 0px 15px;
    border-radius: 5px;
    object-fit: cover;
}

.item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
}

.tags {
    >span {
        font-size: 0.7em;
        padding: 2px 6px;
        margin-right: 4px;
        color: #766450;
        border-radius: 4px;
        border: solid 1px #6C5944;
    }
}

.footer-right {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #766552;

    >div {
        display: flex;
        align-items: center;
        gap: 4px;
    }
}

.like {
    svg {
        font-size: 1.5em;
    }
}
</style>