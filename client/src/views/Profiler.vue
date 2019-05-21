<template>
  <v-app>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-layout row wrap>
            <v-flex xs12><br><br></v-flex>
            <!--main title-->
            <v-flex xs12>
              <apps-title
                :title="title"
              ></apps-title>
            </v-flex>
            <!-- input image via url -->
            <v-flex xs12 sm8>
              <v-text-field
                name="imageURL"
                label="Image URL"
                single-line
                prepend-icon="camera"
                v-model="imageURL"
                @keyup.native.enter="onImageURLChange(imageURL)"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-btn
                block
                class="primary white--text"
                @click.native="onImageURLChange(imageURL)"
              >
                SET IMAGE FROM URL
                <v-icon right dark>cloud_upload</v-icon>
              </v-btn>
            </v-flex>
            <!--input image via file-->
            <v-flex xs12>
              <apps-file-uploader
                :label="'Or Select An Image from Disk'"
                @set-file="onImageFileChange"
                :accept="'image/*'"
              ></apps-file-uploader>
            </v-flex>
            <!--init grpc-->
            <v-flex xs12 sm12>
              <v-btn
                block
                class="primary white--text"
                @click.native="setImagecprFromImageb64(imageb64)"
              >
                GET CHROMATIC PROFILE
                <v-icon right dark>fingerprint</v-icon>
              </v-btn>
            </v-flex>
            <!--main image-->
            <v-flex xs12 sm4 offset-sm1>
              <img class="input-image" :src="imageb64">
            </v-flex>
            <!--grpc output-->
            <v-flex xs12 sm4 offset-sm2 class="output-container" v-if="showResult">
              <div
                class="inference-model"
                v-text="'From Chromatics Profiler:'"
              >
              </div>
              <div
                v-for="(value, index) in imagecpr"
                :key="index"
                class="output-class"
                :class="{ predicted: index === 0 && value.array[0] }"
              >
                <div
                  class="output-label"
                  v-text="`HSL(
                    ${value.array[0]},
                    ${value.array[1]},
                    ${value.array[2]}
                  )`"
                >
                </div>
                <div class="output-bar"
                  :style="{
                    width: `${ Math.round(value.array[3] * 100) / 100 }px`,
                    background: `hsla(
                      ${ value.array[0] }, 
                      ${ value.array[1] + '%' },
                      ${ value.array[2] + '%' },
                      ${ 100 }
                    )`
                  }"
                >
                </div>
                <div
                  class="output-value"
                  v-text="Math.round(value.array[3] * 100) / 100 + '%'"
                >
                </div>
              </div>
            </v-flex>
            <!--messager-->
            <v-flex xs12>
              <apps-messager
                :message="message"
              ></apps-messager>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  // import _ from 'lodash'
  // import axios from 'axios'
  // import XMLHttpRequestPromise from 'xhr-promise'

  // import tinycolor from 'tinycolor2'
  // import { Sketch, Slider } from 'vue-color'

  // eslint-disable-next-line
  import { mapGetters, mapActions } from 'vuex'

  import Title from '../components/Title'
  import Messager from '../components/Messager'
  import FileUploader from '../components/FileUploader'

  export default {
    name: 'profiler',
    components: {
      // appsSketchPicker: Sketch,
      // appsSliderPicker: Slider,
      appsTitle: Title,
      appsMessager: Messager,
      appsFileUploader: FileUploader,
      // appsColorProfiler: ColorProfiler,
    },
    data: () => ({
      // main
      title: 'Chormatics',
      imageURL: '',
      imageb64: '',
      imagecpr: [],
      message: {
        content: '',
        status: 'success',
      },
    }),
    computed: {
      ...mapGetters({
        
      }),
      showResult () {
        return Object.keys(this.imagecpr).length !== 0
      }
    },
    watch: {
    },
    methods: {
      ...mapActions({
        getImagecprFromImageb64: 'getImagecprFromImageb64',
        getImageb64FromImageURL: 'getImageb64FromImageURL',
        setImageURLWithCORS: 'setImageURLWithCORS',
        getImageb64FromImageFile: 'getImageb64FromImageFile',
        setImageFileFromDisk: 'setImageFileFromDisk',
      }),

      resets () {
        this.imageb64 = ''
        this.imagecpr = []
        this.message = {
          content: '',
          status: 'success',
        }
      },

      async onImageURLChange (imageURL) {
        // console.log('onImageURLChange (imageURL)', imageURL)
        this.resets()
        return new Promise(
          (resolve, reject) => {
            this.setImageURLWithCORS(
              imageURL
            ).then(
              response => {
                return this.getImageb64FromImageURL(response)
              }
            ).then(
              response => {
                this.imageb64 = response
              }
            ).then(
              response => {
                this.message.content = 'onImageURLChange (imageURL) ok!' + response
                this.message.status = 'success'
                resolve('onImageURLChange (imageURL) ok!')
              }
            ).catch(
              error => {
                // console.log('onImageURLChange (imageURL) fail!', error)
                this.message.content = 'onImageURLChange (imageURL) fail!' + error
                this.message.status = 'error'
                reject(new Error('onImageURLChange (imageURL) fail!' + error))
              }
            )
          }
        )
      },

      async onImageFileChange (event) {
        // console.log('onImageFileChange (event)', event)
        this.resets()
        return new Promise(
          (resolve, reject) => {
            this.setImageFileFromDisk(
              event
            ).then(
              response => {
                return this.getImageb64FromImageFile(response)
              }
            ).then(
              response => {
                this.imageb64 = response
              }
            ).then(
              response => {
                this.message.content = 'onImageFileChange (event) ok!' + response
                this.message.status = 'success'
                resolve('onImageFileChange (event) ok!')
              }
            ).catch(
              error => {
                // console.log('onImageFileChange (event) fail!', error)
                this.message.content = 'onImageFileChange (event) fail!' + error
                this.message.status = 'error'
                reject(new Error('onImageFileChange (event) fail!' + error))
              }
            )
          }
        )

      },

      async setImagecprFromImageb64 (imageb64) {
        // v-text-field set number as string
        return new Promise(
          (resolve, reject) => {
            this.getImagecprFromImageb64(imageb64).then(
              response => {
                this.imagecpr = response
                resolve('setImagecprFromImageb64 (imageb64) ok!' + response)
              }
            ).catch(
              error => {
                reject(new Error('setImagecprFromImageb64 (imageb64) fail!' + error))
              }
            )
          }
        )
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!-- TODO: how to use postcss with vue? where is postcss.config.js? -->
<style lang="postcss" scoped>
  img.input-image {
    height: 300px;
    max-width: 900px;
  }

  input[type=file] {
    display: inline-block;
    width: 0px;
    height: 0px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }
  input[type=file] + label {
    display:inline-block;
    margin:0px;
    padding: 4px 32px;
    background-color: #FFFFFF;
    border:solid 1px #5e35b1;
    border-radius: 10px;
    color:#5e35b1;
  }
  input[type=file]:active + label {
    background-image: none;
    background-color:#5e35b1;
    color:#FFFFFF;
  }

  .output-container {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .output-container .inference-model {
    align-self: left;
    font-size: 16px;
    color: #69707a;
    margin-bottom: 10px;
  }
  .output-container .inference-model .inference-model-value {
    color: #5e35b1;
  }
  .output-container .output-class {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 6px 0;
  }
  .output-container .output-class .output-label {
    text-align: right;
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
    color: #393e46;
    padding: 0 6px;
    border-right: 2px solid #b39ddb;
  }
  .output-container .output-class .output-bar {
    height: 8px;
    transition: width 0.2s ease-out;
  }
  .output-container .output-class .output-value {
    text-align: left;
    margin-left: 5px;
    font-size: 14px;
    color: #69707a;
  }
  .output-container .output-class.predicted .output-label {
    color: #5e35b1;
    border-left-color: #5e35b1;
  }
  .output-container .output-class.predicted .output-value {
    color: #5e35b1;
  }
</style>
