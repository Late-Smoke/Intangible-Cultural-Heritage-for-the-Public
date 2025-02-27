<script setup>
import { ref, onMounted } from 'vue';
import RelatedPost from '@/components/slot/relatedPost.vue';
import Exhibition from '@/components/slot/exhibition.vue';
import Map from '@/components/slot/gaode.vue';
import { ArrowDownBold } from '@element-plus/icons-vue';

const selectedTab = ref('relatedPost');
const handleTabClick = (tab) => {
  selectedTab.value = tab;
}

/*select*/
const area = ref('');
const time = ref('');
const type = ref('');
const gender = ref([]);
const areaOptions = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];
const timeOptions = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];
const typeOptions = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];
const genderOptions = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  }
];

const sum = ref(0);
const inheritorData = [
  {
    number: '01-0041',
    name: 'Tom',
    nation: 'China',
    project: 'Project1',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    number: '01-0041',
    name: 'Tom',
    nation: 'China',
    project: 'Project1',
    address: 'No. 189, Grove St, Los Angeles',
  },
];

const searchName = ref('');

</script>

<template>
  <div class="bigMap">
    <Map />
  </div>
  <div class="title">
    <div class="tab">
      <span @click="handleTabClick('relatedPost')">相关帖子</span>
      <svg v-show="selectedTab == 'relatedPost'" width="25" height="2" viewBox="0 0 25 2" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <div class="tab">
      <span @click="handleTabClick('activity')">展览/活动</span>
      <svg v-show="selectedTab == 'activity'" width="25" height="2" viewBox="0 0 25 2" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <div class="tab">
      <span @click="handleTabClick('inheritor')">非遗传承人</span>
      <svg v-show="selectedTab == 'inheritor'" width="25" height="2" viewBox="0 0 25 2" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1H24" stroke="#987B5B" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
  </div>
  <div class="content">
    <div class="relatedPost" v-show="selectedTab == 'relatedPost'">
      <related-post />
    </div>
    <div class="exhibition" v-show="selectedTab == 'activity'">
      <exhibition />
    </div>
    <div class="inheritor" v-show="selectedTab == 'inheritor'">
      <div class="select">
        <el-select popper-class="select-popper" class="select-popper-bigBox" v-model="area" placeholder="所属地区"
          :show-arrow="false" :suffix-icon="ArrowDownBold">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled" />
        </el-select>
        <el-select popper-class="select-popper" class="select-popper-bigBox" v-model="time" placeholder="公布时间"
          :show-arrow="false" :suffix-icon="ArrowDownBold">
          <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled" />
        </el-select>
        <el-select popper-class="select-popper" class="select-popper-smallBox" v-model="type" placeholder="类别"
          :show-arrow="false" :suffix-icon="ArrowDownBold">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled" />
        </el-select>
        <el-select popper-class="select-popper sex-popper" class="select-popper-smallBox" v-model="gender"
          placeholder="性别" :show-arrow="false" :suffix-icon="ArrowDownBold">
          <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"
            :disabled="item.disabled" />
        </el-select>
      </div>
      <div class="input">
        <el-input class="inheritor-input" v-model="searchName"
          style="width:274px;height:26px;font-size: 18px;color:#00000080;" placeholder="关键词：姓名/项目名称" size="default">
        </el-input>
        <el-button @click="handleSearch" class="search-btn" color="#F0E4D4">搜索</el-button>
      </div>
      <div class="sum">
        人数：
        <span style="color:#D90000">{{ sum }}</span>
      </div>
      <el-table :data="inheritorData" height="250" :header-cell-style="{ borderColor: '#D1C4B6CC' }"
        :cell-style="{ borderColor: '#D1C4B6CC' }" style="width: 100%">
        <el-table-column prop="number" label="序号" width="60px" />
        <el-table-column prop="name" label="姓名" width="50px" />
        <el-table-column prop="nation" label="民族" width="40px" />
        <el-table-column prop="project" label="项目编号及名称" />
        <el-table-column prop="address" label="申报地区或单位" />
      </el-table>
    </div>
  </div>
</template>


<style scoped>
.bigMap {
  width: 100%;
  aspect-ratio: 1 / 1;
  background: url('/icon/map-background.png') no-repeat center center;
  background-size: contain;
}

/*title*/
.title {
  display: flex;
  margin: 5px 15px;
  font-size: 18px;
  gap: 40px;
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

/*content*/
.relatedPost,
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

:deep(.select) {
  display: flex;
  gap: 15px;
  padding: 5px 15px;
}

:deep(.select-popper-bigBox .el-select__wrapper) {
  width: 90px;
  height: 27px;
  padding: 0px 7px;
  --el-select-width: none;
  background-color: #F0E4D4;
  border-radius: 5px;
  box-shadow: none;
}

:deep(.select-popper-smallBox .el-select__wrapper) {
  width: 62px;
  height: 27px;
  padding: 0px 7px;
  --el-select-width: none;
  background-color: #F0E4D4;
  border-radius: 5px;
  box-shadow: none;
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
</style>