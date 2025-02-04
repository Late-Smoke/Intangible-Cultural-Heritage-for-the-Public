<script setup>
import { ref , onMounted} from 'vue';

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
const hotText = ref(['李子柒复原非遗文化','李子柒复原非遗文化','李子柒复原非遗文化']);
const hotView = ref(['750W','750W','750W']);

// 处理长文本的方法
const handleLongText = (containerWidth) => {
    historyRecords.value.forEach((item, index) => {
        if (item.length > 8) record.value[index] = item.slice(0, 7) + '...';
        else record.value[index] = item;
        // 判断行数
        len += item.length * 16;
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
  console.log(recordShow.value);
}
const handleDeleteAll = () => { // 全部删除
    dialogVisible.value = false;
    recordShow.value = [];
    historyRecordsShow.value = [];
    historyDelete.value = false;
}
const handleFinish = () => {
    historyDelete.value = false;
    //api传被删除的历史记录
}

onMounted(() => {
    const container = document.querySelector('.history-container');
    const containerWidth = container.offsetWidth;
    //获取历史记录数组
    handleLongText(containerWidth - 60);
})

</script>
<template>
    <el-container>
        <el-header>
            <el-button type="text" class="return-btn">
                <svg width="20" height="31" viewBox="0 0 20 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.1251 3.42788V0.322079C19.1251 0.0528822 18.8157 -0.0957787 18.6068 0.0689535L0.494254 14.2158C0.340363 14.3355 0.21584 14.4888 0.130184 14.6639C0.0445271 14.839 0 15.0314 0 15.2263C0 15.4213 0.0445271 15.6136 0.130184 15.7888C0.21584 15.9639 0.340363 16.1171 0.494254 16.2368L18.6068 30.3837C18.8197 30.5484 19.1251 30.3998 19.1251 30.1306V27.0248C19.1251 26.8279 19.0326 26.639 18.88 26.5185L4.41568 15.2283L18.88 3.93413C19.0326 3.8136 19.1251 3.62476 19.1251 3.42788Z" fill="#7B7171"/>
                </svg>
            </el-button>
            <el-input v-model="input" style="width:70%" placeholder="搜获帖子、活动或用户" size="large">
                <template #suffix>
                    <svg @click="photoClick" width="31" height="26" viewBox="0 0 31 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M28.8602 6.6129V24C28.8602 24.3682 28.5617 24.6667 28.1935 24.6667H2C1.63181 24.6667 1.33333 24.3682 1.33333 24V13.4194V6.6129C1.33333 6.24471 1.63181 5.94624 2 5.94624H3.35484H5.04052C6.65148 5.94624 8.03191 4.79416 8.32009 3.20919L8.56163 1.88074C8.61926 1.56375 8.89535 1.33333 9.21754 1.33333H15.0968H20.976C21.2982 1.33333 21.5743 1.56375 21.6319 1.88074L21.8735 3.20919C22.1616 4.79415 23.5421 5.94624 25.153 5.94624H26.8387H28.1935C28.5617 5.94624 28.8602 6.24471 28.8602 6.6129ZM0 6.6129C0 5.50833 0.89543 4.6129 2 4.6129H3.35484H5.04052C6.0071 4.6129 6.83536 3.92166 7.00826 2.97067L7.2498 1.64223C7.42271 0.691249 8.25097 0 9.21754 0H15.0968H20.976C21.9426 0 22.7708 0.691248 22.9437 1.64223L23.1853 2.97067C23.3582 3.92165 24.1864 4.6129 25.153 4.6129H26.8387H28.1935C29.2981 4.6129 30.1935 5.50833 30.1935 6.6129V24C30.1935 25.1046 29.2981 26 28.1935 26H2C0.895432 26 0 25.1046 0 24V13.4194V6.6129ZM9.89249 13.8666C9.89249 11.2085 12.0473 9.05368 14.7054 9.05368C17.3635 9.05368 19.5183 11.2085 19.5183 13.8666C19.5183 15.2123 18.966 16.4291 18.0757 17.3025L18.0722 17.3059C17.2042 18.1556 16.016 18.6795 14.7054 18.6795C12.0473 18.6795 9.89249 16.5247 9.89249 13.8666ZM20.8516 13.8666C20.8516 15.34 20.3331 16.6924 19.4687 17.7511L21.4313 19.6498C21.6959 19.9058 21.7029 20.3279 21.4469 20.5925C21.1909 20.8571 20.7688 20.8641 20.5042 20.6081L18.5186 18.6872C17.4708 19.5172 16.146 20.0128 14.7054 20.0128C11.3109 20.0128 8.55916 17.2611 8.55916 13.8666C8.55916 10.4721 11.3109 7.72035 14.7054 7.72035C18.0999 7.72035 20.8516 10.4721 20.8516 13.8666Z" fill="#BBB6B6"/>
                    </svg>
                </template>
            </el-input>
            <el-button type="text" class="search-btn">搜索</el-button>
        </el-header>
        <el-main>
            <el-dialog
                v-model="dialogVisible"
                title="提示"
                width="90%"
            >
                <span>是否确认全部删除</span>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false" class="cancel">取消</el-button>
                    <el-button type="primary" @click="handleDeleteAll">
                    确认
                    </el-button>
                </div>
                </template>
            </el-dialog>
            <div class="title">
                <el-button type="text" class="back-btn" @click="historyShow = !historyShow;">
                    <div class="old">
                        <span>历史记录</span>                    
                        <svg :class="{ 'rotated': historyShow }" width="13" height="9" viewBox="0 0 13 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.8636 0H11.5807C11.4934 0 11.4113 0.0439454 11.36 0.116016L6.50032 6.99961L1.64064 0.116016C1.58932 0.0439454 1.50722 0 1.41998 0H0.137061C0.025875 0 -0.0391261 0.130078 0.025875 0.223242L6.05729 8.76797C6.27624 9.07734 6.72441 9.07734 6.94165 8.76797L12.9731 0.223242C13.0398 0.130078 12.9748 0 12.8636 0Z" fill="black"/>
                        </svg>
                    </div>
                </el-button>
                <div class="delete">
                    <el-button v-show="!historyDelete" type="text" class="text-delete" @click="historyDelete = true;">
                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.4375 1.71H5.25C5.35313 1.71 5.4375 1.6245 5.4375 1.52V1.71H12.5625V1.52C12.5625 1.6245 12.6469 1.71 12.75 1.71H12.5625V3.42H14.25V1.52C14.25 0.681625 13.5773 0 12.75 0H5.25C4.42266 0 3.75 0.681625 3.75 1.52V3.42H5.4375V1.71ZM17.25 3.42H0.75C0.335156 3.42 0 3.75962 0 4.18V4.94C0 5.0445 0.084375 5.13 0.1875 5.13H1.60312L2.18203 17.5513C2.21953 18.3611 2.88047 19 3.67969 19H14.3203C15.1219 19 15.7805 18.3635 15.818 17.5513L16.3969 5.13H17.8125C17.9156 5.13 18 5.0445 18 4.94V4.18C18 3.75962 17.6648 3.42 17.25 3.42ZM14.1398 17.29H3.86016L3.29297 5.13H14.707L14.1398 17.29Z" fill="#C2BEBE" fill-opacity="0.85"/>
                        </svg>
                    </el-button>
                    <div v-show="historyDelete">
                        <el-button type="text" class="text-delete" @click="dialogVisible = true">全部删除</el-button>
                        <span>                            
                            <svg width="1" height="18" viewBox="0 0 1 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line x1="0.5" x2="0.5" y2="18" stroke="#E1DCDC"/>
                            </svg>
                        </span>
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
                        <svg @click="handleDelete(index)" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.98924 6L11.9638 0.241104C12.0472 0.145399 11.9771 0 11.8482 0H10.336C10.2469 0 10.1616 0.0386503 10.1029 0.104908L6 4.85521L1.89714 0.104908C1.84028 0.0386503 1.755 0 1.66404 0H0.151759C0.022893 0 -0.0472254 0.145399 0.0361585 0.241104L5.01076 6L0.0361585 11.7589C0.0174797 11.7802 0.00549658 11.8063 0.00163129 11.8341C-0.00223399 11.8618 0.00218092 11.8901 0.0143523 11.9154C0.0265238 11.9408 0.0459405 11.9623 0.0702967 11.9773C0.094653 11.9923 0.122926 12.0002 0.151759 12H1.66404C1.75311 12 1.83839 11.9613 1.89714 11.8951L6 7.14478L10.1029 11.8951C10.1597 11.9613 10.245 12 10.336 12H11.8482C11.9771 12 12.0472 11.8546 11.9638 11.7589L6.98924 6Z" fill="#B2A3A3" fill-opacity="0.85"/>
                        </svg>
                    </el-button>
                </div>
            </div>
        </el-main>
        <el-footer>
            <div class="title">
                <div class="hot">                    
                    <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.3204 9.05106C14.8792 8.07432 14.2378 7.19765 13.4363 6.4759L12.775 5.87905C12.7525 5.85934 12.7255 5.84535 12.6963 5.83831C12.667 5.83128 12.6365 5.83141 12.6073 5.83869C12.5782 5.84597 12.5512 5.86019 12.529 5.88009C12.5067 5.89998 12.4897 5.92496 12.4795 5.95282L12.1841 6.78661C12 7.3097 11.6614 7.84395 11.1818 8.36927C11.15 8.4028 11.1136 8.41174 11.0886 8.41398C11.0636 8.41621 11.025 8.41174 10.9909 8.38045C10.9591 8.35362 10.9432 8.31339 10.9454 8.27315C11.0295 6.92744 10.6204 5.40962 9.72499 3.75766C8.98408 2.38513 7.95454 1.31438 6.66817 0.567762L5.72954 0.0245628C5.60681 -0.0469697 5.44999 0.0469166 5.45681 0.187746L5.50681 1.26073C5.5409 1.99394 5.45454 2.6422 5.24999 3.18093C4.99999 3.84037 4.6409 4.45287 4.18181 5.00277C3.86232 5.38494 3.5002 5.73061 3.10227 6.03329C2.14387 6.75793 1.36457 7.68643 0.822726 8.74929C0.282213 9.82141 0.000659456 11.0018 0 12.1985C0 13.2536 0.211363 14.2752 0.629545 15.2386C1.03333 16.1662 1.61604 17.0081 2.34545 17.7177C3.08182 18.433 3.93636 18.9963 4.88863 19.3875C5.87499 19.7943 6.92045 20 7.99999 20C9.07954 20 10.125 19.7943 11.1114 19.3897C12.0613 19.0008 12.9251 18.4337 13.6545 17.7199C14.3909 17.0046 14.9682 16.1685 15.3704 15.2409C15.788 14.28 16.0022 13.2456 16 12.2007C16 11.1099 15.7727 10.0503 15.3204 9.05106ZM12.5682 16.6357C11.3477 17.825 9.72726 18.4777 7.99999 18.4777C6.27272 18.4777 4.65227 17.825 3.43181 16.6357C2.21591 15.4487 1.54545 13.875 1.54545 12.2007C1.54545 11.2283 1.76818 10.2962 2.20682 9.42885C2.63409 8.58163 3.27045 7.82384 4.04318 7.2404C4.53599 6.86976 4.98297 6.44362 5.37499 5.9707C5.94318 5.2889 6.38863 4.52887 6.69772 3.71295C6.82451 3.37639 6.91664 3.02816 6.97272 2.6735C7.52045 3.16976 7.97954 3.76884 8.36363 4.47075C9.12272 5.8701 9.47272 7.11522 9.40454 8.17479C9.38825 8.42434 9.42968 8.67428 9.52573 8.90581C9.62178 9.13734 9.76994 9.34445 9.95908 9.51155C10.123 9.65718 10.3147 9.76932 10.523 9.84147C10.7314 9.91361 10.9522 9.94432 11.1727 9.93181C11.6204 9.90945 12.0318 9.71498 12.3318 9.38637C12.6341 9.0533 12.8954 8.71352 13.1136 8.36703C13.4318 8.76717 13.6977 9.20307 13.9091 9.6725C14.2704 10.4728 14.4545 11.3245 14.4545 12.2007C14.4545 13.875 13.7841 15.451 12.5682 16.6357Z" fill="black" fill-opacity="0.85"/>
                    </svg>
                    <span>非遗热点</span>
                </div>
                <div class="view">
                    <span>浏览量</span>
                </div>
            </div>
            <div v-for="(text, index) in hotText" :key="index">
                <div class="hot-box">
                    <div class="text">{{ text}}</div>
                    <div class="number">{{ hotView[index] }}</div>
                </div>
            </div>
            <div class="rule">
                <el-button type="text" class="rule-btn">
                    榜单规则说明        
                    <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.84492 5.601L0.162605 0.0270356C0.147757 0.0123546 0.129913 0.00323097 0.111122 0.000712468C0.0923312 -0.00180603 0.073356 0.00238272 0.0563753 0.0127978C0.0393947 0.0232128 0.0250976 0.0394318 0.0151257 0.0595918C0.00515376 0.0797519 -8.85023e-05 0.103036 1.13045e-06 0.126769V1.35048C1.13045e-06 1.42805 0.0289926 1.50245 0.0768915 1.54994L4.61468 5.99993L0.0768915 10.4499C0.0277321 10.4974 1.13045e-06 10.5718 1.13045e-06 10.6494V11.8731C1.13045e-06 11.9792 0.0970593 12.0377 0.162605 11.9728L5.84492 6.39887C5.89322 6.35155 5.93229 6.29103 5.95916 6.2219C5.98603 6.15277 6 6.07686 6 5.99993C6 5.92301 5.98603 5.84709 5.95916 5.77797C5.93229 5.70884 5.89322 5.64832 5.84492 5.601Z" fill="#9F9494" fill-opacity="0.85"/>
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
    padding: 48px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #B3C0D1;
}
.el-main {
    background-color: #E9EEF3;
    width: 100%;
    height: auto;
}
.el-footer {
    width: 100%;
    height:60%;
    background-color: #B3C0D1; 
}

/* header */
.return-btn {
    margin-left: 20px;
    margin-right: 0px;
}
.search-btn {
    font-size: 20px;
    margin-right: 20px;
}
:deep(.el-input__wrapper) {
    width: 200px;
    border-radius: 55px;
}

/* main */
.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  gap: 10px; 
}
.history {
  display: flex;
  align-items: center;
  width: auto; 
  border: 1px solid #ccc;
  border-radius: 55px;
}
.hidden-history {
  display: none;
}
.newline-history {
    flex-basis: 40%;
    background-color: antiquewhite;
}
:deep(.text-delete) {
    padding: 5px 10px;
    height: auto;
    padding-left: 0;
}
.el-button+.el-button {
    margin-left: 0; 
}

/*footer*/
.rule {
    display: flex;
    justify-content: center;
}
.hot-box {
    width: 200px;
    height: 200px;
    background-color: #3685ec;
}
</style>