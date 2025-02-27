<template>
  <div class="mapWrapper">
    <el-button class="back-map" type="primary" @click="goBack">返回上级</el-button>
    <div ref="mapChartRef" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const mapChartRef = ref();
const initChinaMap = ref();
const initAdCode = ref(100000); // 默认中国地图的编码
const currentMapName = ref("中国"); // 默认地图的名称
const mapList = ref([]); // 当前展示的省市区所有数据
const historyInfo = ref([]); // 记录历史点击的省市区，用于返回查询

// 获取地图数据
const getMapData = async (code) => {
  const data = await axios
    .get(`https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`)
    .then((res) => {
      mapList.value = [];
      if (res.status === 200) {
        // 获取当前选中的省市区的所有名称和编码
        res.data.features.forEach((item) => {
          mapList.value.push(item.properties);
        });
        renderChart(currentMapName.value, res.data);
      }
    })
    .catch(() => {});
  return data;
};

// 渲染地图
const renderChart = (mapName, mapData) => {
  // 注册地图
  echarts.registerMap(mapName, mapData);

  // 地图配置项
  const option = {
    tooltip: {
      show: true,
      trigger: "item",
      backgroundColor: "#0C121C",
      textStyle: {
        color: "#DADADA",
      },
      formatter: (params) => params.name,
    },
    series: [
      {
        type: "map",
        map: mapName, // 地图名称
        data: [],
        zoom: 1.1, // 固定缩放比例
        label: {
          show: true,
          fontSize: 8,
          color: "#fff",
          formatter: (params) => params.name.slice(0, 3),
        },
        roam: true, // 开启缩放和平移
        itemStyle: {
          borderColor: "#d6cec1",
          borderWidth: 0.2,
          areaColor: "rgba(255, 255, 255, 0.2)",
        },
        emphasis: {
          itemStyle: {
            borderColor: "#34AEAE",
            areaColor: "#CCEBEB",
          },
        },
      },
    ],
  };

  // 渲染
  initChinaMap.value.setOption(option);

  // 防止多次触发click事件，重要！！！
  initChinaMap.value.off("click");

  // 下钻逻辑
  initChinaMap.value.on("click", (params) => {
    const activeItem = mapList.value.find((item) => item.name == params.name);
    if (activeItem && activeItem.adcode && activeItem.childrenNum) {
      historyInfo.value.push(activeItem);
      currentMapName.value = params.name;
      initChinaMap.value.setOption({
        series: [
          {
            type: "map",
            zoom: 1.1, // 重置缩放级别
            center: null, // 重置中心位置
          },
        ],
      });
      getMapData(activeItem.adcode);
    }
  });
};


onMounted(() => {
  initChinaMap.value = echarts.init(mapChartRef.value);
  getMapData(initAdCode.value);
});

// 返回上一级
const goBack = () => {
  const lastItem = historyInfo.value.pop();
  if (lastItem && lastItem.parent && lastItem.parent.adcode) {
    initChinaMap.value.setOption({
        series: [
          {
            type: "map",
            zoom: 1.1, // 重置缩放级别
            center: null, // 重置中心位置
          },
        ],
      });
    getMapData(lastItem.parent.adcode);
  }
};
</script>

<style scoped>
.mapWrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.back-map {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(254, 234, 162, 0.5);
  border: none;
  z-index: 999;
}
</style>
