<script setup>
import { ref } from 'vue'
const popoverShow = ref(false);
const title = ref('全部用户');
const nickname = ref('确山打铁花');
const tag = ref('打铁花');
</script>

<template>
    <div class="container">
        <el-popover popper-class="user-popover" :show-arrow="false" :offset="0" :visible="popoverShow" :popper-style="{ minWidth:'191px',padding:'0',width:'auto' }">
            <div style="text-align: center; margin: 0; display: flex;flex-direction: column;align-items: center;">
                <el-button class="popover-btn" text @click="popoverShow = false;title = '全部用户'">                   
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.0254 20.5708L16.0257 17.3571C16.0259 15.5819 14.5869 14.1427 12.8117 14.1427H5.61444C3.83951 14.1427 2.40059 15.5815 2.40039 17.3564L2.40002 20.5708M21.5997 20.571L21.6 17.3572C21.6002 15.5821 20.1612 14.1429 18.386 14.1429M15.4064 4.06061C16.1957 4.64624 16.7072 5.5851 16.7072 6.64343C16.7072 7.70176 16.1957 8.64061 15.4064 9.22625M12.4938 6.64325C12.4938 8.41833 11.0548 9.85731 9.27977 9.85731C7.50469 9.85731 6.06571 8.41833 6.06571 6.64325C6.06571 4.86818 7.50469 3.4292 9.27977 3.4292C11.0548 3.4292 12.4938 4.86818 12.4938 6.64325Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    全部用户
                </el-button>                
                <svg width="190" height="2" viewBox="0 0 190 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-0.0020408" y1="1.5" x2="189.996" y2="0.7245" stroke="#987B5B"/>
                </svg>                    
                <el-button class="popover-btn" text @click="popoverShow = false;title = '认证用户'">                                            
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.40002 21.5999L2.40043 17.9995C2.40065 16.0114 4.01236 14.3999 6.00043 14.3999H13.1999M16.2 17.3999L17.4 18.5999L21.6 14.3999M14.4 5.9999C14.4 7.98813 12.7882 9.5999 10.8 9.5999C8.8118 9.5999 7.20002 7.98813 7.20002 5.9999C7.20002 4.01168 8.8118 2.3999 10.8 2.3999C12.7882 2.3999 14.4 4.01168 14.4 5.9999Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    认证用户
                </el-button>
                <svg width="190" height="2" viewBox="0 0 190 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="-0.0020408" y1="1.5" x2="189.996" y2="0.7245" stroke="#987B5B"/>
                </svg>
                <el-button class="popover-btn last-btn" text @click="popoverShow = false;title = '普通用户'">                        
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3995 22.0999L20.3998 18.5002C20.4 16.5119 18.7882 14.8999 16.7998 14.8999H7.20056C5.2125 14.8999 3.60079 16.5114 3.60056 18.4995L3.60016 22.0999M15.6002 6.4999C15.6002 8.48813 13.9884 10.0999 12.0002 10.0999C10.0119 10.0999 8.40016 8.48813 8.40016 6.4999C8.40016 4.51168 10.0119 2.8999 12.0002 2.8999C13.9884 2.8999 15.6002 4.51168 15.6002 6.4999Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    普通用户
                </el-button>
            </div>
            <template #reference>
                <el-button @click="popoverShow = true" type="text" class="sort-btn">
                    <div class="title">
                        <span>{{ title }}</span>                                      
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 10L12.0008 14.58L17 10" stroke="#987B5B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </el-button>
            </template>
        </el-popover>
        <div class="user">
            <div class="user-item">
                <div class="item-left">
                    <div class="item-img"></div>
                    <div class="item-info">
                        <div class="head">
                            <span>{{ nickname }}</span>                        
                            <svg width="30" height="17" viewBox="0 0 30 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="30" height="17" rx="2" fill="#90A9DC"/>
                                <path d="M14.9785 12.6235C14.778 12.9315 14.6025 13.2036 14.4521 13.4399C13.1416 12.7059 12.1963 11.7606 11.6162 10.604H11.584V13.9448H10.8105V10.604H10.7837C10.1213 11.7856 9.12044 12.7954 7.78125 13.6333C7.61654 13.4328 7.42318 13.2179 7.20117 12.9888C8.4043 12.3407 9.3335 11.5457 9.98877 10.604H7.65234V9.89502H10.8105V8.77783H9.53223V9.12158H8.7373V5.37256H7.65234V4.66357H8.7373V3.42822H9.53223V4.66357H12.8623V3.44971H13.6572V4.66357H14.7637V5.37256H13.6572V9.12158H12.8623V8.77783H11.584V9.89502H14.8389V10.604H12.3145C12.9339 11.4813 13.8219 12.1545 14.9785 12.6235ZM7.9209 11.7642L7.28711 12.4409C7.00065 12.1473 6.71061 11.8573 6.41699 11.5708C5.92285 12.38 5.28906 13.1105 4.51562 13.7622C4.36523 13.5402 4.2041 13.311 4.03223 13.0747C4.7806 12.4982 5.38395 11.8125 5.84229 11.0176C5.37679 10.5771 4.90234 10.1457 4.41895 9.72314C4.6875 8.75993 4.9292 7.65706 5.14404 6.41455H4.18262V5.64111H5.27295C5.38395 4.93929 5.486 4.1945 5.5791 3.40674L6.42773 3.5249C6.30957 4.29118 6.19499 4.99658 6.08398 5.64111H7.79199V6.31787C7.64518 8.26579 7.32471 9.76432 6.83057 10.8135C7.18506 11.1178 7.5485 11.4347 7.9209 11.7642ZM6.97559 6.41455H5.94434C5.70443 7.73226 5.47884 8.75277 5.26758 9.47607C5.57194 9.73031 5.88704 9.99707 6.21289 10.2764C6.63184 9.28809 6.88607 8.00081 6.97559 6.41455ZM9.53223 8.09033H12.8623V7.06982H9.53223V8.09033ZM9.53223 6.38232H12.8623V5.37256H9.53223V6.38232ZM25.9141 11.1626C25.6706 11.4562 25.4593 11.7212 25.2803 11.9575C23.848 10.8547 22.7952 8.9891 22.1221 6.36084V10.894H23.7012V11.6675H22.1221V13.9126H21.3271V11.6675H19.748V10.894H21.3271V6.36084H21.3003C20.6343 8.83512 19.5368 10.758 18.0078 12.1294C17.8431 11.9217 17.6533 11.6961 17.4385 11.4526C18.8206 10.1886 19.8555 8.49137 20.543 6.36084H18.0186V5.5874H21.3271V3.396H22.1221V5.5874H25.5488V6.36084H22.8149C23.4989 8.58805 24.5319 10.1886 25.9141 11.1626ZM15.0967 8.55225C16.1351 7.03402 16.9085 5.30452 17.417 3.36377L18.2334 3.6001C17.9541 4.51318 17.639 5.37077 17.2881 6.17285V13.9019H16.4932V7.78955C16.1709 8.37321 15.8271 8.92106 15.4619 9.43311C15.3545 9.13949 15.2327 8.84587 15.0967 8.55225Z" fill="white"/>
                            </svg>
                        </div>
                        <div class="item-tag">
                            <el-tag class="tag" effect="plain">{{ tag }}</el-tag>
                        </div>
                    </div>
                </div>
                <div class="item-right">                
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 10.5H10M10 10.5H4M10 10.5V16.5M10 10.5L10 4.5" stroke="#987B5B" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                    <span>关注</span>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.container {
    width: 100%;
    padding: 0 15px;
}

/*popover*/
.title {
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-size: 24px;
    color: #000000;
    box-shadow:inset 0 -8px 0 0px #F0E4D4; 
}
.popover-btn {
    width: 100%;
    display: flex;
    margin: 0;
    padding: 20px 15px;
    align-items: center;
    font-size: 20px;
}

/*user*/
.user {
   gap: 5px; 
   margin-top: 20px;
}
.user-item {
    width: 100%;
    display: flex;
    justify-content: space-between; 
}
.item-left {
    display: flex;
    align-items: center;
    gap: 10px; 
}
.item-img {
   width: 53px;
   height: 53px;
   border-radius: 50%;
   background: #90A9DC;
}
.item-info {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between; 
}
.head {
    display: flex;
    position: relative;
    top: 0px;
    align-items: center;
    gap: 5px;
}
.item-tag {
    display: flex;
    padding: 0 10px;
    padding-left: 0;
    justify-content: flex-start;
}
.tag {
    border: 0.5px solid #6C5944;
    border-radius: 4px;
    color: #766450;
    font-size: 10px;
    padding: 0 5px;
}
.item-right {
    display: flex;
    position: relative;
    height: 27px;
    align-items: center;
    padding: 0 5px;
    border: solid 1px #987B5B;
    border-radius: 8px;
    color: #987B5B;
    top: 50%;
    transform: translateY(50%);
}
</style>