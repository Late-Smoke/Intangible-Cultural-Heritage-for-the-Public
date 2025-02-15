<script setup>
import { ref, onMounted} from 'vue';
import RelatedPost from '@/components/slot/relatedPost.vue'

const selectedTab = ref('relatedPost');
const handleTabClick = (tab) => {
    selectedTab.value = tab;
}
</script>

<template>
    <div class="bigMap">

    </div>
    <div class="title">
        <div class="tab">
            <span @click="handleTabClick('relatedPost')">相关帖子</span>            
            <svg v-show="selectedTab == 'relatedPost'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('activity')">展览/活动</span>            
            <svg v-show="selectedTab == 'activity'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
        <div class="tab">
            <span @click="handleTabClick('inheritor')">非遗传承人</span>            
            <svg v-show="selectedTab == 'inheritor'" width="25" height="2" viewBox="0 0 25 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    </div>
    <div class="content">
        <div class="relatedPost" v-show="selectedTab == 'relatedPost'">
            <related-post />
        </div>
    </div>
</template>


<style  scoped>
.bigMap {
    width: 100%;
    aspect-ratio: 1 / 1;
    background-color: #987B5B;
}

/*title*/
.title {
    display: flex;
    margin: 5px 15px;
    font-size: 18px;
    gap: 40px;
}
.tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px; 
}

/*content*/
.content {
    padding: 0 15px;
}
</style>