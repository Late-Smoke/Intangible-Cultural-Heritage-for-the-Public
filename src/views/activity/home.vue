<template>
    <div class="header">
        <el-dropdown placement="bottom-start" size="large" trigger="click" style="margin: 8px;">
            <div class="flex-center" style="gap: 4px; font-size: 1.25em; white-space: nowrap;">
                {{ region }}
                <el-icon>
                    <arrow-down />
                </el-icon>
            </div>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="region = '全国'">全国</el-dropdown-item>
                    <el-dropdown-item @click="region = '本地'">本地</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>

        <el-input size="large" placeholder="搜索展览、活动" prefix-icon="Search" />
    </div>

    <el-carousel trigger="click" height="30vh">
        <template v-if="nearActivities">
            <el-carousel-item v-for="item in nearActivities">
                <img v-if="item.acmedias.length" :src="item.acmedias[0].url">
                <div v-else>{{ item.title }}</div>
            </el-carousel-item>
        </template>
    </el-carousel>

    <el-select v-model="timeRangeOption" style="margin: 8px; width: 150px; display: block;">
        <el-option label="全部时间" :value="timeRangeOptions.all" />
        <el-option label="指定日期" :value="timeRangeOptions.day" />
        <el-option label="时间范围" :value="timeRangeOptions.range" />
    </el-select>

    <HorizonalDateSelector v-if="timeRangeOption == timeRangeOptions.day" v-model="timeRange"></HorizonalDateSelector>

    <OverlayCard v-show="timeRangePicker.show" title="选择时间范围" card-height="100vh" :close-action="() => timeRangePicker.show = false">
        <div style="display: flex; flex-direction: column; gap: 8px; padding: 8px;">
            <div>开始时间: <el-date-picker type="datetime" v-model="timeRangePicker.start" /></div>
            <div>结束时间: <el-date-picker type="datetime" v-model="timeRangePicker.end" /></div>

            <div style="display: flex; justify-content: center;">
                <el-button @click="timeRangePicker.show = false">取消</el-button>
                <el-button type="primary" @click="timeRangePicker.apply()">确定</el-button>
            </div>
        </div>
    </OverlayCard>

    <div v-if="timeRangeOption == timeRangeOptions.range && timeRange" style="margin: 8px;">
        <span style="font-size: 0.8em; vertical-align: middle;">{{ timeRange.at(0)?.toLocaleString() }} - {{ timeRange.at(1)?.toLocaleString() }} </span>
        <el-button text type="primary" size="small" @click="timeRangePicker.show = true">选择</el-button>
    </div>

    <div class="type1-select flex-center">
        <div :class="{ selected: searchOptions.secondType == undefined }" @click="searchOptions.secondType = undefined">全部类型</div>
        <div :class="{ selected: searchOptions.secondType == '非遗展览' }" @click="searchOptions.secondType = '非遗展览'">非遗展览</div>
        <div :class="{ selected: searchOptions.secondType == '非遗活动' }" @click="searchOptions.secondType = '非遗活动'">非遗活动</div>
    </div>

    <div class="type2-select flex-center">
        <div :class="{ selected: searchOptions.firstType == '线上' }" @click="searchOptions.firstType = '线上'">仅看线上</div>
        <div :class="{ selected: searchOptions.firstType == '线下' }" @click="searchOptions.firstType = '线下'">仅看线下</div>
    </div>

    <template v-if="activities">
        <div class="activity-card" v-for="item in activities" @click="router.push({ name: 'activityDetail', params: { id: item.id } })">
            <img class="img" v-if="item.acmedias.length" :src="item.acmedias[0].url">
            <div class="img" v-else>{{ item.title }}</div>

            <div>
                <div class="title">
                    <span>{{ }}</span>
                    {{ item.title }}
                </div>

                <div class="tags" v-if="item.tag">
                    <span v-for="tag in item.tag.split(' ')">{{ tag }}</span>
                </div>

                <div class="open-time">
                    <div>开放时间:</div>
                    {{ parseDate(item.startTime).toLocaleString() }} - {{ parseDate(item.endTime).toLocaleString() }}
                </div>

                <div class="bottom">
                    <div class="price">￥ {{ item.chargeAmount }}</div>
                    <div class="favs">{{ item.favoritesNumber }}人收藏</div>
                </div>
            </div>
        </div>
    </template>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import * as Activity from '@/axios/api/activity'
import { watch } from 'vue'
import * as ExampleData from '@/axios/example-data'
import HorizonalDateSelector from '@/components/slot/HorizonalDateSelector.vue'
import OverlayCard from '@/components/slot/OverlayCard.vue'
import router from '@/router'
import { parseDate } from '@/utils'

const region = ref('全国')

enum timeRangeOptions { all, day, range }
const timeRangeOption = ref(timeRangeOptions.all)
const timeRange = ref<[Date, Date]>()

const timeRangePicker = reactive({
    show: false,
    start: new Date(),
    end: new Date(),
    apply() {
        timeRange.value = [timeRangePicker.start, timeRangePicker.end]
        timeRangeOption.value = timeRangeOptions.range
        nextTick(() => timeRangePicker.show = false)
    },
})

watch(timeRangeOption, (newValue, oldValue) => {
    if (newValue == timeRangeOptions.range && !timeRangePicker.show) {
        timeRangeOption.value = oldValue
        timeRangePicker.show = true
    }
    updateSearchOptionsTimeRange()
})

watch(timeRange, () => {
    try {
        if (!timeRangePicker.show) {
            timeRangePicker.start = timeRange.value[0]
            timeRangePicker.end = timeRange.value[1]
        }
    } catch { }
    updateSearchOptionsTimeRange()
})

function updateSearchOptionsTimeRange() {
    try {
        if (timeRangeOption.value == timeRangeOptions.all) {
            throw undefined
        } else {
            searchOptions.startTime = timeRange.value[0]
            searchOptions.endTime = timeRange.value[1]
        }
    } catch {
        searchOptions.startTime = undefined
        searchOptions.endTime = undefined
    }
}

const searchOptions = reactive<Activity.ActivitySearch>({
    // keyword: '展览',
    // province: '',
    // city: '',
    firstType: '线上',
    secondType: undefined,
    startTime: undefined,
    endTime: undefined,
})

watch(searchOptions, loadActivities)

const activities = ref<Activity.Activity[]>()
const nearActivities = ref<Activity.Activity[]>()

function loadActivities() {
    Activity.searchActivities(searchOptions).then(r => {
        activities.value = r.data.data
    })
}
function loadNearActivities() {
    Activity.getNearActivities().then(r => {
        nearActivities.value = r.data.data
    })
}

onMounted(() => {
    loadActivities()
    loadNearActivities()
})

</script>

<style scoped lang="less">
.header {
    display: flex;
    align-items: center;
    gap: 4px;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(8px);
    z-index: 10;
}

.el-carousel {
    margin: 4px 12px 12px;
}

.el-carousel__item * {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.type1-select {
    gap: 8px;
    margin: 12px 8px;
    font-size: 0.8em;

    &>div {
        padding: 1px 4px;
        border-radius: 8px;
    }

    .selected {
        background-color: rgb(232, 224, 224);
    }
}

.type2-select {
    gap: 12px;
    margin: 8px;
    font-size: 0.9em;

    &>div {
        padding: 2px 6px;
        border-radius: 6px;
    }

    .selected {
        background-color: rgb(246, 193, 78);
        color: white;
    }
}

.activity-card {
    padding: 8px;
    display: flex;
    flex-direction: row;
    gap: 8px;

    .img {
        width: 30vw;
        height: 40vw;
        max-width: 150px;
        max-height: 200px;
        object-fit: cover;
    }

    div.img {
        padding: 8px;
        background-color: #eee;
        display: flex;
        align-items: center;
        text-align: center;
    }

    &>div:last-child {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;

        .tags {
            font-size: 0.7em;

            span {
                padding: 2px 3px;
                border-radius: 4px;
                border: 1px solid #888;
                color: #888;
                margin-right: 6px;
            }
        }

        .open-time {
            flex: 1;
            font-size: 0.8em;
            color: #333;
        }

        .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
                color: #f2ab12;
                font-weight: bold;
            }

            .favs {
                font-size: 0.8em;
                color: #444;
            }
        }
    }
}
</style>