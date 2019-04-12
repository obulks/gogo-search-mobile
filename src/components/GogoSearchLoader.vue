<template>
  <div class="search-loader-wrapper">
    <div class="loader">
      <div class="ball-triangle-path">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GogoSearchLoader'
}
</script>

<style lang="stylus" scoped>
  @import '../../node_modules/loaders.css/loaders.min.css'
  .search-loader-wrapper

  .ball-triangle-path > div {
    background-color: #3b78e7
  }

</style>