<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute()

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="mainPageView,searchView,home">
      <component :is="Component" v-if="route.name == 'userHome'" :key="route.params.id" />
      <component :is="Component" v-else />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
