<template>
  <div class="search">
    <gogo-logo
      class="gogo-logo"
      @click.native="toHome"
    />

    <gogo-search-bar
      class="gogo-search-bar"
      @search="doSearch"
      :search-text="searchText"
    />

    <div class="search-result-list-wrapper">
      <gogo-search-item
        v-for="item in searchResults"
        :entries="item"
      />
    </div>

    <gogo-search-loader
      class="gogo-search-loader"
      v-show="searchLoaderFlag"
    />

    <div
      class="tips"
      v-show="tipsFlag"
    >
      {{tipsMessage}}
    </div>

    <gogo-scroll-top/>

    <gogo-search-get-more
      @click.native="getMore"
      v-show="getMoreFlag"
      :show-loader="getMoreLoaderFlag"
    />
  </div>
</template>
<script>
import GogoLogo from '../components/GogoBaseLogo'
import GogoSearchBar from '../components/GogoSearchBar'
import GogoSearchItem from '../components/GogoSearchItem'
import GogoSearchLoader from '../components/GogoSearchLoader'
import GogoSearchGetMore from '../components/GogoSearchGetMore'
import GogoScrollTop from '../components/GogoBaseScrollTop.vue'

import debounce from 'lodash/debounce'
import {getSearchResult} from '../api/api'

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
      tipsMessage: '',
      tipsFlag: false
    }
  },
  methods: {
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
    showTips() {
      this.tipsFlag = true
    },
    hideTips() {
      this.tipsFlag = false
    },
    changeTipsMessage(text) {
      this.tipsMessage = text
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
        this.hideTips()
        this.setPath(searchText)
        getSearchResult({
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
            this.changeTipsMessage('无法搜索到相关内容')
            this.showTips()
          })
      }, 500, {
        leading: true,
        trailing: false
      }
    ),
    getMore: debounce(function () {
      this.page++
      this.showGetMoreLoader()
      getSearchResult({
        searchText: this.searchText,
        page: this.page
      })
        .then(res => {
          this.hideGetMoreLoader()
          const data = res.data
          this.searchResults.push(...data.entries)
        })
        .catch(err => {
          this.changeTipsMessage('搜索不到更多内容')
          this.showTips()
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
  },
  components: {
    GogoLogo,
    GogoScrollTop,
    GogoSearchBar,
    GogoSearchItem,
    GogoSearchLoader,
    GogoSearchGetMore,
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

  .tips
    margin: 20px 0
    font-size: 14px
    text-align: center

</style>
