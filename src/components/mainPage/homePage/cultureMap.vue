<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import heritageCode from '@/components/mainPage/homePage/pca-code.json'
import artistCode from '@/components/mainPage/homePage/pca-code.json'
import { usePositionStore } from '@/stores/user';
import { getLocationActivityApi, getLocationPostApi, getArtistApi, getFromAdcodeApi } from '@/axios/api/mainPage';
import PostListItem from '@/components/posts/PostListItem.vue'
import ActivityListItem from '@/components/activity/ActivityListItem.vue';
import Map from '@/components/slot/gaode.vue';
import { ArrowDownBold } from '@element-plus/icons-vue';

const positionStore = usePositionStore();
const TabName = ref('related-post');
const route = useRoute()
watch(() => { route.name }, () => {
  if (route.name != 'cultureMap') TabName.value = 'related-post'
})

/*post*/
const postData = ref([]);

/*activity*/
const activityData = ref([]);

/*select*/
// 非遗项目
const heritageArea = ref([]);

const heritageOptions = ref([
  {
    label: '公布时间',
    value: '', // 默认值为空字符串
    options: ['', '2006(第一批)', '2008(第二批)', '2011(第三批)', '2014(第四批)', '2021(第五批)']
  },
  {
    label: '类别',
    value: '', // 默认值为空字符串
    options: ["", "民间文学", "传统音乐", "传统舞蹈", "传统戏剧", "曲艺",
      "传统美术", "传统技艺", "传统医药", "民俗", "传统体育、游艺与杂技"]
  },
  {
    label: '类型',
    value: '', // 默认值为空字符串
    options: [
      [
        ""
      ],
      [
        "神话与传说",
        "民间故事",
        "歌谣与谚语",
        "谜语与说唱文学",
        "其他"
      ],
      [
        "民歌",
        "器乐",
        "戏曲音乐",
        "宗教与仪式音乐",
        "其他"
      ],
      [
        "民间舞蹈",
        "宗教舞蹈",
        "祭祀舞蹈",
        "舞蹈道具与服饰",
        "其他"
      ],
      [
        "地方戏曲",
        "木偶戏",
        "皮影戏",
        "戏剧表演艺术",
        "其他"
      ],
      [
        "相声与小品",
        "评书与快板",
        "大鼓与弹词",
        "地方曲艺",
        "其他"
      ],
      [
        "绘画与书法",
        "剪纸与刺绣",
        "雕刻与陶瓷",
        "民间工艺美术",
        "其他"
      ],
      [
        "陶瓷与金属工艺",
        "纺织与染织",
        "传统建筑营造",
        "食品与酿造技艺",
        "其他"
      ],
      [
        "中医与针灸",
        "中药炮制",
        "民族医药",
        "传统养生",
        "其他"
      ],
      [
        "岁时节令",
        "人生礼俗",
        "民间信仰",
        "饮食与服饰习俗",
        "其他"
      ],
      [
        "传统武术",
        "民族体育",
        "游艺与游戏",
        "杂技与魔术",
        "其他"
      ],
    ]
  }
]);
const heritageSum = ref(0);
const heritageSearchName = ref('');
const heritageIndex = ref(0);
const heritageData = ref([]);

//非遗传承人
const artistArea = ref([]);
const artistOptions = ref([
  {
    label: '公布时间',
    value: '', // 默认值为空字符串
    options: ['', '2006(第一批)', '2008(第二批)', '2011(第三批)', '2014(第四批)', '2021(第五批)']
  },
  {
    label: '类别',
    value: '', // 默认值为空字符串
    options: ["", "民间文学", "传统音乐", "传统舞蹈", "传统戏剧", "曲艺",
      "传统美术", "传统技艺", "传统医药", "民俗", "传统体育、游艺与杂技"]
  },
  {
    label: '性别',
    value: '', // 默认值为空字符串
    options: ['', '女', '男']
  }
]);
const artistSearchName = ref('');
const artistData = ref([]);

function splitADCode(newValue) { //拆分adcode
  newValue = String(newValue);
  const province = newValue.slice(0, 2); // 省级代码
  const city = newValue.slice(0, 4); // 地级代码
  const district = newValue; // 县级代码

  if (newValue.slice(2, 4) === '00') {
    return [province];
  }

  if (newValue.slice(4, 6) === '00') {
    return [province, city];
  }

  return [province, city, district];
}

function concatADCode(area) { //拼接adcode
  if (area.length === 1) {
    return area[0] + '0000';
  }

  if (area.length === 2) {
    return area[1] + '00';
  }

  return area[2];
}

function handleHeritageSearch() { //搜索非遗项目
  getFromAdcodeApi(concatADCode(heritageArea.value)).then(res => {
    heritageData.value = res.data.data;
    if (!heritageData.value) return;
    heritageData.value = heritageData.value.filter(item => {
      return (item.rxTime === heritageOptions.value[0].value || !heritageOptions.value[0].value) &&
        (item.type === heritageOptions.value[1].value || !heritageOptions.value[1].value) &&
        (item.secondType === heritageOptions.value[2].value || !heritageOptions.value[2].value);
    })
    if (heritageSearchName.value) {
      heritageData.value = heritageData.value.filter(item => {
        return item.title.includes(heritageSearchName.value);
      })
    }
  })
}

function handleArtistSearch() { //搜索非遗传承人或项目
  getArtistApi(concatADCode(artistArea.value), artistOptions.value[0].value,
    artistOptions.value[1].value, artistOptions.value[2].value).then(res => {
      artistData.value = res.data.data;
      if (artistSearchName.value) {
        artistData.value = artistData.value.filter(item => {
          return item.name.includes(artistSearchName.value) || item.projectName.includes(artistSearchName.value);
        })
      }
    })
}

watch(() => positionStore.currentCode, (newValue) => { //地图切换地区
  if (!newValue) return;
  const res = splitADCode(newValue);
  heritageArea.value = res;
  artistArea.value = res;
}, { immediate: true })

watch(TabName, () => {
  if (TabName.value === 'related-post') {
    getLocationPostApi().then(res => { //附近帖子
      postData.value = res.data.data;
    });
  } else if (TabName.value === 'exhibition') {
    getLocationActivityApi().then(res => { //附近活动
      activityData.value = res.data.data;
    })
  } else if (TabName.value === 'heritage') {
    watch(() => [heritageArea.value, heritageOptions.value.map(item => item.value)], () => { //选项发生变化-非遗项目
      getFromAdcodeApi(concatADCode(heritageArea.value)).then(res => {
        heritageData.value = res.data.data;
        if (!heritageData.value) return;
        heritageData.value = heritageData.value.filter(item => {
          return (item.rxTime === heritageOptions.value[0].value || !heritageOptions.value[0].value) &&
            (item.type === heritageOptions.value[1].value || !heritageOptions.value[1].value) &&
            (item.secondType === heritageOptions.value[2].value || !heritageOptions.value[2].value);
        })
      })
    }, { immediate: true })
  } else
    watch(() => [artistArea.value, artistOptions.value.map(item => item.value)], () => { //选项发生变化-非遗传承人
      if (!artistArea.value) return;
      getArtistApi(concatADCode(artistArea.value), artistOptions.value[0].value,
        artistOptions.value[1].value, artistOptions.value[2].value).then(res => {
          artistData.value = res.data.data;
        })
    }, { immediate: true })
}, { immediate: true })

</script>

<template>
  <div class="bigMap">
    <Map />
  </div>
  <el-tabs v-model="TabName" class="tabs">
    <el-tab-pane label="相关帖子" name="related-post" class="relatedPost">
      <PostListItem v-for="post in postData" :post="post" />
    </el-tab-pane>
    <el-tab-pane label="展览/活动" name="exhibition" class="exhibition">
      <ActivityListItem class="activity-item" v-for="a in activityData" :activity="a" bottom="address" />
    </el-tab-pane>
    <el-tab-pane lazy label="非遗项目" name="heritage">
      <div class="heritage">
        <div class="select">
          <el-cascader class="area" placeholder="所属地区" popper-class="select-popper" v-model="heritageArea"
            :show-all-levels="false" :options="heritageCode" size="default" placement="bottom"
            :props="{ checkStrictly: true, value: 'code', label: 'name', children: 'children' }" />
          <div class="select-item">
            <el-select v-for="(item, index) in heritageOptions" :key="index" popper-class="select-popper"
              class="select-popper" :class="{ 'select-popper-bigBox': index === 0 }" v-model="item.value"
              :placeholder="item.label" :show-arrow="false" :suffix-icon="ArrowDownBold">
              <el-option v-if="index !== 2" v-for="(option, opIndex) in item.options" :key="opIndex"
                :label="option ? option : '全部'" :value="option" :disabled="option.disabled"
                @click="heritageIndex = opIndex" />
              <el-option v-else v-for="option in item.options[heritageIndex]" :key="key" :label="option"
                :value="option ? option : '全部'" :disabled="option.disabled" />
            </el-select>
          </div>
        </div>
        <div class="input">
          <el-input class="inheritor-input" v-model="heritageSearchName"
            style="width:274px;height:26px;font-size: 18px;color:#00000080;" placeholder="关键词：项目名称" size="default">
            <template #suffix>
              <div v-show="heritageSearchName" class="clean">
                <svg @click="heritageSearchName = '';" width="14" height="13" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 1L1.5 12M12.5 12L1.5 1" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
            </template>
          </el-input>
          <el-button @click="handleHeritageSearch" class="search-btn" color="#F0E4D4">搜索</el-button>
        </div>
        <div class="sum">
          共<span style="color:#D90000;padding:0 5px">{{ heritageData?.length ? heritageData.length : 0 }}</span>个项目
        </div>
        <el-table :data="heritageData" height="400" :header-cell-style="{ borderColor: '#D1C4B6CC' }"
          :cell-style="{ borderColor: '#D1C4B6CC' }" style="width: 100%">
          <el-table-column prop="num" label="序号" width="50px" />
          <el-table-column prop="projectNum" label="项目序号" />
          <el-table-column prop="num" label="编号" width="50px" />
          <el-table-column prop="title" label="名称" />
          <el-table-column prop="type" label="类别" />
          <el-table-column prop="rxTime" label="公布时间" />
          <el-table-column prop="secondType" label="类型" />
          <el-table-column prop="unit" label="申报地区或单位" />
          <el-table-column prop="protectUnit" label="保护单位" />
        </el-table>
      </div>
    </el-tab-pane>
    <el-tab-pane lazy label="非遗传承人" name="inheritor">
      <div class="inheritor">
        <div class="select">
          <el-cascader class="area" placeholder="所属地区" popper-class="select-popper" v-model="artistArea"
            :show-all-levels="false" :options="artistCode" size="default" placement="bottom"
            :props="{ checkStrictly: true, value: 'code', label: 'name', children: 'children' }" />
          <div class="select-item">
            <el-select v-for="(item, index) in artistOptions" :key="index" popper-class="select-popper sex-popper"
              class="select-popper" :class="{ 'select-popper-bigBox': index === 0 }" v-model="item.value"
              :placeholder="item.label" :show-arrow="false" :suffix-icon="ArrowDownBold">
              <el-option v-for="option in item.options" :key="option" :label="option ? option : '全部'" :value="option"
                :disabled="option.disabled" />
            </el-select>
          </div>
        </div>
        <div class="input">
          <el-input class="inheritor-input" v-model="artistSearchName"
            style="width:274px;height:26px;font-size: 18px;color:#00000080;" placeholder="关键词：姓名/项目名称" size="default">
            <template #suffix>
              <div v-show="artistSearchName" class="clean">
                <svg @click="artistSearchName = '';" width="14" height="13" viewBox="0 0 14 13" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 1L1.5 12M12.5 12L1.5 1" stroke="#BBB6B6" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
            </template>
          </el-input>
          <el-button @click="handleArtistSearch" class="search-btn" color="#F0E4D4">搜索</el-button>
        </div>
        <div class="sum">
          共<span style="color:#D90000;padding:0 5px;">{{ artistData?.length ? artistData.length : 0 }}</span>个人
        </div>
        <el-table :data="artistData" height="250" :header-cell-style="{ borderColor: '#D1C4B6CC' }"
          :cell-style="{ borderColor: '#D1C4B6CC' }" style="width: 100%">
          <el-table-column prop="id" label="序号" />
          <el-table-column prop="name" label="姓名" width="50px" />
          <el-table-column prop="gender" label="性别" width="40px" />
          <el-table-column prop="category" label="类别" width="60px" />
          <el-table-column prop="projectNumber" label="项目编号" width="60px" />
          <el-table-column prop="projectName" label="项目名称" />
          <el-table-column prop="region" label="申报地区或单位" />
        </el-table>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>


<style scoped>
.tabs :deep(.el-tab-pane) {
  min-height: 40vh;
}

.bigMap {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: url('/icon/map-background.png') no-repeat center center;
  background-size: contain;
  border: 2px solid rgba(230, 219, 205, 1);
}

/*title*/
.title {
  display: flex;
  margin: 5px 15px;
  font-size: 14px;
  gap: 40px;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

/*content*/
.relatedPost {
  margin: 0 15px 0;
}

/* .relatedPost, */
.exhibition,
.input,
.sum {
  padding: 0 15px;
}

:deep(.el-select__placeholder.is-transparent) {
  color: #000;
  font-size: 14px;
}

:deep(.el-select__caret) {
  color: #000;
}

.select {
  display: flex;
  gap: 15px;
  padding: 5px 15px;
}


.select-item {
  display: flex;
  gap: 15px;
}


:deep(.area .el-input__wrapper),:deep(.select-popper .el-select__wrapper) {
  background-color: #F0E4D4;
  border-radius: 5px;
  box-shadow: none;
}

:deep(.area .el-input .el-input__inner) {
  color: #000;
}

:deep(.select-popper-bigBox .el-select__wrapper) {
  width: 90px;
}

:deep(.el-input__suffix) {
  color: #000;
}

:deep(.select-popper .el-select__wrapper) {
  min-width: 62px;
  padding: 0px 7px;
  --el-select-width: none;
}

.input {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 10px 0;
  margin-bottom: 5px;
}

:deep(.inheritor-input .el-input__wrapper) {
  width: 200px;
  border-radius: 3px;
  border: solid 1px #987B5B;
  box-shadow: none;
}

:deep(.inheritor-input .el-input__inner::placeholder) {
  font-size: 16px;
  color: #BBB6B6;
}

.search-btn {
  font-size: 14px;
  padding: 0px 7px;
}

.sum {
  margin-left: 15px;
  ;
  font-size: 13px;
}

:deep(.el-table__header th) {
  font-size: 12px;
}

:deep(.el-table__body td) {
  font-size: 11px;
}

:deep(.el-table .cell) {
  padding: 0;

}

:deep(.el-table .cell),
:deep(.el-table__body td) {
  text-align: center;
  color: #000;
}

:deep(.el-table) {
  padding: 0;
  margin: 0;
}

:deep(.el-table__body tr:nth-child(odd)) {
  background-color: #ECDBC94A;
  /* 设置奇数行背景颜色为浅灰色，可根据需求修改 */
}

/*area*/
</style>