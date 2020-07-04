<!--
    @name 页
    @description 包含多个笔记
 -->

<template>
  <div class="page">
    <template v-if="chapter">
      <name class="name" :chapter="chapter"></name>
      <div class="info">
        <span class="createTime">{{chapter.createTime | dayFormat}}</span>
      </div>
      <div class="list">
        <div class="wait">
          <note v-for="el of waitList" :key="'wait'+el.id" :note="el" @edit="handleNoteEdit" @menu="handleNoteMenu"/>
        </div>
        <div class="separate" v-if="finishedList.length"></div>
        <div class="finished">
          <note class="note" v-for="el of finishedList" :key="'finished'+el.id" :note="el" @edit="handleNoteEdit" @menu="handleNoteMenu"/>
        </div>
      </div>
      <panel class="panel" v-if="page" :items="panelItems" />
    </template>
  </div>
</template>

<style lang='scss' src='./style.scss' scoped></style>
<script src='./component.js'></script>
