<script setup>

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="mainPageView">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped>

</style>
