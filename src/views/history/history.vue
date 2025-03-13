<template>
    <PageHeader title="浏览历史" class="header" :transparent="false">
        <div style="flex: 1;"></div>

        <div v-if="!editing" @click="editing = true; allSelected = false">管理</div>
        <div v-if="editing" @click="editing = false">取消</div>
    </PageHeader>

    <ElTabs class="outline sticky">
        <ElTabPane label="帖子" class="flex-reverse list">
            <template v-for="history in HistoryController.history">
                <HistoryListItem v-if="history.type == historyType.post" :history="history" :selectable="editing" />
            </template>
        </ElTabPane>

        <ElTabPane label="活动" class="flex-reverse list">
            <template v-for="history in HistoryController.history">
                <HistoryListItem v-if="history.type == historyType.activity" :history="history" :selectable="editing" />
            </template>
        </ElTabPane>
    </ElTabs>

    <div style="padding: 20px 0 80px; text-align: center; color: #888;">- 已经到底啦 -</div>

    <div class="list-action" v-if="editing">
        <div v-if="allSelected" @click="allSelected = false">
            <mdiCheckCircle color="rgb(177,151,128)" />全选
        </div>
        <div v-else @click="allSelected = true">
            <mdiCircleOutline color="#888" />全选
        </div>

        <i></i>

        <div style="color: #f44;" @click="confirmDelete()" v-if="selectedCount">
            <mdiTrashCanOutline />删除 ({{ selectedCount }})
        </div>
        <div style="color: #755;" v-else>
            <mdiTrashCanOutline />删除
        </div>
    </div>
</template>

<script setup lang="ts">
import { HistoryController, historyType } from '@/controllers/history';
import router from '@/router';
import HistoryListItem from '@/components/history/HistoryListItem.vue'
import { ref, computed } from 'vue';
import PageHeader from '@/components/slot/PageHeader.vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { onActivated } from 'vue';

const editing = ref(false)

const allSelected = computed({
    get() {
        for (const history of HistoryController.history) {
            if (!history.selected) return false
        }
        return true
    },
    set(value) {
        HistoryController.history.forEach(x => x.selected = value)
    },
})

const selectedCount = computed(() => HistoryController.history.filter(x => x.selected).length)

function confirmDelete() {
    ElMessageBox.confirm('确认删除选中的历史记录吗?', '删除历史记录', { type: 'warning', }).then(() => {
        HistoryController.removeSelected()
        ElMessage.success('删除成功')
        editing.value = false
    }).catch(() => { })
}

onActivated(() => {
    editing.value = false
    allSelected.value = false
})
</script>

<style scoped lang="scss">
.header {
    height: 56px;
}

.el-tabs :deep(>.el-tabs__header) {
    top: 56px;
}

.list>div {
    margin: 0 12px;
    padding: 12px 0;
    border-bottom: 1px solid #ddd;
}

.list-action {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    background-color: white;
    border-top: 1px solid #bbb;

    >div {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 12px 0;

        >svg {
            font-size: 1.4em;
        }
    }

    >i {
        border-left: 1px solid #ccc;
        margin: 10px 0;
    }
}
</style>
