<template>
  <div class="search">
    <router-link class="to-home" to="/">
      <gogo-logo></gogo-logo>
    </router-link>
  </div>
</template>
<script>
import GogoLogo from '../components/GogoLogo.vue'

export default {
  name: 'Search',
  components: {
    GogoLogo
  }
}
</script>

<style lang="stylus" scoped>
  .to-home
    width: 130px
    height: 62px
    display: block
    margin: 0 auto
</style>
