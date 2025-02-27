<script setup>
import { ref , onMounted } from 'vue';
import { usePositionStore } from '@/stores/user';
const positionStore = usePositionStore();
const latitude = ref(positionStore.latitude);
const longitude = ref(positionStore.longitude);
const errorMessage = ref('');

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // 成功获取位置信息
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
        errorMessage.value = '';
        positionStore.changeLatitude(latitude.value);
        positionStore.changeLongitude(longitude.value);
      },
      (error) => {
        // 处理错误情况
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage.value = '用户拒绝了地理定位请求。';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage.value = '位置信息不可用。';
            break;
          case error.TIMEOUT:
            errorMessage.value = '请求用户位置超时。';
            break;
          case error.UNKNOWN_ERROR:
            errorMessage.value = '发生未知错误。';
            break;
        }
        latitude.value = null;
        longitude.value = null;
      }
    );
  } 
  else {
    errorMessage.value = '该浏览器不支持地理定位。';
  }
};

onMounted(() => {
  getLocation();
});
</script>

<template>
    <div class="box">
        <div class="title">
            <span>非遗进大众</span>
        </div>
        <div class="background">
            <div class="background-chinese">
                <span class="chinese one">中</span>
                <span class="chinese two">华</span>
                <span class="chinese three">文</span>
                <span class="chinese four">化</span>
            </div>
            <div class="background-icon">
                <div class="icon icon1">
                    <img src="/icon/lion.png" alt="">                    
                </div>
                <div class="icon icon2">
                    <img src="/icon/icon2.png" alt="">
                </div>
            </div>
        </div>
        <div class="router">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.box {
    width: 100%;
    height: 100vh;
    background-color: #EBD5BAD6;
}


/*title*/
.title {
    display: flex;
    position: relative;
    top:20%;
    flex-direction: column;
    align-items: center; 
}
.title span {
    font-family: "Alimama DaoLiTi";
    font-size: 58px;
    font-weight: 400;
    line-height: 69.37px;
    color: #FFFFFF;
    text-align: center;
    text-shadow: -1px -1px 0 #B19780, 1px -1px 0 #B19780, -1px 1px 0 #B19780, 1px 1px 0 #B19780;
    margin-bottom: 20px; /* 调整标题与登录框之间的间距 */
}

.router {
    width: auto;
    height: auto;
    position: relative;
    top: 20%;
}

/*背景文字*/
.background-chinese {
    width:200px;
    height:200px;
    color: #AF62624D;
    font-size: 150px;
    position:absolute; 
    font-family: "字魂水云行楷";
}
.chinese {
    position:absolute;
}
.one {
    top:-30%;
    left:-10%; 
}
.two {
    right: -95%;
    top: 53%;
}
.three {
    left: -20%;
    bottom: -165%;
}
.four {
    right: -85%;
    top: 235%;
}

/*背景图片*/
.icon {
    position:absolute;
    border: solid 1px #B19780;
    border-radius: 35%;
    background-color: #FFFFFF; 
    padding: 20px;
}
.icon img {
    display: block;
    width: 100%;
    height: 100%;
}
.icon1 {
    width: 101px;
    height: 103px;
    top:5%;
    left: 50%; 
    transform: translateX(-50%);
}
.icon2 {
    width: 96px;
    height: 96px;
    bottom:10%;
    left:30%; 
    transform: translateX(-50%); 
    padding: 15px;
}
</style>