<!--
@name 笔记
-->

<template>
  <div class="note" @contextmenu="handleContextmenu">
    <span class="content" contenteditable="true" @blur="handleContentBlur">{{content}}</span>
    <span class="time">
      <span class="wrap">
        <span class="create" v-if="state===0">{{note.createTime | dayFormat}}</span>
        <span class="finish" v-else-if="state===1">{{finishTime | dayFormat}}</span>

        <div class="tip">
          <div>创建：{{note.createTime | dayFormat}} {{note.createTime | clockFormat}}</div>
          <div v-if="finishTime">完成：{{finishTime | dayFormat}} {{finishTime | clockFormat}}</div>
          <div></div>
        </div>
      </span>
    </span>
    <span :class="['state',{finished:state===1}]" @click="handleStateClick"></span>
  </div>
</template>

<style lang='scss' scoped src='./style.scss'></style>
<script src='./component.js'></script>
