<template>
    <el-input class="small-input" v-model="searchQuery" placeholder="在此输入活动地址" autocomplete="off"
        type="text" @keyup.enter="searchPlace()" style="margin-bottom: 10px;">
        <template #suffix>
            <el-icon class="suffix-icon" @click="searchPlace()">
                <Search />
            </el-icon>
        </template>
    </el-input>
    <div id="map" class="map"></div>
</template>

<script setup lang="ts">
import { ref, onMounted,defineEmits } from 'vue'

declare const AMap: any;

const searchQuery = ref('');
const map = ref(null);
const placeSearch = ref(null);

// 初始化地图和 PlaceSearch
const initializeMap = () => {
    map.value = new AMap.Map('map', {
        center: [116.397428, 39.90923],
        zoom: 10,
    })
    AMap.plugin('AMap.PlaceSearch', () => {
        placeSearch.value = new AMap.PlaceSearch({
            map: map.value,
        })
        placeSearch.value.on('markerClick', e => {
            const { name, location } = e.data
            if (location) {
                const amapUrl = generateAmapUrl(name, location)
                console.log(`跳转链接: ${amapUrl}`);
                searchQuery.value = name;
                sendDataToParent(name,amapUrl);
            }
        })
    })
}

// 搜索地点
const searchPlace = () => {
    if (!searchQuery.value) return;
    placeSearch.value.search(searchQuery.value, (status, result) => {
        if (status === 'complete' && result.poiList) {
            console.log('搜索成功，结果如下:', result.poiList.pois)
        } else {
            console.error('未找到匹配的地点')
        }
    })
}

// 生成跳转高德地图的链接
const generateAmapUrl = (name, location) => {
    const lng = location.lng || location.getLng()
    const lat = location.lat || location.getLat()
    return `https://uri.amap.com/marker?position=${lng},${lat}&name=${encodeURIComponent(
        name
    )}&src=yourAppName&coordinate=gaode&callnative=1`
}
const emit = defineEmits(['update:data']);
const sendDataToParent = (name,link) => {
  emit('update:data', { name: name, link: link }); // 触发事件并传递数据
};

// 挂载时初始化地图
onMounted(() => {
    initializeMap()
})
</script>

<style>
.map {
    width: 100%;
    height: 150px;
}


:deep(.search-input .el-input__wrapper) {
    box-shadow: none;
    border-bottom: solid 1px rgba(177, 151, 128, 0.5);
    border-radius: 0;
}

:deep(.el-form-item.is-error .el-input-tag__wrapper) {
    box-shadow: none;
}
</style>