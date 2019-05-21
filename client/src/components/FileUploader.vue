<template>
  <v-layout row wrap>
    <v-flex xs8>
      <v-text-field
        :label="label"
        v-model="name"
        @click.native="$refs.inputer.click"
        prepend-icon='attach_file'
      ></v-text-field>
    </v-flex>
    <v-flex xs4>
      <v-btn
        block
        class="primary"
        v-text="label"
        @click.native="$refs.inputer.click"
      >
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <input
        ref="inputer"
        style="display: none"
        type="file"
        :accept="accept"
        @change="setFile"
      />
    </v-flex>
    <!--messager-->
    <apps-messager
      :message="message"
    ></apps-messager>
  </v-layout>
</template>

<script>

  import Messager from '../components/Messager'

  export default {
    name: "FileUploader",
    props: {
      label: {
        type: String,
        default: 'Select A File From Disk'
      },
      accept: {
        type: String,
        default: ''
      },
    },
    components: {
      appsMessager: Messager
    },
    data: () => ({
      name: '',
      message: {
        content: '',
        status: 'success',
      },
    }),
    methods: {
      setFile (event) {
        let files = event.target.files || event.dataTransfer.files
        // console.log('files: ', files)
        if (files.length > 0) {
          this.name = files[0].name
          this.$emit('set-file', files[0])
        } else {
          this.message.content = 'Messager->setFile (event) fail! File Invalid!'
          this.message.status = 'error'
        }
      }
    }
  }
</script>

<style scoped>

</style>