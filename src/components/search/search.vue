<script setup>
import { ref , onMounted} from 'vue';
import { ElMessageBox } from 'element-plus'

const input = ref('');

const historyShow = ref(false);
const historyDelete = ref(false);

const photoClick = () => {
    console.log('点击了图片'); 
}

let row = 1;// 行数
let len = 0;// 长度
let overIndex = 0; // 第一个开始隐藏的索引
const record = ref([]); // 被处理过的历史记录
const recordShow = ref([]);
const historyRecords = ref(['晚餐吃什么', '怎样快速入睡', '我用来凑够八个字', '超过了八个字啦啦啦啦','晚餐吃什么', '怎样快速入睡', '我用来凑够八个字', '超过了八个字啦啦啦啦','晚餐吃什么', '怎样快速入睡', '我用来凑够八个字', '超过了八个字啦啦啦啦']);
const historyRecordsShow = ref([...historyRecords.value]);
const dialogVisible = ref(false); // 删除弹窗
const hotText = ref(['李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化']);
const hotView = ref(['750W','750W','750W','750W','750W','750W','750W','750W','750W','750W']);

// 处理长文本的方法
const handleLongText = (containerWidth) => {
    historyRecords.value.forEach((item, index) => {
        if (item.length > 8) record.value[index] = item.slice(0, 7) + '...';
        else record.value[index] = item;
        // 判断行数
        len += item.length * 16 + 30;
        if(len > containerWidth){// 超过容器宽度
            row++;
            len = item.length * 16;
        }
        if(row<=3){
            overIndex++; 
        }
    });
    recordShow.value = [...record.value];
};

const handleDelete = (index) => { // 删除单个
  recordShow.value.splice(index, 1);
  historyRecordsShow.value.splice(index, 1);
}
const handleDeleteAll = () => { // 全部删除
    dialogVisible.value = false;
    recordShow.value = [];
    historyRecordsShow.value = [];
    historyDelete.value = false;
}
const confirm = () => {
  ElMessageBox.confirm(
    '删除全部搜索历史',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      center: true,
      showClose: false,
      customClass: 'confirm-delete-history'
    }
  )
    .then(() => {
     handleDeleteAll();
    })
    .catch(() => {
      dialogVisible = false;
    })
}
const handleFinish = () => {
    historyDelete.value = false;
    historyShow.value = false;
    //api传被删除的历史记录
}

onMounted(() => {
    const container = document.querySelector('.history-container');
    const containerWidth = container.offsetWidth;
    //获取历史记录数组
    handleLongText(containerWidth - 20);
})

</script>
<template>
    <el-container>
        <el-header>
            <el-button class="return-btn" circle size="default" color="#F0E4D4">
                <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 18L2 10L10 2" stroke="#987B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </el-button>
            <el-input 
            v-model="input" 
            style="width:257px;height:32px;font-size: 18px;color:#BBB6B6;" 
            placeholder="搜获帖子、活动或用户" 
            size="default">
            <template #prefix>
                <svg width="16.8" height="16.8" style="margin-right:5px;" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.9269 14.5401L18.4 17.9001M17.28 8.9401C17.28 13.27 13.7699 16.7801 9.44001 16.7801C5.11009 16.7801 1.60001 13.27 1.60001 8.9401C1.60001 4.61019 5.11009 1.1001 9.44001 1.1001C13.7699 1.1001 17.28 4.61019 17.28 8.9401Z" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </template>
                <template #suffix>
                    <svg @click="photoClick" width="28" height="25" style="margin:0;" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8602 6.6129V24C28.8602 24.3682 28.5617 24.6667 28.1935 24.6667H2C1.63181 24.6667 1.33333 24.3682 1.33333 24V13.4194V6.6129C1.33333 6.24471 1.63181 5.94624 2 5.94624H3.35484H5.04052C6.65148 5.94624 8.03191 4.79416 8.32009 3.20919L8.56163 1.88074C8.61926 1.56375 8.89535 1.33333 9.21754 1.33333H15.0968H20.976C21.2982 1.33333 21.5743 1.56375 21.6319 1.88074L21.8735 3.20919C22.1616 4.79415 23.5421 5.94624 25.153 5.94624H26.8387H28.1935C28.5617 5.94624 28.8602 6.24471 28.8602 6.6129ZM0 6.6129C0 5.50833 0.89543 4.6129 2 4.6129H3.35484H5.04052C6.0071 4.6129 6.83536 3.92166 7.00826 2.97067L7.2498 1.64223C7.42271 0.691249 8.25097 0 9.21754 0H15.0968H20.976C21.9426 0 22.7708 0.691248 22.9437 1.64223L23.1853 2.97067C23.3582 3.92165 24.1864 4.6129 25.153 4.6129H26.8387H28.1935C29.2981 4.6129 30.1935 5.50833 30.1935 6.6129V24C30.1935 25.1046 29.2981 26 28.1935 26H2C0.895432 26 0 25.1046 0 24V13.4194V6.6129ZM9.89249 13.8666C9.89249 11.2085 12.0473 9.05368 14.7054 9.05368C17.3635 9.05368 19.5183 11.2085 19.5183 13.8666C19.5183 15.2123 18.966 16.4291 18.0757 17.3025L18.0722 17.3059C17.2042 18.1556 16.016 18.6795 14.7054 18.6795C12.0473 18.6795 9.89249 16.5247 9.89249 13.8666ZM20.8516 13.8666C20.8516 15.34 20.3331 16.6924 19.4687 17.7511L21.4313 19.6498C21.6959 19.9058 21.7029 20.3279 21.4469 20.5925C21.1909 20.8571 20.7688 20.8641 20.5042 20.6081L18.5186 18.6872C17.4708 19.5172 16.146 20.0128 14.7054 20.0128C11.3109 20.0128 8.55916 17.2611 8.55916 13.8666C8.55916 10.4721 11.3109 7.72035 14.7054 7.72035C18.0999 7.72035 20.8516 10.4721 20.8516 13.8666Z" fill="#BBB6B6"/>
                    </svg>
                </template>
            </el-input>
            <el-button class="search-btn" color="#F0E4D4">搜索</el-button>
        </el-header>
        <el-main>
            <div class="title">
                <el-button type="text" @click="historyShow = !historyShow;">
                    <div class="old">
                        <span>历史记录</span>                 
                        <svg :class="{ 'rotated': historyShow }"  width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L6.00081 5.58L11 1" stroke="#987B5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </el-button>
                <div class="delete">
                    <el-button v-show="!historyDelete" type="text" class="text-delete" @click="historyDelete = true;historyShow = true">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.17647H17M6 1H12M12.5 19H5.5C4.39543 19 3.5 18.0519 3.5 16.8824L3.0434 5.27937C3.01973 4.67783 3.47392 4.17647 4.04253 4.17647H13.9575C14.5261 4.17647 14.9803 4.67783 14.9566 5.27937L14.5 16.8824C14.5 18.0519 13.6046 19 12.5 19Z" stroke="#987B5B" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </el-button>
                    <div v-show="historyDelete" class="delete-btn">
                        <el-button type="text" class="text-delete" @click="confirm">全部删除</el-button>                           
                        <svg width="2" height="19" viewBox="0 0 2 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.83594 18.0703H0.492188V0.789062H1.83594V18.0703Z" fill="#BBB6B6"/>
                        </svg>
                        <el-button type="text" class="text-delete" @click="handleFinish">完成</el-button>
                    </div> 
                </div>
            </div>
            <div class="history-container">
                <div class="history" v-for="(item, index) in recordShow" :key="index" :class="{ 'hidden-history': (index >= overIndex) && !historyShow}">
                    <el-button text class="text" :disabled="historyDelete">
                        {{ item }}   
                    </el-button>
                    <el-button v-show="historyDelete" type="text" class="text-delete">                
                        <svg @click="handleDelete(index)" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 1.5L1.5 12.5M12.5 12.5L1.5 1.5" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </el-button>
                </div>
            </div>
        </el-main>
        <el-footer>
            <div class="title footer">
                <div class="hot">                    
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3204 9.05106C14.8792 8.07432 14.2378 7.19765 13.4363 6.4759L12.775 5.87905C12.7525 5.85934 12.7255 5.84535 12.6963 5.83831C12.667 5.83128 12.6365 5.83141 12.6073 5.83869C12.5782 5.84597 12.5512 5.86019 12.529 5.88009C12.5067 5.89998 12.4897 5.92496 12.4795 5.95282L12.1841 6.78661C12 7.3097 11.6614 7.84395 11.1818 8.36927C11.15 8.4028 11.1136 8.41174 11.0886 8.41398C11.0636 8.41621 11.025 8.41174 10.9909 8.38045C10.9591 8.35362 10.9432 8.31339 10.9454 8.27315C11.0295 6.92744 10.6204 5.40962 9.72499 3.75766C8.98408 2.38513 7.95454 1.31438 6.66817 0.567762L5.72954 0.0245628C5.60681 -0.0469697 5.44999 0.0469166 5.45681 0.187746L5.50681 1.26073C5.5409 1.99394 5.45454 2.6422 5.24999 3.18093C4.99999 3.84037 4.6409 4.45287 4.18181 5.00277C3.86232 5.38494 3.5002 5.73061 3.10227 6.03329C2.14387 6.75793 1.36457 7.68643 0.822726 8.74929C0.282213 9.82141 0.000659456 11.0018 0 12.1985C0 13.2536 0.211363 14.2752 0.629545 15.2386C1.03333 16.1662 1.61604 17.0081 2.34545 17.7177C3.08182 18.433 3.93636 18.9963 4.88863 19.3875C5.87499 19.7943 6.92045 20 7.99999 20C9.07954 20 10.125 19.7943 11.1114 19.3897C12.0613 19.0008 12.9251 18.4337 13.6545 17.7199C14.3909 17.0046 14.9682 16.1685 15.3704 15.2409C15.788 14.28 16.0022 13.2456 16 12.2007C16 11.1099 15.7727 10.0503 15.3204 9.05106ZM12.5682 16.6357C11.3477 17.825 9.72726 18.4777 7.99999 18.4777C6.27272 18.4777 4.65227 17.825 3.43181 16.6357C2.21591 15.4487 1.54545 13.875 1.54545 12.2007C1.54545 11.2283 1.76818 10.2962 2.20682 9.42885C2.63409 8.58163 3.27045 7.82384 4.04318 7.2404C4.53599 6.86976 4.98297 6.44362 5.37499 5.9707C5.94318 5.2889 6.38863 4.52887 6.69772 3.71295C6.82451 3.37639 6.91664 3.02816 6.97272 2.6735C7.52045 3.16976 7.97954 3.76884 8.36363 4.47075C9.12272 5.8701 9.47272 7.11522 9.40454 8.17479C9.38825 8.42434 9.42968 8.67428 9.52573 8.90581C9.62178 9.13734 9.76994 9.34445 9.95908 9.51155C10.123 9.65718 10.3147 9.76932 10.523 9.84147C10.7314 9.91361 10.9522 9.94432 11.1727 9.93181C11.6204 9.90945 12.0318 9.71498 12.3318 9.38637C12.6341 9.0533 12.8954 8.71352 13.1136 8.36703C13.4318 8.76717 13.6977 9.20307 13.9091 9.6725C14.2704 10.4728 14.4545 11.3245 14.4545 12.2007C14.4545 13.875 13.7841 15.451 12.5682 16.6357Z" fill="black" fill-opacity="0.85"/>
                    </svg>
                    <span>非遗热点</span>
                </div>
                <div class="view" style="font-size:24px;">
                    <span>浏览量</span>
                </div>
            </div>
            <div v-for="(text, index) in hotText" :key="index">
                <div class="hot-box">
                    <div class="text-box">
                        <div class="hot-index">{{ index + 1}}</div>
                        <div class="hot-text">{{ text}}</div>
                    </div>
                    <div class="hot-view">{{ hotView[index] }}</div>
                </div>
            </div>
            <div class="rule">
                <el-button type="text" class="rule-btn">
                    榜单规则说明                            
                    <svg width="7" height="12" style="margin-left:10px;" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L1 11" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<style scoped>
.el-container {
    height: 100%;
    width: 100%;
}
.el-header {
    width: 100%;
    height: auto;
    padding: 48px 15px 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.el-main {
    width: 100%;
    padding: 20px 15px;
    overflow: visible;
}
.el-footer {
    width: 100%;
    height: 65%;
}

/* header */
.return-btn {
    margin-right: 0px;
}
.search-btn {
    font-size: 18px;
    padding: 8px 10px;
}
:deep(.el-input__wrapper) {
    width: 200px;
    border-radius: 55px;
    background-color: #F3D2A42E;
    border: solid 1px #987B5B;
    box-shadow: none;
}
:deep(.el-input__inner::placeholder) {
    font-size: 18px; 
    color:#BBB6B6;
}

/* main */
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.old, .hot {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 24px;
    color: #000000;
    box-shadow:inset 0 -10px 0 0px #F0E4D4;
}
.rotated {
    transform-origin: center;
    transform: rotate(180deg);
}
.cancel {
    margin-right: 10px;
}
.history-container {
  display: flex;
  flex-wrap: wrap;
  padding-top: 15px;
  gap: 10px; 
}
.history {
  display: flex;
  align-items: center;
  width: auto; 
  border: 1px solid #BAB7B5;
  border-radius: 55px;
}
.hidden-history {
  display: none;
}
.text {
    padding: 0 15px;
}
.delete-btn {
    display: flex;
    align-items: center;
}
:deep(.text-delete) {
    padding: 5px 10px;
    color: #BBB6B6;
}
.el-button+.el-button {
    margin-left: 0; 
}

/*footer*/
.footer {
    margin-bottom: 10px;
}
.rule {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}
.rule-btn {
    font-size: 18px;
    color: #BBB6B6;
}
.hot-box, .text-box {
    display: flex;
}
.hot-box {
    justify-content: space-between;
    border-bottom: solid 1px #D0B69A78;
    padding: 10px 0;
}
.hot-text {
    margin-left: 10px;
}
</style>