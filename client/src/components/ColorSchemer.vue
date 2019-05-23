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
    <v-flex xs2>
      <v-sheet
        class="d-flex"
        :color="chex"
      >
        <sheet-footer>
          TODO: build a color viwer with complementary color, analogous color and etc.
        </sheet-footer>
      </v-sheet>
    </v-flex>

    
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      chex: '#ff0808'
    }),
    computed: {

    }
  }
</script>

<style>

</style>
