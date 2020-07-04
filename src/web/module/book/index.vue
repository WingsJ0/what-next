<!--
@name 笔记本
@description 包含多个章节
 -->

<template>
  <div class="book" :style="{width:domWidth}">
    <div class="items">
      <chapter :class="['chapter', {active:chapter && el.id===chapter.id}]" v-for="el of list" :key="el.id" :datum="el" @select="handleItemSelect" @menu="handleItemMenu" />
    </div>
    <panel :items="panelItems" />
  </div>
</template>

<style lang='scss' src='./style.scss' scoped></style>
<script src='./component.js'></script>
