<template>
  <div class="search-item-wrapper">
    <a class="item-header" :href="entries.url">
      <div class="title">{{entries.name}}</div>
      <div class="url">{{entries.url}}</div>
    </a>
    <hr class="d-line"/>
    <div class="item-body">
      <p class="desc">{{entries.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GogoSearchItem',
  props: {
    entries: Object
  }
}
</script>

<style lang="stylus" scoped>
  .search-item-wrapper
    margin: 0 8px 10px 8px
    box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28)
    border-radius: 8px
  .item-header
    display: block
    padding: 12px 16px
    .title
      font-size: 16px
      color: #1967d2
      line-height: 20px
    .url
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      font-size: 14px
      color: #006621
      line-height: 20px

  .d-line
    margin: 0 16px
    border: 0
    border-bottom: 1px solid #DFE1E5

  .item-body
    padding: 12px 16px
    .desc
      font-size: 14px
      color: #3c4043
      line-height: 20px
</style>