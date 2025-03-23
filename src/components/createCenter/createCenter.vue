<template>
    <el-container>
    <el-header>
        <el-icon class="back-btn" @click="router.back()">
            <ArrowLeftBold />
        </el-icon>
        <div class="bill-title">全部账单</div>
    </el-header>
    <el-main>
        <div class="allBill">
            <div class="title">总账单</div>
            <div class="allBill-form">
                <el-table :data="selfData" :border='true' style="width: 100%">
                    <el-table-column prop="userId" label="创作者ID" />
                    <el-table-column prop="accountName" label="创作者昵称" />
                    <el-table-column prop="balance" label="总收入" />
                    <el-table-column prop="updatedTime" label="最新分账时间" width="110px" />
                </el-table>
            </div>
        </div>
        <div class="eachBill">
            <div class="title">账单明细</div>
            <div class="eachBill-form">
                <el-table :data="allData" height="60vh" :border='true' style="width: 100%">
                    <el-table-column prop="incomeSourceUserId" label="用户ID" />
                    <el-table-column prop="incomeAmount" label="用户支付金额" />
                    <el-table-column prop="type" label="收益来源" width="90px" />
                    <el-table-column prop="description" label="收益描述" width="150px" />
                    <el-table-column prop="updatedTime" label="分账时间" width="110px" />
                </el-table>
            </div>
        </div>
    </el-main>
    </el-container>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import router from '@/router';
import { getSelfBillApi } from '@/axios/api/management';

const selfData = ref();
const allData = ref();

onMounted(() => {
    getSelfBillApi().then(res => {
        console.log(res.data);
        selfData.value = [res.data.data.personalAccounts];
        allData.value = res.data.data.personalIncomeStatementList;
        selfData.value.forEach((item: any) => {
            item.updatedTime = item.updatedTime.replace('T', ' ');
        })
        allData.value.forEach((item: any) => {
            item.updatedTime = item.updatedTime.replace('T', ' ');
        })
    })
})
</script>

<style scoped>
.el-container {
    background-image: url('/icon/artistBackground.svg');
}

.el-header {
    display: flex;
    align-items: center;
}

.el-main {
    padding-top: 0;
}

/* :deep(.el-table) {
    background-color: transparent;
    
} */

:deep(.el-table) {
  background-color: rgba(255, 255, 255, 0.5); /* 设置表格整体背景颜色 */
}

:deep(.el-table th),
:deep(.el-table tr) {
  background-color: rgba(255, 255, 255, 0.5); /* 设置表头和行的背景颜色 */
}

.bill-title {
    color: #B19780;
    flex: 1;
    text-align: center;
    font-size: 20px;
    line-height: 60px;
}

.allBill {
    margin-bottom: 30px;
}

.title {
    margin: 10px 0;
    color: darkgray;
}
</style>