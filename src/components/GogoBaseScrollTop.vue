<template>
  <div
    class="scroll-top-wrapper"
  >
    <transition name="scale">
      <button
        @click="scrollToTop"
        v-show="toTopFlag"
      >
      <span class="icon">
        <svg class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200"
             height="200"><path
          d="M640 608c-6.4 0-19.2 0-25.6-6.4L512 492.8 409.6 601.6c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8l128-128c12.8-12.8 32-12.8 44.8 0l128 128c12.8 12.8 12.8 32 0 44.8C659.2 608 646.4 608 640 608z"
          p-id="2896"></path></svg>
      </span>
      </button>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

export default {
  name: 'GogoBaseScrollTop',
  data() {
    return {
      toTopFlag: false,
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
      }, {
        // scroll事件只调用一次，在调用后自动移除
        once: true
      })
    },
    handleScroll: throttle(function () {
      // 滚动时显示和隐藏的临界值
      let sign = 120
      let currentScrollTop = this.getScrollTop()
      if (currentScrollTop < sign) {
        this.hideToTop()
      } else {
        this.scrollDirection((direction) => {
          if (direction === 'up' && currentScrollTop > sign) {
            this.showToTop()
          } else {
            this.hideToTop()
          }
        })
      }
    }, 300, {
      leading: true,
      // 在超时后还能继续调用
      trailing: true
    }),
    scrollToTop() {
      let dom
      // 兼容不同浏览器
      let testScroll = document.documentElement.scrollTop
      if(!testScroll) {
        dom = document.body
      } else {
        dom = document.documentElement
      }
      let that = this
      let scrollTop = this.getScrollTop()
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
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.addEventListener('scroll', this.handleScroll)
  }
}
</script>

<style lang="stylus" scoped>

  // 显示和隐藏时的过渡动画
  .scale-enter, .scale-leave-to {
    transform: scale(0)
  }

  .scale-leave, .scale-enter-to {
    transform: scale(1)
  }

  .scale-enter-active, .scale-leave-active {
    transition: all .2s
  }

  .scroll-top-wrapper
    position: fixed
    bottom: 80px
    right: 15px
    width: 44px
    height: 44px
    z-index: 100
    background-color: #fff

  button
    width: 44px
    height: 44px
    padding: 0
    margin: 0
    background-color: #fff
    border: 1px solid #fff
    border-radius: 50%
    box-shadow: 0 0 2px #666

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