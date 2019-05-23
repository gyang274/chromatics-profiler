<template>
  <v-layout row wrap>
    <v-flex xs12 sm8>
      <v-text-field
        name="Color Hex Code"
        label="Color Hex Code"
        single-line
        prepend-icon="camera"
        v-model="chex"
        @keyup.native.enter="setColorHexCode(chex)"
      ></v-text-field>
    </v-flex>
    <v-flex xs12 sm4>
      <v-btn
        block
        class="primary white--text"
        @click.native="setColorHexCode(chex)"
      >
        <v-icon left dark>send</v-icon>SET COLOR HEX CODE
      </v-btn>
    </v-flex>
    <v-flex xs12><br></v-flex>
    <v-flex xs12>
      <img 
        src="./ColorSchemer/color-scheme.jpg"
        style='height: 100%; width: 100%; object-fit: contain'
      >
    </v-flex>
    <template v-if="dhex !== ''">
      <v-flex xs12><br></v-flex>
      <v-flex xs12>
        <v-sheet
          class="d-flex"
          :color="dhex"
        >
          <sheet-footer>
            <h4>
              &nbsp;&nbsp;TODO: build a color viwer with complementary color, analogous color and etc.
            </h4>
          </sheet-footer>
        </v-sheet>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      chex: '#ffffff',
      dhex: ''
    }),
    computed: {

    },
    methods: {
      setColorHexCode (chex) {
        console.log(`set ${ chex } to dhex`)
        this.dhex = chex
      }
    }
  }
</script>

<style>

</style>
