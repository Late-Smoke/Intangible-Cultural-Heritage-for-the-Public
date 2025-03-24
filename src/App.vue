<script setup lang="ts">
import { watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

watch(() => route.name, () => {
  if (!history.state.forward) {
    // console.log('Scroll to top:', route)
    scrollTo({ top: 0 })
  }
})

</script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive include="mainPageView,searchView,home,history,user">
      <component :is="Component" :key="route.name == 'userHome' ? route.params.id : undefined" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
