<template>
  <div class="search-bar-wrapper">
    <input
      class="search-input"
      v-model="searchText"
      @keydown.enter="doSearch"
    >
    <button
      class="search-clear-btn"
      @click="clearBtnClick"
      v-show="!(searchTextIsNull())"
    >
      ×
    </button>
    <button class="search-btn"
            @click="handleSearch"
    >
      <span class="search-icon">
        <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path
          d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path></svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GogoSearchBar',
  data() {
    return {
      searchText: '',
    }
  },
  methods: {
    clearSearchText() {
      this.searchText = ''
    },
    searchTextIsNull() {
      return this.searchText === ''
    },
    clearBtnClick() {
      if (this.searchTextIsNull()) {
        return
      }
      console.log('click')
      this.clearSearchText()
    },
    handleSearch() {
      if (this.searchTextIsNull()) {
        return
      }
      this.$emit('search', this.searchText)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .search-bar-wrapper
    display: flex
    height: 40px
    margin: 8px
    border: 1px solid #DFE1E5
    border-radius: 20px
    align-items: center

  .search-input
    flex: 1
    height: 40px
    line-height: 40px
    padding: 0
    margin-left: 16px
    border: none
    font-size: 18px
    outline: none

  .search-clear-btn
    width: 40px
    height: 40px
    padding: 0
    font-size: 27px
    outline: none
    color: #757575

  .search-btn
    width: 42px
    height: 40px
    line-height: 40px
    padding: 0
    border-top-right-radius: 20px
    border-bottom-right-radius: 20px
    background-color: #3b78e7
    border: 1px solid #3367d6
    outline: none

    .search-icon
      display: inline-block
      width: 24px
      height: 24px
      line-height: 24px

      svg
        fill: #fff
        width: 24px
        height: 24px
        vertical-align: bottom
</style>