<template>
  <div class="home">
    <gogo-logo class="logo"></gogo-logo>
    <gogo-search-bar
      class="search-bar"
      @search="toSearchPage"
    ></gogo-search-bar>

    <div class="author">
      <p>
        欢迎给提供API的作者<a href="https://github.com/zenuo/gogo">🌟</a>
      </p>
      <p>
        或者给本项目<a href="https://github.com/obulks/gogo-mobile-search">🌟</a>
      </p>
    </div>
  </div>
</template>

<script>
import GogoLogo from '../components/GogoBaseLogo.vue'
import GogoSearchBar from '../components/GogoSearchBar.vue'

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
  
  .home
    background-color: #fff
  
  .logo
    display: block
    margin: 80px auto 20px auto
  .author
    margin-top: 30px
    text-align: center
    p
      font-size: 16px
      line-height: 1.5
      a
        -webkit-tap-highlight-color: transparent;

</style>
