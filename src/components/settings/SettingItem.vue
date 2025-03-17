<template>
    <div class="setting" @click="handleClick">
        {{ setting.name }}

        <el-switch v-if="setting.type == 'switch'" size="large" :loading="setting.value == undefined || loading" v-model="setting.value" @change="handleSwitch" />

        <div v-if="setting.type == 'input'" class="current-value">
            <span>{{ setting.value }}</span>
            <mdiChevronRight />
        </div>

        <div v-if="setting.type == 'image'" :class="{ 'current-value': true, 'rounded-image': setting.roundedImage }">
            <img :src="setting.value">
            <mdiChevronRight />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ElMessageBox } from 'element-plus';
import { ref } from 'vue';

const setting = defineProps<{
    name: string
    type: 'switch' | 'input' | 'image'
    value?: any
    /**
     * @param value The new value  
     * `switch`: The toggled value  
     * `input`: The entered text if no `inputAction` was given  
     * `image`: `undefined`  
     */
    action?: (value?: any) => Promise<any> | void

    // `input` specific settings
    inputTips?: string
    /** Overrides the default action which shows an `el-input` */
    inputAction?: () => void

    // `image` specific settings
    roundedImage?: boolean
}>()

const loading = ref(false)

function handleSwitch() {
    loading.value = true
    const promise = setting.action(!setting.value)
    if (promise instanceof Promise)
        promise.finally(() => loading.value = false)
    else loading.value = false
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

    if (setting.type == 'image') setting.action()
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

    >.current-value {
        display: flex;
        align-items: center;
        gap: 8px;

        >span {
            font-size: 0.9em;
            color: #888;
        }

        >img {
            height: 36px;
        }

        &.rounded-image>img {
            width: 36px;
            border-radius: 100%;
            object-fit: cover;
        }
    }
}
</style>
