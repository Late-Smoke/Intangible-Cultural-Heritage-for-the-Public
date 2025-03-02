<template>
  <div id="outer-box">
    <div id="container" tabindex="0"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePositionStore } from '@/stores/user';

// 地图对象
const positionStore = usePositionStore();
const latitude = positionStore.latitude;
const longitude = positionStore.longitude;
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

onMounted(() => {
  map = new AMap.Map('container', {
    touchZoom: true,
    resizeEnable: true
  });


  AMapUI.load(['ui/geo/DistrictExplorer', 'lib/$'], (DistrictExplorer, $) => {
    districtExplorer = new DistrictExplorer({
      eventSupport: true, // 开启事件支持
      map: map
    });

    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,  // 是否使用高精度定位，默认:true
        timeout: 10000,            // 超过10秒后停止定位，默认：5s
        buttonPosition: 'LB',      // 定位按钮的停靠位置
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量
        zoomToAccuracy: true,      // 定位成功后是否自动调整地图视野到定位点
        showCircle: false          // 定位成功后用圆圈表示定位精度范围
      });

      map.addControl(geolocation);

      const clickLocation = () => {

        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            // 定位成功，获取经纬度
            var position = result.position;
            // 获取定位城市并设置地图
            getCityFromPosition(position);
          } else {
            onError(result);
          }
        });
      }
      clickLocation();
      // 通过经纬度获取城市信息并设置地图
      function getCityFromPosition(_position) {
        AMap.plugin('AMap.Geolocation', function () {
          var geolocation = new AMap.Geolocation();
          geolocation.getCityInfo(function (status, cityResult) {
            if (status === 'complete') {
              //var cityName = cityResult.city;  // 获取城市名
              switch2AreaNode(cityResult.adcode);
              //map.setCity(cityName);  // 设置地图中心为该城市
            } else {
              console.error('获取城市信息失败', cityResult.info);
            }
          });
        });
      }

      // 定义定位失败的回调函数
      function onError(data) {
        console.error('定位失败', data);
      }
    });

    // 鼠标hover提示
    const $tipMarkerContent = $('<div class="tipMarker top"></div>');
    const tipMarker = new AMap.Marker({
      content: $tipMarkerContent.get(0),
      offset: new AMap.Pixel(0, 0),
      bubble: true
    });

    // 鼠标hover事件
    function toggleHoverFeature(feature, isHover, position) {
      tipMarker.setMap(isHover ? map : null);
      if (!feature) return;

      const props = feature.properties;
      if (isHover) {
        $tipMarkerContent.html(props.adcode + ': ' + props.name);
        tipMarker.setPosition(position || props.center);
      }

      $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').toggleClass('hover', isHover);
      const polys = districtExplorer.findFeaturePolygonsByAdcode(props.adcode);
      polys.forEach(poly => {
        poly.setOptions({
          fillOpacity: isHover ? 0.5 : 0.2
        });
      });
    }

    // 监听鼠标事件
    districtExplorer.on('featureMouseout featureMouseover', (e, feature) => {
      toggleHoverFeature(feature, e.type === 'featureMouseover', e.originalEvent ? e.originalEvent.lnglat : null);
    });

    districtExplorer.on('featureMousemove', (e, feature) => {
      tipMarker.setPosition(e.originalEvent.lnglat);
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

        renderAreaPanel(areaNode);
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

    function renderAreaPanelNode(ele, props, color) {
      const $box = $('<li/>').addClass('lv_' + props.level);
      const $h2 = $('<h2/>').addClass('lv_' + props.level).attr({
        'data-adcode': props.adcode,
        'data-level': props.level,
        'data-children-num': props.childrenNum || void 0,
        'data-center': props.center.join(','),
      }).html(props.name).appendTo($box);

      if (color) {
        $h2.css('borderColor', color);
      }

      if (props.childrenNum > 0) {
        $('<div class="showHideBtn"></div>').appendTo($box);
        $('<ul/>').addClass('sublist lv_' + props.level).appendTo($box);
        $('<div class="clear"></div>').appendTo($box);

        if (props.level !== 'country') {
          $box.addClass('hide-sub');
        }
      }

      $box.appendTo(ele);
    }

    function renderAreaPanel(areaNode) {
      const props = areaNode.getProps();
      let $subBox = $('#area-tree').find('h2[data-adcode="' + props.adcode + '"]').siblings('ul.sublist');

      if (!$subBox.length && props.childrenNum) {
        renderAreaPanelNode($('#area-tree'), props);
        $subBox = $('#area-tree').find('ul.sublist');
      }

      if ($subBox.attr('data-loaded') === 'rendered') return;
      $subBox.attr('data-loaded', 'rendered');

      const subFeatures = areaNode.getSubFeatures();
      subFeatures.forEach((subFeature, i) => {
        renderAreaPanelNode($subBox, areaNode.getPropsOfFeature(subFeature), colors[i % colors.length]);
      });
    }

    switch2AreaNode(100000); // 加载全国地图
  });

  //缩放组件
  AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {

    map.addControl(new BasicControl.Zoom({
      position: 'lt', //left top，左上角
      showZoomNum: false //显示zoom值
    }));
  });

  //   AMapUI.loadUI(['misc/PointSimplifier'], function (PointSimplifier) {

  //     if (!PointSimplifier.supportCanvas) {
  //       alert('当前环境不支持 Canvas！');
  //       return;
  //     }

  //     //启动页面
  //     initPage(PointSimplifier);
  //   });

  //   function initPage(PointSimplifier) {
  //     //创建组件实例
  //     var pointSimplifierIns = new PointSimplifier({
  //       map: map, //关联的map
  //       compareDataItem: function (a, b, aIndex, bIndex) {
  //         //数据源中靠后的元素优先，index大的排到前面去
  //         return aIndex > bIndex ? -1 : 1;
  //       },
  //       getPosition: function (dataItem) {
  //         //返回数据项的经纬度，AMap.LngLat实例或者经纬度数组
  //         return dataItem;
  //       },
  //       getHoverTitle: function (dataItem, idx) {
  //         //返回数据项的Title信息，鼠标hover时显示
  //         return '序号: ' + idx;
  //       },
  //       renderOptions: {
  //         //点的样式
  //         pointStyle: {
  //           fillStyle: 'blue' //蓝色填充
  //         }
  //       }
  //     });

  // // 初始化函数
  // initPage();

  //     //设置数据源，data需要是一个数组
  //     pointSimplifierIns.setData(data);
});
</script>

<style scoped>
#container {
  width: 100%;
  aspect-ratio: 1 / 1;
}
</style>