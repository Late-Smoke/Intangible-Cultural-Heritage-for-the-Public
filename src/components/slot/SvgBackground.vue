<template>
    <div class="bg">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -100;

    :deep(svg) {
        width: 70vw;
        height: auto;
        max-height: 80vh;
    }
}
</style>