<template>
    <div id="baidu-map-container"></div>

</template>

<script setup lang="ts">
import { onMounted } from 'vue';

declare const BMap: any

onMounted(() => {
    const map = new BMap.Map("baidu-map-container")

    // map.setMapStyleV2([{
    //     "featureType": "LANDABROAD",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "color": "#302d28ff"
    //     }
    // }, {
    //     "featureType": "road",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "on"
    //     }
    // }, {
    //     "featureType": "highway",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "off"
    //     }
    // }, {
    //     "featureType": "nationalway",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "off"
    //     }
    // }, {
    //     "featureType": "provincialway",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "off"
    //     }
    // }, {
    //     "featureType": "cityhighway",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "off"
    //     }
    // }, {
    //     "featureType": "arterial",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "visibility": "off"
    //     }
    // }, {
    //     "featureType": "OCEAN",
    //     "elementType": "geometry",
    //     "stylers": {
    //         "color": "#2f4655ff"
    //     }
    // }])
    map.enableScrollWheelZoom(true)

    var point = new BMap.Point(116.404, 39.915);
    map.centerAndZoom(point, 15);

})
</script>

<style scoped lang="less">
#baidu-map-container {
    height: 100vh;
}
</style>