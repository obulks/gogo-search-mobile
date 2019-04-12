<template>
  <div class="search-loading-wrapper">
    <div class="ball-triangle-path">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GogoSearchLoading'
}
</script>

<style lang="stylus" scoped>
  @import '../../node_modules/loaders.css/loaders.min.css'
  .search-loading-wrapper {
    display: flex
    justify-content: center
    align-items: center
  }

  .ball-triangle-path > div {
    background-color: #3b78e7
  }

</style>