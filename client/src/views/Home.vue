<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout row wrap>
            <v-flex xs12><br><br></v-flex>
            <v-flex xs12 md6>
              <apps-ontologizer />
            </v-flex>
            <v-flex xs12 md6>
              <apps-color-schemer />
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Ontologizer from '@/components/Ontologizer'
  import ColorSchemer from '@/components/ColorSchemer'

  export default {
    components: {
      appsOntologizer: Ontologizer,
      appsColorSchemer: ColorSchemer,
    }
  }
  
</script>
