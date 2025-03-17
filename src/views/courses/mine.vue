<template>
    <SvgBackgroundFan />
    <PageHeader title="我的课程" />

    <CourseListItem v-for="course in courses" :course="course" action="progress" />
</template>

<script setup lang="ts">
import * as Courses from '@/axios/api/courses';
import CourseListItem from '@/components/courses/CourseListItem.vue';
import { onMounted } from 'vue';
import { ref } from 'vue';
import PageHeader from '@/components/slot/PageHeader.vue';
import SvgBackgroundFan from '@/components/slot/SvgBackgroundFan.vue';

const courses = ref<Courses.Course[]>()

onMounted(() => {
    Courses.getSelfCourses().then(r => courses.value = r.data.data)
})
</script>

<style scoped lang="scss"></style>
