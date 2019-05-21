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
              <v-sheet
                class="d-flex"
                color="#0808ff"
                height="424"
              >
                <sheet-footer>
                  TODO: build a color viwer with complementary color, analogous color and etc.
                </sheet-footer>
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Ontologizer from '@/components/Ontologizer'

  export default {
    components: {
      appsOntologizer: Ontologizer
    }
  }
</script>
