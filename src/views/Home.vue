<template>
  <div class="home">
    <gogo-logo class="logo"></gogo-logo>
    <gogo-search-bar
      class="search-bar"
      @search="toSearchPage"
    ></gogo-search-bar>
    <gogo-search-get-more>
    </gogo-search-get-more>
  </div>
</template>

<script>
import GogoLogo from '../components/GogoBaseLogo.vue'
import GogoSearchBar from '../components/GogoSearchBar.vue'
import GogoSearchGetMore from '../components/GogoSearchGetMore'

export default {
  name: 'Home',
  data () {
    return {
      searchText: '',
      defaultPage: 1
    }
  },
  components: {
    GogoLogo,
    GogoSearchBar,
    GogoSearchGetMore
  },
  methods: {
    toSearchPage(searchText) {
      this.searchText = searchText
      this.$router.push({
        path: '/search',
        query: {
          text: this.searchText
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../common/styl/px2rem.styl"
  .logo
    display: block
    margin: 80px auto 20px auto
</style>
