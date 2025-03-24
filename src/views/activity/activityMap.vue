<template>
    <div id="map" class="map">

    </div>
    <div class="btn">
        <span>导航</span>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

declare const AMap: any;
let map = null;

const prop = defineProps({
    long: Number,
    lat: Number,
})

onMounted(() => {
    map = new AMap.Map('map', {
        center: [prop.lat, prop.long],
        // center: [116.4074, 39.9042],
        zoom: 10,
    });
    const marker = new AMap.Marker({
        position: [prop.lat, prop.long],
        // position: [116.4074, 39.9042],
    })
    marker.setMap(map)
});
</script>

<style scoped>
.map {
    width: 400px;
    height: 400px;
    position: relative;
}

.btn {
    background-color: #DFCDB5;
    border-radius: 8px;
    color: white;
    padding: 8px 0;
    text-align: center;
    position: absolute;
    bottom: 16px;
    left: 25%;
    right: 25%;
    z-index: 99;
}
</style>