<!--
@name 控制台
-->

<template>
  <div class="panel">
    <div class='slide'>
      <img class="item" v-for="item of items" :key="item.src" :src="item.src" @click="item.action" />
    </div>
  </div>
</template>

<style lang='scss' scoped src='./style.scss'></style>
<script src='./component.js'></script>
