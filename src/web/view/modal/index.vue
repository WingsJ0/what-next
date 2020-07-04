<!--
    @name 模态框
-->

<template>
  <div class="modal" @click="handleClick">
    <div class="dialog">
      <div class="text">{{ text }}</div>
      <div class="content">{{ content }}</div>
      <div class="buttons">
        <span
          :class="['button', el.className]"
          v-for="el of buttons"
          :key="el.name"
          @click="handleButtonClick(el.name)"
          >{{ el.text }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped src='./style.scss'></style>
<script src='./component.js'></script>
