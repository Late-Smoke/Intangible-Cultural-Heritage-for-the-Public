<script setup>
import { ref ,watch} from 'vue';
import { useActivityStore } from '@/stores/user';
const activityStore = useActivityStore();
const visible = ref(false);

const currentYear = new Date().getFullYear();

const monthOptions = [
  { label: '1月', value: 1 },
  { label: '2月', value: 2 },
  { label: '3月', value: 3 },
  { label: '4月', value: 4 },
  { label: '5月', value: 5 },
  { label: '6月', value: 6 },
  { label: '7月', value: 7 },
  { label: '8月', value: 8 },
  { label: '9月', value: 9 },
  { label: '10月', value: 10 },
  { label: '11月', value: 11 },
  { label: '12月', value: 12 }
];
const selectMonth = ref(new Date().getMonth() + 1);  // 默认选择当前月份

const today = new Date();
today.setHours(0, 0, 0, 0);  // 确保只包含日期部分
const selectedRange = ref({ start: today, end: today });

const time = ref('全部时间');

function clickAllTime() {
  visible.value = false;
  activityStore.startTime = '';
  activityStore.endTime = '';
  time.value = '全部时间';
}

const calendarGrid = ref([]);
const weekdays = ['一', '二', '三', '四', '五', '六', '日'];
const generateDates = (month) => {
  const firstDay = new Date(currentYear, month - 1, 1); // 本月的第一天
  const lastDay = new Date(currentYear, month, 0); // 本月的最后一天
  const daysInMonth = lastDay.getDate();
  const grid = [];
  let row = [];

  const firstDayOfWeek = firstDay.getDay() === 0 ? 7 : firstDay.getDay(); // 计算本月第一天是星期几

  // 填充空白日期
  for (let i = 1; i < firstDayOfWeek; i++) {
    row.push({ date: null }); // 空白日期
  }

  // 填充当月日期
  for (let i = 1; i <= daysInMonth; i++) {
    row.push({ date: new Date(currentYear, month - 1, i) });
    if (row.length === 7) { // 一周7天
      grid.push(row);
      row = [];
    }
  }

  if (row.length) { // 如果最后一周不满7天，补充空白
    while (row.length < 7) {
      row.push({ date: null });
    }
    grid.push(row);
  }

  return grid;
};
const onMonthChange = (month) => {
  calendarGrid.value = generateDates(month);
};
const isDisabled = (day) => {
  return !day.date || day.date.getTime() < new Date().setHours(0, 0, 0, 0); // 禁用过去日期
};
const isSelected = (day) => {
  if (!day.date) return false;

  const startValid = selectedRange.value.start && selectedRange.value.start instanceof Date;
  const endValid = selectedRange.value.end && selectedRange.value.end instanceof Date;

  return (startValid && selectedRange.value.start.getTime() === day.date.getTime()) ||
    (endValid && selectedRange.value.end.getTime() === day.date.getTime());
};

const selectDate = (day) => {
  if (isDisabled(day)) return;
  if (day.date.getTime() === selectedRange.value.start.getTime()) selectedRange.value.end = day.date;
  else if (day.date.getTime() === selectedRange.value.end.getTime()) selectedRange.value.start = day.date;
  else if ((day.date.getTime() < selectedRange.value.start.getTime()) ||
    (day.date.getTime() > selectedRange.value.start.getTime() && day.date.getTime() < selectedRange.value.end.getTime())) {
    selectedRange.value.start = day.date;
  } else {
    selectedRange.value.end = day.date;
  }
};

function initTime(data,k){
  if(k){
    const formattedDate = moment(`${2025}-${data} 00:00`, 'YYYY-M-D HH:mm').format('YYYY-MM-DDTHH:mm');
    return formattedDate+':00';
  } else {
    const formattedDate = moment(`${2025}-${data} 23:59`, 'YYYY-M-D HH:mm').format('YYYY-MM-DDTHH:mm');
    return formattedDate+':59';
  }
}
const confirmSelection = () => {
  if (selectedRange.value.start && selectedRange.value.end) {
    if (selectedRange.value.start === selectedRange.value.end) {
      time.value = selectedRange.value.start.getMonth() + 1 + '-' + selectedRange.value.start.getDate();
      activityStore.startTime = initTime(time.value,1);
      activityStore.endTime = initTime(time.value,0);
    }
    else {
      const start = (selectedRange.value.start.getMonth() + 1) + '-' + selectedRange.value.start.getDate();
      const end = (selectedRange.value.end.getMonth() + 1) + '-' + selectedRange.value.end.getDate();
      time.value = start + '至' + end;
      activityStore.startTime = initTime(start,1);
      activityStore.endTime = initTime(end,0);
    }
    visible.value = false; // 隐藏弹窗
  }
};
calendarGrid.value = generateDates(selectMonth.value);

</script>

<template>
  <div class="date-picker-container">
    <el-popover popper-class="calendar-popover" :show-arrow="false" :visible="visible" placement="bottom" :width="300">
      <div class="calendar-top">
        <el-button class="top-btn" size="small" type="primary" @click=clickAllTime()>全部时间</el-button>
        <span>{{ currentYear }}年</span>
        <el-select class="select-month" suffix-icon="CaretBottom" v-model="selectMonth" placeholder="选择月份" size="small"
          style="width: 55px" @change="onMonthChange">
          <el-option class="month-option" v-for="item in monthOptions" :key="item.value" :label="item.label"
            :value="item.value" />
        </el-select>
      </div>
      <div class="calendar-content">
        <div class="dates">
          <div class="weekdays">
            <div v-for="day in weekdays" :key="day" class="weekday">{{ day }}</div>
          </div>
          <div v-for="(row, index) in calendarGrid" :key="index" class="calendar-row">
            <div v-for="day in row" :key="day.date" class="date-cell"
              :class="['date', { selected: isSelected(day) && !isDisabled(day), disabled: isDisabled(day) }]"
              @click="selectDate(day)">
              <div v-if="day.date">{{ day.date.getDate() }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="calendar-bottom">
        <el-button size="default" type="primary" @click="confirmSelection"
          :disabled="!selectedRange.start || !selectedRange.end">
          确 定
        </el-button>
      </div>

      <template #reference>
        <div class="btn">
          <el-button :class="['time-btn', { 'time-btn-click': visible }]" text @click="visible = true">{{
            time }}</el-button>
          <svg v-if="!visible" class="timeIcon" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12.0008 14.58L17 10" stroke="#0A090B" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 14L11.9992 9.42L7 14" stroke="#AA8C4C" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.position-btn,
.time-btn {
  font-size: 18px;
  color: #000000;
  padding-right: 0px;
}

.time-btn-click {
  color: #D5B282;
}

/*calendar-top*/
.calendar-top {
  font-size: 15px;
  color: #000;
  display: flex;
  justify-content: space-evenly;
}

.top-btn,
:deep(.select-month .el-select__wrapper) {
  font-size: 15px;
  color: #000;
  background-color: #F0E4D4;
  border-radius: 4px;
  border: none;
  box-shadow: none;
  padding: 0 5px;
}

:deep(.select-month .el-select__placeholder) {
  color: #000;
  padding-left: 3px;
}

.month-option {
  box-shadow: none;
}

/*calendar-content*/
.dates {
  margin-top: 10px;
  display: grid;
  font-size: 14px;
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  color: #000000A6;
  text-align: center;
  font-family: 'Noto Sans SC';
}

.calendar-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-family: 'Roboto';
  color: #000000A6;
}

.date-cell {
  padding: 5px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 5px;
  background-color: #fff;
  transition: background-color 0.2s;
}

.selected div {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  background-color: #D5B282;
  color: white;
}

.disabled {
  color: #00000040;
  cursor: not-allowed;
}

.calendar-bottom {
  display: flex;
  justify-content: center;
}

.calendar-bottom .el-button {
  font-size: 16px;
  width: 270px;
  border-radius: 8px;
  background-color: #F0E4D4;
  color: #000;
  border: none;
  box-shadow: none;
}
</style>