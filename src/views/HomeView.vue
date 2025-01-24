<script setup>
import Map from '../components/Map.vue';
</script>

<template>
  <div class="container">
    <div class="map">
      <Map />
    </div>
    <div class="title">
      <h1>北京</h1>
    </div>
  </div>
</template>

<style scoped>

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.map {
  width: 400px;
  height: 400px;
  position: relative;
  top: 100px;
  margin-bottom: 20px; /* 添加底部间隔 */
}

.title {
  display: flex;
  width: 150px;
  height: 100px;
  background-color: rgb(156, 150, 150);
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 20px;

}

.title h1 {
  color: white;
  font-size: 30px;
}

</style>
