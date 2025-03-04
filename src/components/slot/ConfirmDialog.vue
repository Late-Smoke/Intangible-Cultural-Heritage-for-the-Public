<template>
    <div class="confirm-dialog">
        <el-dialog v-model="dialogVisible" :title="title">
            <span>{{ content }}</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="action(); dialogVisible = false">确定</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
const dialogVisible = defineModel<boolean>({ required: true })

const { title = '提示' } = defineProps<{
    title?: string
    content: string
    action: () => any
}>()
</script>

<style scoped lang="scss">
.confirm-dialog {
    :deep(.el-overlay-dialog) {
        display: flex;
        align-items: center;
        justify-content: center;

        .el-dialog {
            width: 400px;
            max-width: 80%;
            margin: 0;
        }
    }
}
</style>
