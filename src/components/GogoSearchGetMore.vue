<template>
  <div class="get-more-wrapper">
    <div class="get-more-button" v-show="!showLoader">
    <span class="arrow-icon">
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path></svg>
    </span>
      <span class="text">更多结果</span>
    </div>
    <div class="loader" v-show="showLoader">
      <div class="ball-beat">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GogoSearchGetMore',
  props: {
    showLoader: Boolean
  }
}
</script>

<style lang="stylus" scoped>
  @import '../../node_modules/loaders.css/loaders.min.css'
  .get-more-wrapper
    position: relative
    margin: 16px
    height: 40px

    .get-more-button
      position: relative
      display: flex
      border-radius: 20px
      border: 1px solid #DFE1E5

      .arrow-icon
        position: absolute
        width: 24px
        height: 24px
        left: 16px
        top: 50%
        margin-top: -12px

        svg
          vertical-align: top
          width: 24px
          height: 24px

      .text
        flex: 1
        font-size: 14px
        vertical-align: bottom
        text-align: center
        line-height: 40px

  .loader
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    .ball-beat > div
      background: #3b78e7
</style>