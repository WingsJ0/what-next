<!--
@name 菜单
-->

<template>
    <div class="context-menu" :style="{left:x+'px',top:y+'px'}" @blur="handleBlur">
        <div class="item" v-for="el of items" :key="el.name" @click="handleItemClick(el.name)">{{el.text}}</div>
    </div>
</template>

<style lang='scss' src='./style.scss' scoped></style>
<script src='./component.js'></script>