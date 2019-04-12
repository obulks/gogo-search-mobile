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

    <gogo-search-loader
      class="gogo-search-loader"
      v-show="searchLoading"
    >
    </gogo-search-loader>
    <div
      class="search-result-list"
      v-for="item in searchResults"
    >
      <gogo-search-item :entries="item"/>
    </div>

    <gogo-search-get-more
      @click.native="getMore"
      v-show="!searchLoading"
      :show-loader="getMoreLoading"
    >
    </gogo-search-get-more>
  </div>
</template>
<script>
import GogoLogo from '../components/GogoBaseLogo'
import GogoSearchBar from '../components/GogoSearchBar'
import GogoSearchItem from '../components/GogoSearchItem'
import GogoSearchLoader from '../components/GogoSearchLoader'
import GogoSearchGetMore from '../components/GogoSearchGetMore'

export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      searchResults: [],
      defaultPage: 1,
      page: 1,
      searchLoading: false,
      getMoreLoading: false
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
    onSearchLoading() {
      this.searchLoading = true
    },
    offSearchLoading() {
      this.searchLoading = false
    },
    onGetMoreLoading() {
      this.getMoreLoading = true
    },
    offGetMoreLoading() {
      this.getMoreLoading = false
    },
    doSearch(searchText, page = this.defaultPage) {
      // 每次进行搜索时，把page初始化为 1
      this.page = 1
      this.searchText = searchText
      this.onSearchLoading()
      this.setPath(searchText)
      this.getSearchResult({
        searchText,
        page
      })
        .then(res => {
          this.offSearchLoading()
          const data = res.data
          this.searchResults = data.entries
        })
        .catch(err => {
          this.offSearchLoading()
          console.log(err)
        })
    },
    getMore() {
      // console.log('g')
      this.page++
      this.onGetMoreLoading()
      this.getSearchResult({
        searchText: this.searchText,
        page: this.page
      })
        .then(res => {
          this.offGetMoreLoading()
          const data = res.data
          this.searchResults.push(...data.entries)
        })
        .catch(err => {
          this.onGetMoreLoading()
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
    GogoSearchLoader,
    GogoSearchGetMore
  }
}
</script>

<style lang="stylus" scoped>
  .gogo-logo
    height: 62px
    display: block
    margin: 0 auto

  .gogo-search-bar
    margin-bottom: 10px

  .gogo-search-loader
    position: fixed
    top: 200px
    left: 50%

</style>
