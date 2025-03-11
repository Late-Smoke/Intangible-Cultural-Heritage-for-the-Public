<template>
    <div class="setting" @click="handleClick">
        {{ setting.name }}

        <el-switch v-if="setting.type == 'switch'" size="large" :loading="setting.value == undefined || loading" v-model="setting.value" @change="handleSwitch" />

        <div v-if="setting.type == 'input'" class="input">
            <span>{{ setting.value }}</span>
            <mdiChevronRight />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const setting = defineProps<{
    name: string
    type: 'switch' | 'input'
    value?: any
    action?: (value?: any) => Promise<any>

    inputTips?: string
    /** Overrides the default action which shows an `el-input` */
    inputAction?: () => void
}>()

const loading = ref(false)

function handleSwitch() {
    loading.value = true
    setting.action(!setting.value).finally(() => loading.value = false)
}

function handleClick() {
    if (setting.type == 'input') {
        if (setting.inputAction) {
            setting.inputAction()
            return
        }

        ElMessageBox.prompt(undefined, setting.inputTips || '请输入', {
            inputValue: setting.value,
        }).then(({ value }) => {
            setting.action(value)
        }).catch(() => { })
    }
}

</script>

<style scoped lang="scss">
.setting {
    padding: 0 24px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
        font-size: 1.5em;
    }

    >.input {
        display: flex;
        align-items: center;
        gap: 8px;

        >span{
            font-size: 0.9em;
            color: #888;
        }
    }
}
</style>
