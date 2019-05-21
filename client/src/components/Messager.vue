<template>
  <v-flex xs12>
    <v-alert
      dismissible
      :icon="message.icon"
      v-model="showMessage"
      :type="message.status"
      :outline="message.outline"
    >
      {{ message.content }}
    </v-alert>
  </v-flex>
</template>

<script>
  export default {
    name: "Messager",
    props: {
      message: {
        type: Object,
        default: () => ({
          icon: '',
          content: '',
          status: 'success',
          outline: false
        })
      },
      showMessageStatusSuccess: {
        type: Boolean,
        default: false
      },
    },
    data: () => ({

    }),
    computed: {
      showMessage: {
        get: function () {
          return this.message.content !== '' && (this.showMessageStatusSuccess || this.message.status !== 'success')
        },
        // eslint-disable-next-line
        set: function (value) {

        }
      },
    },
    created () {

    }
  }
</script>

<style scoped>

</style>
