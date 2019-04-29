<template>
  <div
    class="scroll-top-wrapper"
    v-show="toTopFlag"
  >
    <button @click="scrollToTop">
      <span class="icon">
        <svg class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200"
             height="200"><path
          d="M640 608c-6.4 0-19.2 0-25.6-6.4L512 492.8 409.6 601.6c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8C659.2 608 646.4 608 640 608z"
          p-id="2896"></path></svg>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'GogoBaseScrollTop',
  data() {
    return {
      toTopFlag: false,
      scrollTop: 0
    }
  },
  methods: {
    showToTop() {
      this.toTopFlag = true
    },
    hideToTop() {
      this.toTopFlag = false
    },
    getScrollTop() {
      return document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop ||
        0
    },
    handleScroll() {
      this.scrollTop = this.getScrollTop()
      this.scrollDirection((direction) => {
        if (direction === 'up' && this.scrollTop > 120) {
          this.showToTop()
        } else {
          this.hideToTop()
        }
      })
    },
    scrollToTop() {
      let dom = document.documentElement
      let that = this
      let scrollTop = this.scrollTop
      let timer = null;
      cancelAnimationFrame(timer)
      timer = requestAnimationFrame(function fn() {
        if (scrollTop > 5000) {
          scrollTop -= 1000
          dom.scrollTop = scrollTop
          timer = requestAnimationFrame(fn)
        } else if (scrollTop > 1000 && scrollTop <= 5000) {
          scrollTop -= 500
          dom.scrollTop = scrollTop
          timer = requestAnimationFrame(fn)
        } else if (scrollTop > 200 && scrollTop <= 1000) {
          scrollTop -= 80
          dom.scrollTop = scrollTop
          timer = requestAnimationFrame(fn)
        } else if (scrollTop > 50 && scrollTop <= 200) {
          scrollTop -= 16
          dom.scrollTop = scrollTop
          timer = requestAnimationFrame(fn)
        } else if (scrollTop > 0 && scrollTop <= 50) {
          scrollTop -= 8
          dom.scrollTop = scrollTop
          timer = requestAnimationFrame(fn)
        } else {
          cancelAnimationFrame(timer);
          that.hideToTop()
        }
      })
    },
    scrollDirection(cb) {
      let before = this.getScrollTop()
      let that = this
      window.addEventListener('scroll', function () {
        let after = that.getScrollTop()
        let delta = after - before;
        if (delta === 0) {
          return false
        }
        cb(delta > 0 ? 'down' : 'up')
        before = after
      })
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    // window.addEventListener('scroll', this.scrollDirection)
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>

  .scroll-top-wrapper
    position: fixed
    bottom: 80px
    right: 15px
    z-index: 100

  button
    width: 44px
    height: 44px
    padding: 0
    margin: 0
    background-color: #fff
    border: 1px solid #dadada
    border-radius: 50%
    box-shadow: 0 0 2px rgba(32, 33, 36, 0.28)

    &:focus
      outline: none

  .icon
    display: inline-block
    width: 24px
    height: 24px
    text-align: center
    line-height: inherit

    svg
      fill: #909090
      width: 24px
      height: 24px
</style>