<!--
@name 条目
 -->

<template>
  <div class="chapter" :data-chapterorder="datum.order" @mousedown="handleMouseDown" @contextmenu="handleContextMenu">
    <span class="name">{{datum.name}}</span>
    <span :class="['procede',(datum.finished !==0 && datum.finished === datum.total) && 'finished']">{{datum.finished}} / {{datum.total}}</span>
  </div>
</template>

<style lang='scss' src='./style.scss' scoped></style>
<script src='./component.js'></script>
