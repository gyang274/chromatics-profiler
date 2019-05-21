import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios'

const messages = require('./proto/chromatics_pb')
const services = require('./proto/chromatics_grpc_web_pb')


export default new Vuex.Store({
  state () {
    // const cors_engine = 'http://127.0.0.1:80/cors/'
    const cors_engine = 'https://cors-anywhere.herokuapp.com/'
    // connect to grpc server for chromatic profiling
    const client = new services.ProfilerClient('http://127.0.0.1:9090')
    return {
      cors_engine: cors_engine,
      client: client,
    }
  },
  getters: {
    // eslint-disable-next-line
    cors_engine: (state, getters) => {
      return state.cors_engine
    },
    // eslint-disable-next-line
    client: (state, getters) => {
      return state.client
    },
  },
  mutations: {

  },
  actions: {
    async getImagecprFromImageb64 (context, payload) {
      // console.log('getImagecprFromImageb64 (imageb64)', payload)
      return new Promise(
        (resolve, reject) => {
          
          let request = new messages.Image()
          
          request.setB64(payload.split(',')[1])

          // let metadata = {'content-type': 'application/grpc-web-text'}
          // let metadata = {'content-type': 'application/grpc-web+proto'}
          // let metadata = {'content-type': 'application/grpc-web+json'}
          // let metadata = {'content-type': 'application/grpc-web'}
          // let metadata = {'content-type': 'application/grpc'}
          let metadata = {}

          context.state.client.getChromaticProfile(
            request, metadata, (error, response) => {
              if (error) {
                console.log('getImagecprFromImageb64 Error:', error)
                reject(new Error('getImagecprFromImageb64 (imageb64) fail!' + error))
              } else {
                console.log('getImagecprFromImageb64:', response.getHslpList())
                resolve(response.getHslpList())
              }
            }
          )
          
        }
      )
    },
    async getImageb64FromImageURL (context, payload) {
      // console.log('getImageb64FromImageURL (imageURL)', payload)
      return new Promise(
        (resolve, reject) => {
          axios.get(
            payload, {
              responseType: 'blob'
            }
          ).then(
            response => {
              let reader = new FileReader()
              reader.readAsDataURL(response.data)
              reader.onloadend = () => {
                resolve(reader.result)
              }
            }
          ).catch(
            error => {
              reject(new Error('getImageb64FromImageURL (imageURL) fail!' + error))
            }
          )
        }
      )
    },
    async setImageURLWithCORS (context, payload) {
      // console.log('setImageURLWithCORS (imageURL)', payload)
      return new Promise(
        (resolve, reject) => {
          if (payload.match(/\.(jpeg|jpg|png)$/) !== null) {
            resolve(context.state.cors_engine + payload)
          } else if (payload.match() !== null) {
            resolve(context.state.cors_engine + payload)
          } else {
            reject(new Error('setImageURL (imageURL) fail!'))
          }
        }
      )
    },
    async getImageb64FromImageFile (context, payload) {
      // console.log('getImageb64FromImageFile (file)', payload)
      return new Promise(
        (resolve, reject) => {
          try {
            let reader = new FileReader()
            reader.readAsDataURL(payload)
            reader.onloadend = () => {
              resolve(reader.result)
            }
          } catch (error) {
            reject(new Error('getImageb64FromImageFile (file) fail!' + error))
          }
        }
      )
    },
    async setImageFileFromDisk (context, payload) {
      // console.log('setImageFileFromDisk (event)', payload)
      return new Promise(
        (resolve, reject) => {
          if (payload) {
            resolve(payload)
          } else {
            reject(new Error('setImageFileFromDisk (event) fail!'))
          }
        }
      )
    },
  }
})
