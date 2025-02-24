<template>
  <div class="mapWrapper">
    <el-button type="primary" @click="goBack">返回上级</el-button>
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
  // 注册: registerMap('地图名称', 地图数据）, 地图名称须和option里面的map一致
  echarts.registerMap(mapName, mapData);

  // 地图配置项
  const option = {
    backgroundColor: {
      image: "/icon/map-background.png",
      repeat: "no-repeat",
      opacity: 0.8,
      backgroundSize: "cover" 
    },
    // 提示浮窗样式
    tooltip: {
      show: true,
      trigger: "item",
      alwaysShowContent: false,
      backgroundColor: "#0C121C",
      borderColor: "rgba(0, 0, 0, 0.16);",
      hideDelay: 100,
      triggerOn: "mousemove",
      enterable: true,
      textStyle: {
        color: "#DADADA",
      },
      showDelay: 100,
      formatter: (params) => {
        return params.name;
      },
    },
    series: [
      {
        type: "map",
        map: mapName, // 地图名称
        data: [],
        zoom: "1.1", // 当前视角的缩放比例
        label: {
          show: true, // 是否显示省份名字
          fontSize: 8,
          color: "#fff",
          formatter: (params) => {
            // 只显示标签的前三个字
            return params.name.slice(0, 3);
          },
        },
        roam: false, // 是否开启缩放和平移
        itemStyle: {
          borderColor: "#F59A23", // 边界线颜色
          borderWidth: 2, // 适当增加边界线宽度
          borderType: "solid", // 边界线类型改为实线
          areaColor: "rgba(255, 255, 255, 0.2)", // 地图区域颜色改为半透明白色
        },
        // 设置鼠标移上去高亮的样式
        emphasis: {
          itemStyle: {
            borderColor: "#34AEAE",
            areaColor: "#CCEBEB",
            borderType: "solid",
          },
        },
      },
    ],
  };

  // 渲染
  initChinaMap.value.setOption(option);

  // 防止多次触发click事件，重要！！！
  initChinaMap.value.off("click");

  // 下钻
  initChinaMap.value.on("click", (params) => {
    const activeItem = mapList.value.find((item) => item.name == params.name);
    // 判断有子级的时候才可以下钻
    if (activeItem && activeItem.adcode && activeItem.childrenNum) {
      historyInfo.value.push(activeItem);
      currentMapName.value = params.name;
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
    getMapData(lastItem.parent.adcode);
  }
};
</script>

<style scoped>
.mapWrapper {
  width: 100%;
  height: 30%;
  padding: 10px;
  border: 1px dashed orange;
}
</style>
