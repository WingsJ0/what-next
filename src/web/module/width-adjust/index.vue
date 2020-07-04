<!--
    @name 宽度调节器
-->

<template>
    <div class="width-adjust" @mousedown="handleMouseDown" :style="{left}">
        <span class="blank"></span>
        <span :class="['line',{active}]"></span>
        <span class="blank"></span>
    </div>
</template>

<style lang='scss' src='./style.scss' scoped></style>
<script src='./component.js'></script>