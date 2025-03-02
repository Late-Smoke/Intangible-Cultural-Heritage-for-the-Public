<template>
    <div class="tags-editor">
        <el-tag v-for="tag in dynamicTags" :key="tag" type="primary" closable :disable-transitions="false" @close="handleClose(tag)">
            {{ tag }}
        </el-tag>
        <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" size="small" @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
        <el-button v-else class="button-new-tag" size="small" type="primary" plain @click="showInput">
            + 添加 Tag
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { ElInput } from 'element-plus'
import type { InputInstance } from 'element-plus'

const dynamicTags = defineModel<string[]>({ required: true })

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InputInstance>()

const handleClose = (tag: string) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value!.input!.focus()
    })
}

const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value.replaceAll(' ', ''))
    }
    inputVisible.value = false
    inputValue.value = ''
}
</script>

<style scoped lang="scss">
.tags-editor {
    display: flex;
    gap: 4px;

    .el-input {
        width: 80px;
    }
}
</style>