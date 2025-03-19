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

watch(inputNum, newValue => {
    if (newValue == '') {
        lastValidValue = newValue
        if (model.value != null) model.value = null
        return
    }

    if (!/^0\d+/.test(newValue)) {
        for (const regex of validRegex) {
            if (regex.test(newValue)) {
                lastValidValue = newValue
                inputNum.value = newValue
                model.value = parseFloat(newValue)
                return
            }
        }
    }

    inputNum.value = lastValidValue
    model.value = parseFloat(lastValidValue)
})

watch(model, newValue => {
    if (newValue == null) {
        if (inputNum.value != '') inputNum.value = ''
    } else if (newValue.toString() != inputNum.value) {
        inputNum.value = newValue.toFixed(2)
    }
}, { immediate: true })
</script>