<template>
  <div id="outer-box">
    <div id="container" tabindex="0">
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
    <div class="select">
      <svg width="37" height="43" viewBox="0 0 37 43" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M35.5252 0H1.4728C0.339575 0 -0.368115 1.60349 0.200812 2.88268L10.9595 26.6288V41.0782C10.9595 42.1412 11.6164 43 12.4304 43H24.5675C25.3816 43 26.0384 42.1412 26.0384 41.0782V26.6288L36.8018 2.88268C37.3661 1.60349 36.6584 0 35.5252 0ZM22.7266 38.676H14.2714V29.3073H22.7313V38.676H22.7266ZM23.1707 24.4668L22.7313 25.4637H14.2667L13.8273 24.4668L4.6551 4.32402H32.3429L23.1707 24.4668Z"
          fill="#8C7831" />
        <path d="M22.9655 39.1409H14.0345V28.6665H22.9655V39.1409Z" fill="#FFF1E3" stroke="#8C7831" />
        <path d="M22.9655 25.9102H14.0345L3.82758 3.85889H33.1724L22.9655 25.9102Z" fill="#FFF1E3" stroke="#8C7831" />
      </svg>
      <span>筛选标点</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { usePositionStore } from '@/stores/user';
import heritageData from '@/components/mainPage/homePage/heritage.json';
import { getFromAdcodeApi } from '@/axios/api/mainPage';

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

const allData = ref([]);
allData.value = heritageData;
onMounted(() => {
  const button = document.getElementsByClassName('btn-position')[0];
  map = new AMap.Map('container', {
    touchZoom: true,
    resizeEnable: true
  });

  AMapUI.loadUI(['misc/PointSimplifier'], function (PointSimplifier) { //点标记

    if (!PointSimplifier.supportCanvas) {
      alert('当前环境不支持 Canvas!');
      return;
    }
    initPage(PointSimplifier);
  });

  function initPage(PointSimplifier) {
    //创建组件实例
    var pointSimplifierIns = new PointSimplifier({
      map: map, //关联的map
      compareDataItem: function (a, b, aIndex, bIndex) {
        //数据源中靠后的元素优先，index大的排到前面去
        return aIndex > bIndex ? -1 : 1;
      },
      getPosition: function (dataItem) {
        //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
        return [dataItem.lng, dataItem.lat];
      },
      getHoverTitle: function (dataItem, idx) {
        //返回数据项的Title信息，鼠标hover时显示
        return '序号: ' + idx;
      },
      renderOptions: {
        //点的样式
        pointStyle: {
          width:6,
          height:6,
          content: 'circle',
          fillStyle: 'rgba(159, 125, 90, 0.5)', // 填充色为半透明
          strokeStyle: 'rgba(159, 125, 90, 1)', // 边框色为不透明
          strokeWeight: 1,// 边框宽度
        },

        pointHardcoreStyle: {
          width: 10,
          height: 10,
          content: 'circle',
          strokeStyle: '#FF8D00', // 边框色为不透明
        }
      }
    });
    pointSimplifierIns.setData(allData.value);
    //movePosition();


    //监听事件
    pointSimplifierIns.on('pointClick pointMouseover pointMouseout', function (e, record) {
      console.log(e.type, record);
    });
  }

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
        buttonDom: button,
      });

      map.addControl(geolocation);

      function movePosition() {
        console.log('clickLocation');
        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            // 获取定位城市
            geolocation.getCityInfo(function (status, cityResult) {
              if (status === 'complete') {
                var cityName = cityResult.city.replace(/市$/, "");  // 获取城市名
                positionStore.changeCityName(cityName);
                switch2AreaNode(cityResult.adcode);
              } else {
                console.error('获取城市信息失败', cityResult.info);
              }
            });
            positionStore.changeLatitude(result.position.lat);
            positionStore.changeLongitude(result.position.lng);
          } else {
            ElMessage.error('定位失败');
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

        currentAreaNode = areaNode;
        districtExplorer.setAreaNodesForLocating([currentAreaNode]);
        renderAreaPolygons(areaNode);
      });
    }

    function loadAreaNode(adcode, callback) {
      districtExplorer.loadAreaNode(adcode, (error, areaNode) => {
        if (error) return;

        //renderAreaPanel(areaNode);
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
          fillOpacity: 0.35
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
    }

    switch2AreaNode(100000); // 加载全国地图

    function loadData() {
      allData.value = heritageData;
    }
  });

});
</script>

<style scoped>
#container {
  width: 100%;
  aspect-ratio: 1 / 1;
}

.btn-position {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  bottom: -15px;
  opacity: 0.8;
}

.btn {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
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