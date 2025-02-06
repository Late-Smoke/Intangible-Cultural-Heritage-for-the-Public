<script setup>
import { ref, onMounted } from 'vue';

const videoElement = ref(null);
const canvasElement = ref(null);
const capturedImage = ref('');
const hasCameraAccess = ref(false);
const isHistoryExpanded = ref(false);

const openCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        });
        videoElement.value.srcObject = stream;
        hasCameraAccess.value = true;
    } catch (error) {
        console.error('无法访问相机:', error);
    }
};

const takePhoto = () => {
    const video = videoElement.value;
    const canvas = canvasElement.value;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    capturedImage.value = dataUrl;
    console.log('拍摄的照片:', dataUrl);
};

const toggleHistoryExpand = () => {
    isHistoryExpanded.value = !isHistoryExpanded.value;
};

onMounted(() => {
    openCamera();
});
</script>

<template>
    <el-button class="return-btn" circle size="default" color="#F0E4D4">
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="17.5" cy="17.5" r="17.5" fill="#F0E4D4"/>
            <path d="M20 26L12 18L20 10" stroke="#987B5B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </el-button>
    <video ref="videoElement" autoplay></video>
    <span class="tip">拍照识别</span>
    <el-button class="picture-btn" circle @click="takePhoto" text :disabled="!hasCameraAccess">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40Z" fill="#ECD0B0" fill-opacity="0.66"/>
            <path d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z" fill="#E4CCA9"/>
        </svg>
    </el-button>
    <canvas ref="canvasElement" width="100%" height="100%" style="display: none;"></canvas>
    <img v-if="capturedImage" :src="capturedImage" alt="Captured Photo">
    <div class="history" :style="{ height: isHistoryExpanded ? '80vh' : '170px' }">
        <div class="title">
            <div class="text">
                <span>相册</span>
                <span>搜索历史</span>
            </div>
            <el-button class="expand-btn" text @click="toggleHistoryExpand">
                {{ isHistoryExpanded ? '收起' : '展开' }}                                
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 14.5834L12.0008 10L17 14.5834" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </el-button>
        </div>
        <!-- <div v-for="i in 20" :key="i">{{ `历史记录 ${i}` }}</div> -->
    </div>
</template>

<style scoped>
video {
    position: fixed; /* 固定定位以铺满页面 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
}

.return-btn {
    margin: 48px 15px;
    padding: 0;
    position: absolute;
    z-index: 2;
    background-color: antiquewhite;
}

.tip {
    font-size: 20px;
    color: white;
    z-index: 2;
    position: absolute;
    bottom: 270px;
    left: 50%;
    transform: translateX(-50%);
}
.picture-btn {
    width: 80px;
    height: 80px;
    z-index: 2;
    position: absolute;
    bottom: 180px;
    left: 50%;
    transform: translateX(-50%);
}

.history {
    width: 100%;
    padding: 10px 20px 20px;
    position: absolute;
    bottom: 0;
    z-index: 3;
    overflow-y: auto;
    border-radius: 25px 25px 0 0;
    background-color: #F0E4D4;
}
.title {
    display: flex;
    justify-content: space-between;
    align-items: center; 
}
.text {
    display: flex;
    gap: 15px;
    font-size: 18px;
}
.expand-btn {
    font-size: 18px;
    color: #000000;
}
</style>