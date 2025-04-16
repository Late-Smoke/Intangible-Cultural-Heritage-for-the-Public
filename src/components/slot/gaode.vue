<template>
    <div id="outer-box" style="width:100%;height:100%">
        <div v-show="dialogVisible" class="dialog">
            <div class="custom-dialog-header">
                <span class="custom-title">筛选标点</span>
                <el-icon class="close-icon" size="24px" @click="closeDialog">
                    <Close />
                </el-icon>
            </div>
            <el-tabs v-model="tabsName" tab-position="left" class="demo-tabs">
                <el-tab-pane v-for="firstType in categories"
                    :label="firstType.title.length > 4 ? firstType.title.slice(0, 4) + '...' : firstType.title"
                    :name="firstType.title">
                    <el-scrollbar height="270px">
                        <el-collapse class="collapse-box" accordion v-model="activeNames" @change="handleChange">
                            <el-collapse-item v-for="(secondType, index) in firstType.children" :name="secondType"
                                icon="" @click="handleSecondLevel(firstType, secondType, index);">
                                <template #title>
                                    <div class="custom-collapse-title" :style="{ borderColor: borderColor[index] }">
                                        <span :style="{ color: borderColor[index] }">{{ secondType }}</span>
                                    </div>
                                </template>
                                <el-scrollbar height="200px">
                                    <el-checkbox-group v-model="selectHeritage" size="small">
                                        <div v-if="firstType.data[index].length === 0" class="no-data">
                                            <el-skeleton :rows="5" animated />
                                        </div>
                                        <el-checkbox-button v-else v-for="(detail, key) in firstType.data[index]"
                                            :key="key" :value="detail">
                                            <el-badge
                                                @click="firstType.visible[index][key] = !firstType.visible[index][key];"
                                                :hidden="!firstType.visible[index][key]" :offset="[10, 0]"
                                                :value="clickHeritage(firstType, index, key, detail)" class="item-badge"
                                                type="warning">
                                                {{ detail.title.length > 8 ? detail.title.slice(0, 8) + '...' :
                                                    detail.title
                                                }}【{{
                                                    detail.unit.length > 5 ? detail.unit.slice(0, 5) + '...' :
                                                        detail.unit
                                                }}】
                                            </el-badge>
                                        </el-checkbox-button>
                                    </el-checkbox-group>
                                </el-scrollbar>
                            </el-collapse-item>
                        </el-collapse>
                    </el-scrollbar>
                </el-tab-pane>
            </el-tabs>
            <div class="bottom-box">
                <div class="refresh" @click="clickRefresh()">
                    <el-icon size="1.5rem">
                        <Refresh />
                    </el-icon>
                    <div>重置</div>
                </div>
                <div class="viewPoints"
                    @click="if (selectHeritage.length > 0) { ifViewPoints = true; dialogVisible = false; positionStore.firstPoint = selectHeritage[0]; }">
                    <div class="svgPoints">
                        <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M15.493 0H0.657637C0.163931 0 -0.144383 0.559358 0.103478 1.00559L4.79066 9.28911V14.3296C4.79066 14.7004 5.07681 15 5.43147 15H10.7192C11.0738 15 11.36 14.7004 11.36 14.3296V9.28911L16.0492 1.00559C16.295 0.559358 15.9867 0 15.493 0ZM9.91714 13.4916H6.23349V10.2235H9.91915V13.4916H9.91714ZM10.1106 8.53492L9.91915 8.88268H6.23147L6.04004 8.53492L2.04404 1.50838H14.1066L10.1106 8.53492Z"
                                fill="black" fill-opacity="0.85" />
                        </svg>
                    </div>
                    <div>查看标点</div>
                </div>
            </div>
        </div>
        <div id="container" v-loading="loading" tabindex="0">
        </div>
        <div class="btn-position">
            <button class="btn">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M35.6786 16.4732H30.7687C30.0737 10.5911 25.4089 5.92634 19.5268 5.23125V0.321429C19.5268 0.144643 19.3821 0 19.2054 0H16.7946C16.6179 0 16.4732 0.144643 16.4732 0.321429V5.23125C10.5911 5.92634 5.92634 10.5911 5.23125 16.4732H0.321429C0.144643 16.4732 0 16.6179 0 16.7946V19.2054C0 19.3821 0.144643 19.5268 0.321429 19.5268H5.23125C5.92634 25.4089 10.5911 30.0737 16.4732 30.7687V35.6786C16.4732 35.8554 16.6179 36 16.7946 36H19.2054C19.3821 36 19.5268 35.8554 19.5268 35.6786V30.7687C25.4089 30.0737 30.0737 25.4089 30.7687 19.5268H35.6786C35.8554 19.5268 36 19.3821 36 19.2054V16.7946C36 16.6179 35.8554 16.4732 35.6786 16.4732ZM18 27.8036C12.5839 27.8036 8.19643 23.4161 8.19643 18C8.19643 12.5839 12.5839 8.19643 18 8.19643C23.4161 8.19643 27.8036 12.5839 27.8036 18C27.8036 23.4161 23.4161 27.8036 18 27.8036Z"
                        fill="#8C7831" />
                    <path
                        d="M18.0006 13.1835C16.7109 13.1835 15.5055 13.6817 14.5935 14.5978C13.6814 15.5098 13.1792 16.7152 13.1792 18.0049C13.1792 19.2947 13.6814 20.5 14.5935 21.4121C15.5055 22.3201 16.7149 22.8264 18.0006 22.8264C19.2863 22.8264 20.4957 22.3241 21.4078 21.4121C22.3158 20.5 22.822 19.2906 22.822 18.0049C22.822 16.7192 22.3198 15.5098 21.4078 14.5978C20.9624 14.1474 20.4317 13.7903 19.8466 13.5475C19.2616 13.3046 18.634 13.1809 18.0006 13.1835Z"
                        fill="#8C7831" />
                </svg>
            </button>
            <div>定位至当前位置</div>
        </div>
        <div class="select" @click="dialogVisible = true; ifViewPoints = false;">
            <svg width="37" height="43" viewBox="0 0 37 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M35.5252 0H1.4728C0.339575 0 -0.368115 1.60349 0.200812 2.88268L10.9595 26.6288V41.0782C10.9595 42.1412 11.6164 43 12.4304 43H24.5675C25.3816 43 26.0384 42.1412 26.0384 41.0782V26.6288L36.8018 2.88268C37.3661 1.60349 36.6584 0 35.5252 0ZM22.7266 38.676H14.2714V29.3073H22.7313V38.676H22.7266ZM23.1707 24.4668L22.7313 25.4637H14.2667L13.8273 24.4668L4.6551 4.32402H32.3429L23.1707 24.4668Z"
                    fill="#8C7831" />
                <path d="M22.9655 39.1409H14.0345V28.6665H22.9655V39.1409Z" fill="#FFF1E3" stroke="#8C7831" />
                <path d="M22.9655 25.9102H14.0345L3.82758 3.85889H33.1724L22.9655 25.9102Z" fill="#FFF1E3"
                    stroke="#8C7831" />
            </svg>
            <span>筛选标点</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { ElMessage, skeletonItemProps } from 'element-plus';
import { usePositionStore } from '@/stores/user';
import { getFromAdcodeApi, postHeritageApi } from '@/axios/api/mainPage';
import { pinPost } from '@/axios/api/posts';
const loading = ref(true);
const oldIndex = ref(null);

const dialogVisible = ref(false);
const tabsName = ref('民间文学');
const activeNames = ref('');
const borderColor = ['rgba(177, 151, 128, 1)', 'rgba(159, 125, 90, 1)',
    'rgba(173, 104, 104, 1)', 'rgba(152, 66, 66, 1)', 'rgba(29, 66, 108, 1)'];
const categories = ref([
    {
        title: "民间文学",
        children: [
            "神话与传说",
            "民间故事",
            "歌谣与谚语",
            "谜语与说唱文学",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []],
    },
    {
        title: "传统音乐",
        children: [
            "民歌",
            "器乐",
            "戏曲音乐",
            "宗教与仪式音乐",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统舞蹈",
        children: [
            "民间舞蹈",
            "宗教舞蹈",
            "祭祀舞蹈",
            "舞蹈道具与服饰",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统戏剧",
        children: [
            "地方戏曲",
            "木偶戏",
            "皮影戏",
            "戏剧表演艺术",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "曲艺",
        children: [
            "相声与小品",
            "评书与快板",
            "大鼓与弹词",
            "地方曲艺",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统美术",
        children: [
            "绘画与书法",
            "剪纸与刺绣",
            "雕刻与陶瓷",
            "民间工艺美术",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统技艺",
        children: [
            "陶瓷与金属工艺",
            "纺织与染织",
            "传统建筑营造",
            "食品与酿造技艺",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统医药",
        children: [
            "中医与针灸",
            "中药炮制",
            "民族医药",
            "传统养生",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "民俗",
        children: [
            "岁时节令",
            "人生礼俗",
            "民间信仰",
            "饮食与服饰习俗",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    },
    {
        title: "传统体育、游艺与杂技",
        children: [
            "传统武术",
            "民族体育",
            "游艺与游戏",
            "杂技与魔术",
            "其他"
        ],
        visible: [[], [], [], [], []],
        data: [[], [], [], [], []]
    }
]);
const ifViewPoints = ref(false);
const ifRefresh = ref(false);
const selectHeritage = ref([]);// 选中的非遗项目
function handleSecondLevel(firstType, secondType, index) {//点击二级分类
    if (firstType.data[index].length === 0) { // 第一次搜
        postHeritageApi(firstType.title, secondType).then(res => {
            firstType.data[index] = res.data.data;
            firstType.visible[index].length = res.data.data.length;
        })
    }
}
function clickHeritage(firstType, index, key, detail) { //控制非遗项目的显影
    if (firstType.visible[index][key]) {
        return selectHeritage.value.findIndex(item => item.id === detail.id) + 1;
    }
}
function clickRefresh() { //重置
    ifRefresh.value = true;
    selectHeritage.value = [];
    categories.value.forEach(item => {
        item.visible = [[], [], [], [], []];
    })
}
function closeDialog() {
    if (!dialogVisible.value) ifRefresh.value = false;
    dialogVisible.value = false;
}

// 地图对象
const positionStore = usePositionStore();
let map = null;
// DistrictExplorer 实例
let districtExplorer = null;
// 当前选中的区域
let currentAreaNode = null;

// 一些颜色
const colors = [
    "#3366cc", "#dc3912", "#ff9900", "#109618", "#990099", "#0099c6", "#dd4477", "#66aa00",
    "#b82e2e", "#316395", "#994499", "#22aa99", "#aaaa11", "#6633cc", "#e67300", "#8b0707",
    "#651067", "#329262", "#5574a6", "#3b3eac"
];

const heritageData = ref([]);

onMounted(() => {
    const button = document.getElementsByClassName('btn-position')[0];
    map = new AMap.Map('container', {
        touchZoom: true,
        resizeEnable: true
    });

    AMapUI.loadUI(['misc/PointSimplifier'], function (PointSimplifier) {
        if (!PointSimplifier.supportCanvas) {
            alert('当前环境不支持 Canvas!');
            return;
        }

        var pointSimplifierIns = new PointSimplifier({  //点标记
            map: map,
            autoSetFitView: false,
            zIndex: 2,
            compareDataItem: function (a, b, aIndex, bIndex) {
                return aIndex > bIndex ? -1 : 1;
            },
            getPosition: function (dataItem) {
                return dataItem;
            },
            renderOptions: {
                pointStyle: {
                    width: 6,
                    height: 6,
                    content: 'circle',
                    fillStyle: '#FADBBF',
                    strokeStyle: 'rgba(140, 68, 32, 0.65)',
                    strokeWeight: 1,
                },
                pointHardcoreStyle: {
                    width: 10,
                    height: 10,
                    content: 'circle',
                    strokeStyle: '#FFF0E1',
                    strokeWeight: 2,
                },
            }
        })
        pointSimplifierIns.on('pointClick', function (e, record) {
            console.log('点击了点：', record);
        });
        AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], (DistrictExplorer, $) => {// 地图下钻
            districtExplorer = new DistrictExplorer({
                eventSupport: true, // 开启事件支持
                map: map
            });
            AMap.plugin('AMap.Geolocation', function () { //定位
                var geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,
                    timeout: 10000,
                    showCircle: false,
                    showButton: false,
                    buttonDom: button,
                    // zoomToAccuracy: true,
                });

                map.addControl(geolocation);

                function movePosition() {
                    geolocation.getCurrentPosition(function (status, result) {
                        if (status == 'complete') {
                            // 获取定位城市
                            geolocation.getCityInfo(function (status, cityResult) {
                                if (status === 'complete') {
                                    var cityName = cityResult.city.replace(/市$/, "");  // 获取城市名
                                    switch2AreaNode(cityResult.adcode);
                                    positionStore.changeCityName(cityName);
                                    positionStore.cityCode = cityResult.adcode;
                                } else {
                                    console.error('获取城市信息失败', cityResult.info);
                                    ElMessage.error('定位失败');
                                    switch2AreaNode('110000');
                                    positionStore.cityCode = '110000';
                                }
                            });
                            positionStore.changeLatitude(result.position.lat);
                            positionStore.changeLongitude(result.position.lng);
                        } else {
                            ElMessage.error('定位失败');
                            switch2AreaNode('110000');
                            positionStore.cityCode = '110000';
                        }
                    });
                }
                movePosition();
                button.onclick = movePosition;
            });

            districtExplorer.on('featureClick', (e, feature) => {
                const props = feature.properties;
                switch2AreaNode(props.adcode);
            });

            districtExplorer.on('outsideClick', (e) => {
                districtExplorer.locatePosition(e.originalEvent.lnglat, (error, routeFeatures) => {
                    if (routeFeatures && routeFeatures.length > 1) {
                        switch2AreaNode(routeFeatures[1].properties.adcode);
                    } else {
                        switch2AreaNode(100000);
                    }
                }, { levelLimit: 2 });
            });

            // 初始化区域
            function switch2AreaNode(adcode) {
                if (currentAreaNode && ('' + currentAreaNode.getAdcode() === '' + adcode)) return;

                loadAreaNode(adcode, (error, areaNode) => {
                    if (error) return;
                    positionStore.currentCode = adcode;
                    currentAreaNode = areaNode;
                    districtExplorer.setAreaNodesForLocating([currentAreaNode]);
                    renderAreaPolygons(areaNode);
                });

                loading.value = false;
            }

            function loadAreaNode(adcode, callback) {
                districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
                    if (error) return;
                    if (callback) callback(null, areaNode);
                });
            }

            function renderAreaPolygons(areaNode) {
                map.setBounds(areaNode.getBounds(), null, null, true);
                districtExplorer.clearFeaturePolygons();
                districtExplorer.renderSubFeatures(areaNode, (feature, i) => {
                    const fillColor = colors[i % colors.length];
                    const strokeColor = colors[colors.length - 1 - i % colors.length];
                    return {
                        cursor: 'default',
                        bubble: true,
                        strokeColor: strokeColor,
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        fillColor: fillColor,
                        fillOpacity: 0.35,
                    };
                });
                districtExplorer.renderParentFeature(areaNode, {
                    cursor: 'default',
                    bubble: true,
                    strokeColor: 'black',
                    strokeOpacity: 1,
                    strokeWeight: 1,
                    fillColor: areaNode.getSubFeatures().length ? null : colors[0],
                    fillOpacity: 0.35
                });
            }// 加载全国地图

            watch(() => positionStore.firstPoint, () => { // 筛选标点后调整视野
                if (positionStore.firstPoint != {}) switch2AreaNode(positionStore.firstPoint.area);
            })
        });

        watch(() => positionStore.cityCode, () => { // 用户所在城市的非遗项目标点
            if (!positionStore.cityCode) return;
            getFromAdcodeApi(positionStore.cityCode).then(res => {
                heritageData.value = res.data.data.filter(item => item.lng != null && item.lat != null).map(item => [item.lng, item.lat]);
                pointSimplifierIns.setData(heritageData.value);
            });
        })
        watch(ifViewPoints, () => { // 显示筛选标点
            if (ifViewPoints.value) {
                var data = selectHeritage.value.filter(item => item.lng != null && item.lat != null).map(item => [item.lng, item.lat]);
                pointSimplifierIns.setData();
                data.forEach((position, index) => {
                    var text = new AMap.Text({
                        text: (index + 1).toString(), // 显示索引
                        position: position, // 设置位置
                        offset: new AMap.Pixel(0, 0), // 调整偏移量
                        zIndex: 3,
                        style: {
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: 'white',
                            lineHeight: '15px',
                            textAlign: 'center',
                            backgroundColor: '#ff5722', // 圆形背景颜色
                            borderRadius: '50%', // 让背景变成圆形
                            padding: '5px',
                            width: '15px',  // 设置宽高为相同值，使其为圆形
                            height: '15px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 0 3px rgba(0,0,0,0.5)', // 可选：添加阴影
                        }
                    });
                    text.setMap(map);
                });
            }
        })

        watch(ifRefresh, () => { // 重置
            if (ifRefresh.value) {
                pointSimplifierIns.setData(heritageData.value);
                map.getAllOverlays().forEach(overlay => {
                    if (overlay instanceof AMap.Text) {
                        overlay.setMap(null);
                    }
                });
                ifViewPoints.value = false;
            }
        })
    });
});
</script>

<style scoped>
#container {
    width: 100%;
    aspect-ratio: 1 / 1;
}

:deep(.amap-e) {
    z-index: 999 !important;
}

.dialog {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 170;
    background-color: rgb(255, 255, 255);
}

.collapse-box {
    padding-top: 15px;
    border: none;
}

:deep(.el-collapse-item__header) {
    border: none;
}

.custom-collapse-title {
    width: 100%;
    line-height: 32px;
    border-radius: 7px;
    font-size: 18px;
    border-width: 1px;
    border-style: solid;
}

.el-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

:deep(.el-checkbox-button__inner) {
    border: none !important;
    border-radius: 7px;
}

.el-checkbox-button {
    text-align: center;
    border-bottom: solid 1px rgba(0, 0, 0, 0.2);
}

:deep(.el-collapse-item__wrap) {
    overflow: visible;
}

.bottom-box {
    width: 100%;
    position: absolute;
    margin-top: 10px;
    display: flex;
    align-items: flex-start;
    gap: 5vw;
}

.refresh {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 25px;
}

.viewPoints {
    width: 60vw;
    padding: 5px 40px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 10px;
    right: -25vw;
    border-radius: 3px;
    background-image: url("/icon/viewPoints.png");
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
}

.svgPoints {
    background-color: rgba(217, 217, 217, 1);
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-dialog-header {
    padding: 5px;
    display: flex;
    justify-content: space-between;
}

.custom-title {
    position: relative;
    right: -45vw;
    font-size: 20px;
}

.demo-tabs {
    height: 270px;
    overflow: hidden;
}

.btn-position {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    bottom: 20px;
    opacity: 0.8;
}

.btn {
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
}

:deep(.amap-geolocation-con) {
    z-index: 10 !important;
}


.btn-position div {
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    width: 98px;
}

.select {
    width: 113px;
    height: 40px;
    position: absolute;
    right: 20px;
    bottom: 20px;
    font-size: 14px;
    color: rgba(0, 0, 0, 1);
    border-radius: 20px;
    opacity: 0.8;
    background-color: rgba(255, 226, 184);
    box-shadow: 0px 3px 9px 0px rgba(0, 0, 0, 0.15);
}

.select svg {
    position: absolute;
    top: -10px;
    left: 0;
}

.select span {
    position: absolute;
    top: 10px;
    left: 35px;
}
</style>