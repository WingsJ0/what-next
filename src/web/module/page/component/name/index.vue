<!--
    @name 标题
-->

<template>
    <div class="name">
        <div class="display" v-if="mode===0" @click="handleDisplayClick">{{chapter.name}}</div>
        <input
            class="edit"
            v-else-if="mode===1"
            type="text"
            v-model="temp"
            ref="edit"
            @blur="handleEditBlur"
            @keyup="handleEditKeyup"
        />
    </div>
</template>

<style lang='scss' scoped src='./style.scss'></style>
<script src='./component.js'></script>