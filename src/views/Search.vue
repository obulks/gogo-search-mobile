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
      v-show="searchLoaderFlag"
    >
    </gogo-search-loader>
    <div
      class="search-result-list"
      v-for="item in searchResults"
    >
      <gogo-search-item :entries="item"/>
    </div>

    <div
      class="bottom-tips"
      v-show="bottomTipsFlag"
    >
      搜索不到更多内容
    </div>

    <gogo-search-get-more
      @click.native="getMore"
      v-show="getMoreFlag"
      :show-loader="getMoreLoaderFlag"
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

import debounce from 'lodash/debounce'

export default {
  name: 'Search',
  data() {
    return {
      searchText: '',
      searchResults: [],
      page: 1,
      defaultPage: 1,
      searchLoaderFlag: false,
      getMoreFlag: false,
      getMoreLoaderFlag: false,
      bottomTipsFlag: false
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
    showSearchLoader() {
      this.searchLoaderFlag = true
    },
    hideSearchLoader() {
      this.searchLoaderFlag = false
    },
    showGetMoreLoader() {
      this.getMoreLoaderFlag = true
    },
    hideGetMoreLoader() {
      this.getMoreLoaderFlag = false
    },
    showBottomTips() {
      this.bottomTipsFlag = true
    },
    hideBottomTips() {
      this.bottomTipsFlag = false
    },
    showGetMoreBotton() {
      this.getMoreFlag = true
    },
    hideGetMoreBotton() {
      this.getMoreFlag = false
    },
    doSearch: debounce(function (searchText, page = this.defaultPage) {
        this.page = 1
        this.searchText = searchText
        this.showSearchLoader()
        this.hideBottomTips()
        this.setPath(searchText)
        this.getSearchResult({
          searchText,
          page
        })
          .then(res => {
            this.hideSearchLoader()
            this.showGetMoreBotton()
            const data = res.data
            this.searchResults = data.entries
          })
          .catch(err => {
            this.hideSearchLoader()
            console.log(err)
          })
      }, 500, {
        leading: true,
        trailing: false
      }
    ),
    getMore: debounce(function () {
      this.page++
      this.showGetMoreLoader()
      this.getSearchResult({
        searchText: this.searchText,
        page: this.page
      })
        .then(res => {
          this.hideGetMoreLoader()
          const data = res.data
          this.searchResults.push(...data.entries)
        })
        .catch(err => {
          this.showBottomTips()
          this.hideGetMoreLoader()
          this.hideGetMoreBotton()
        })

    }, 500, {
      leading: true,
      trailing: false
    }),
  },
  mounted() {
    if (this.$route.query.text === undefined) {
      return
    }
    this.searchText = this.$route.query.text
    this.doSearch(this.searchText)
  }
  ,
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

  .bottom-tips
    margin: 20px 0
    font-size: 14px
    text-align: center

</style>
