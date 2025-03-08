<template>
    <div>
        <button @click="getUserLocation">获取我的位置</button>
        <div v-if="location">
            <p>经度: {{ location.lng }}</p>
            <p>纬度: {{ location.lat }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';

const location = ref(null);

function getUserLocation() {
    // 确保高德地图加载完成
    if (window.AMap) {
        AMap.plugin('AMap.Geolocation', () => {
            const geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位
                timeout: 10000, // 定位超时时间
                buttonPosition: 'RB', // 定位按钮位置
                buttonOffset: new AMap.Pixel(10, 20), // 定位按钮偏移量
                zoomToAccuracy: true // 定位成功后是否自动调整地图视野
            });

            geolocation.getCurrentPosition((status, result) => {
                if (status === 'complete') {
                    // 定位成功
                    console.log('定位成功', result);
                    location.value = {
                        lng: result.position.lng, // 经度
                        lat: result.position.lat // 纬度
                    };
                } else {
                    // 定位失败
                    console.error('定位失败', result);
                    alert('定位失败: ' + result.message);
                }
            });
        });
    } else {
        console.error('高德地图未加载');
        alert('高德地图未加载，请检查 API Key 是否正确');
    }
}
</script>