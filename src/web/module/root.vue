<!--
    @name 根组件
 -->

<template>
  <div class="root">
    <book class="book" />
    <page class="page" />
    <width-adjust />
  </div>
</template>

<style lang='scss' scoped>
  @import '../style/color';
  @import '../style/size';

  .root {
    display: flex;
    position: relative;
    width: 100vw;
    height: 100vh;
    box-sizing: border-box;
    color: $color-font-main;
    font-size:$size-font-main;

    >.book {
      flex-shrink: 0;
    }

    >.page {
      flex-basis: 0;
      flex-grow: 1;
    }
  }

</style>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import Book from "./book";
  import Page from "./page";
  import WidthAdjust from "./width-adjust";

  export default {
    name: "root",
    components: {
      book: Book,
      page: Page,
      "width-adjust": WidthAdjust
    },
    computed: {
      ...mapState({
        domWidth: state => `${state.seperateX}px`,
        chapters: 'chapters',
        chapter: 'chapter'
      })
    },
    created() {
      if (this.chapter) {
        this.setChapter({ id: this.chapter.id })
      } else {
        this.getChapters()

        if (this.chapters[0]) { // 默认打开第一本笔记本
          this.setChapter({ id: this.chapters[0].id })
        }
      }
    },
    methods: {
      ...mapMutations(['getChapters']),
      ...mapActions(['setChapter'])
    }
  }

</script>
