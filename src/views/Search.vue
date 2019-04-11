<template>
  <div class="search">
    <router-link class="to-home" to="/">
      <gogo-logo></gogo-logo>
    </router-link>
    <gogo-search-bar
      class="gogo-search-bar"
      @search="doSearch"
      :search-text="searchText"
    ></gogo-search-bar>

    <div class="search-result-list">
      <template v-for="item in searchResults">
        <gogo-search-item :entries="item"/>
      </template>
    </div>
  </div>
</template>
<script>
import GogoLogo from '../components/GogoLogo.vue'
import GogoSearchBar from '../components/GogoSearchBar.vue'
import GogoSearchItem from '../components/GogoSearchItem'

export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      searchResults: [],
      defaultPage: 1,
      page: 1
    }
  },
  methods: {
    getSearchResult(url, params) {
      return this.axios.get(url, {
        params: {
          q: params.searchText,
          p: params.page
        }
      })
    },
    doSearch(searchText, page = this.defaultPage) {
      this.searchText = searchText
      let url = 'https://176.122.157.73:5000/api/search'
      this.getSearchResult(url, {
        searchText,
        page: this.defaultPage
      })
        .then(res => {
          const data = res.data
          this.searchResults = data.entries
        })
    }
  },
  mounted() {
    this.page = this.$route.query.page
    this.searchText = this.$route.query.text
    this.doSearch(this.searchText, this.page)
  },
  components: {
    GogoLogo,
    GogoSearchBar,
    GogoSearchItem
  }
}
</script>

<style lang="stylus" scoped>
  .to-home
    width: 130px
    height: 62px
    display: block
    margin: 0 auto
  .gogo-search-bar
    margin-bottom: 10px
</style>
