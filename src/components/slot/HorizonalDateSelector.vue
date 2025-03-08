<template>
    <div class="date-selector">
        <div v-for="day in days" class="date-item" :class="{ selected: rangeIsDay(day.date) }" @click="selectDate(day.date)">
            <div class="day"> {{ day.dayLabel }} </div>
            <div class="date"> {{ day.formattedDate }} </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const timeRange = defineModel<[Date, Date] | null | undefined>({ required: true })

// Generate the next 14 days
const days = ref([...Array(14)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
        date,
        dayLabel: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()],
        formattedDate: `${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`,
    };
}));

// Handle date selection
const selectDate = (date: Date) => {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(date);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    timeRange.value = [start, end]; // Update selected range
};

function rangeIsDay(date: Date) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0); // Set time to 00:00:00

    const end = new Date(date);
    end.setHours(23, 59, 59, 999); // Set time to 23:59:59.999

    try {
        return Math.abs(timeRange.value[0].getTime() - start.getTime()) < 1000 && Math.abs(timeRange.value[1].getTime() - end.getTime()) < 1000
    } catch {
        return false
    }
}
</script>

<style scoped>
.date-selector {
    display: flex;
    gap: 8px;
    overflow: auto;
    padding: 8px;
}

.date-item {
    text-align: center;
    padding: 4px 8px;
    border-radius: 6px;
}

.selected {
    color: white;
    background-color: var(--el-color-primary-dark-2);
}

.day {
    margin: 4px;
    white-space: nowrap;
}

.date {
    margin: 4px;
    font-size: 0.8em;
    white-space: nowrap;
}
</style>
