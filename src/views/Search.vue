<template>
  <div class="search">
    <gogo-logo
      class="gogo-logo"
      @click.native="toHome"
    ></gogo-logo>
    <gogo-search-bar
      class="gogo-search-bar"
      @search="doSearch"
      :search-text="searchText"
    ></gogo-search-bar>

    <gogo-search-loading
      class="gogo-search-loading"
      v-show="loading"
    >
    </gogo-search-loading>
    <div
      class="search-result-list"
      v-for="item in searchResults"
    >
      <gogo-search-item :entries="item"/>
    </div>

    <gogo-search-get-more
      @click.native="getMore"
      v-show="!loading"
    >
    </gogo-search-get-more>
  </div>
</template>
<script>
import GogoLogo from '../components/GogoBaseLogo'
import GogoSearchBar from '../components/GogoSearchBar'
import GogoSearchItem from '../components/GogoSearchItem'
import GogoSearchLoading from '../components/GogoSearchLoading'
import GogoSearchGetMore from '../components/GogoSearchGetMore'

export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      searchResults: [],
      defaultPage: 1,
      page: 1,
      loading: false
    }
  },
  methods: {
    getSearchResult(params) {
      let url = 'https://176.122.157.73:5000/api/search'
      return this.axios.get(url, {
        params: {
          q: params.searchText,
          p: params.page
        }
      })
    },
    setPath(searchText) {
      this.$router.push({
        path: '/search',
        query: {
          text: searchText
        }
      })
    },
    toHome() {
      this.$router.push({
        path: '/'
      })
    },
    onLoading() {
      this.loading = true
    },
    offLoading() {
      this.loading = false
    },
    doSearch(searchText, page = this.defaultPage) {
      // 每次进行搜索时，把page初始化为 1
      this.page = 1
      this.searchText = searchText
      this.onLoading()
      this.setPath(searchText)
      this.getSearchResult({
        searchText,
        page
      })
        .then(res => {
          this.offLoading()
          const data = res.data
          this.searchResults = data.entries
        })
        .catch(err => {
          this.offLoading()
          console.log(err)
        })
    },
    getMore() {
      // console.log('g')
      this.page++
      this.getSearchResult({
        searchText: this.searchText,
        page: this.page
      })
        .then(res => {
          const data = res.data
          this.searchResults.push(...data.entries)
        })
    }
  },
  mounted() {
    if (this.$route.query.text === undefined) {
      return
    }
    this.searchText = this.$route.query.text
    this.doSearch(this.searchText)
  },
  components: {
    GogoLogo,
    GogoSearchBar,
    GogoSearchItem,
    GogoSearchLoading,
    GogoSearchGetMore
  }
}
</script>

<style lang="stylus" scoped>
  .gogo-logo
    width: 130px
    height: 62px
    display: block
    margin: 0 auto

  .gogo-search-bar
    margin-bottom: 10px

  .gogo-search-loading
    position: fixed
    top: 200px
    left: 50%

</style>
