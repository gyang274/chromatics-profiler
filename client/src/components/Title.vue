<template>
  <v-layout row wrap>
    <v-flex
      xs12
      class="primary--text text-xs-center"
    >
      <img v-if="showLogo"
        style="display: inline"
        src="@/assets/logo.png"
        height="48"
        width="48"
      />
      <h2
        style="display: inline"
        v-text="title"
      >
      </h2>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: "Title",
    props: {
      title: String,
      showLogo: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style scoped>

</style>