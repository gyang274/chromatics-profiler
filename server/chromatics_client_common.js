const axios = require('axios')

async function getImageb64FromImageURL (imageURL) {
  // console.log('getImageb64FromImageURL (imageURL)', imageURL)
  return new Promise(
    (resolve, reject) => {
      axios.get(
        imageURL, {
          responseType: 'arraybuffer'
        }
      ).then(
        response => {
          resolve(new Buffer(response.data).toString('base64'))
        }
      ).catch(
        error => {
          reject(new Error('getImageb64FromImageURL (imageURL) fail!' + error))
        }
      )
    }
  )
}

async function getChromaticProfileFromImage64WithPromise (request, client) {

  return new Promise(
    (resolve, reject) => {
      client.getChromaticProfile(
        request, (error, response) => {
          if (error) {
            console.log(
              'chromatics_client_common|getChromaticProfileFromImage64WithPromise|GetChromaticProfile Error:', error
            )
            reject(error)
          } else {
            console.log(
              'chromatics_client_common|getChromaticProfileFromImage64WithPromise|GetChromaticProfile:', response
            )
            resolve(response)
          }
        }
      )
    }
  )

}

async function getChromaticProfileFromImage64WithCallback (request, client) {

  try {
    client.getChromaticProfile(
      request, (error, response) => {
        if (error) {
          console.log(
            'chromatics_client_common|getChromaticProfileFromImage64WithCallback|GetChromaticProfile Error:', error
          )
          return error
        } else {
          console.log(
            'chromatics_client_common|getChromaticProfileFromImage64WithCallback|GetChromaticProfile:', response
          )
          return response
        }
      }
    )
  } catch (error) {
    console.error(error)
  }
  
}

module.exports = {
  getImageb64FromImageURL: getImageb64FromImageURL,
  getChromaticProfileFromImage64: getChromaticProfileFromImage64WithPromise,
  getChromaticProfileFromImage64WithPromise: getChromaticProfileFromImage64WithPromise,
  getChromaticProfileFromImage64WithCallback: getChromaticProfileFromImage64WithCallback,
}

