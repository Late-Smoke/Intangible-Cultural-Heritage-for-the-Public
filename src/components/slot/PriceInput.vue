<template>
    <input v-model="inputNum">
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';

const model = defineModel<number | null>()

const inputNum = ref('0')
let lastValidValue = '0'

const validRegex = [
    /^\d+$/,
    /^\d+\.$/,
    /^\d+\.\d$/,
    /^\d+\.\d\d$/,
]

function tryAssignNewValue(newValue: string): boolean {
    if (!/^0\d+/.test(newValue)) {
        for (const regex of validRegex) {
            if (regex.test(newValue)) {
                lastValidValue = newValue
                inputNum.value = newValue
                return true
            }
        }
    }
    inputNum.value = lastValidValue
    return false
}

watch(inputNum, newValue => {
    if (newValue == '') {
        model.value = null
    } else if (tryAssignNewValue(newValue)) {
        model.value = parseFloat(newValue)
    }
})
</script>