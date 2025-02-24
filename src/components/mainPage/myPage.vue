<script setup lang="ts">
import { ref } from 'vue'
import * as Self from '@/axios/api/self'
import { onMounted } from 'vue';
const myInfo = ref<Self.Self>(null)

onMounted(() => {
    Self.getSelf().then(r => {
        myInfo.value = r.data.data
    })
})
</script>

<template>
    <div>
        {{ JSON.stringify(myInfo) }}
    </div>
</template>


<style scoped></style>