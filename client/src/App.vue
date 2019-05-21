<template>
  <v-app light>
    <apps-header></apps-header>
    <br>
    <router-view></router-view>
    <br>
    <apps-footer></apps-footer>
  </v-app>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'

  export default {
    name: 'app',
    components: {
      appsHeader: Header,
      appsFooter: Footer,
    },
    data: () => (
      {

      }
    ),
  }
</script>

<style lang="stylus">
  @import './stylus'
</style>
