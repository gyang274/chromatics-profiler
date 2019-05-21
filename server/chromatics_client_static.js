const grpc = require('grpc')

const messages = require('./chromatics_pb')
const services = require('./chromatics_grpc_pb')

const chromatics_client_common = require('./chromatics_client_common')


async function main () {

  let client = new services.ProfilerClient(
    '127.0.0.1:50051', grpc.credentials.createInsecure()
  )
  
  let request = new messages.Image()

  let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Thonet_chair_no.18.jpg/180px-Thonet_chair_no.18.jpg'

  // getChromaticProfileFromImage64WithCallback
  let imageBase64 = await chromatics_client_common.getImageb64FromImageURL(imageURL)
  
  request.setB64(imageBase64)

  let response = await chromatics_client_common.getChromaticProfileFromImage64WithCallback(
    request, client
  )
  
  console.log(
    'chromatics_client_static|main|getChromaticProfileFromImage64WithCallback|response:', response
  )

  // getChromaticProfileFromImage64WithPromise
  chromatics_client_common.getImageb64FromImageURL(
    imageURL
  ).then(
    response => {
      request.setB64(response)
      return chromatics_client_common.getChromaticProfileFromImage64WithPromise(
        request, client
      )
    }
  ).then(
    response => {
      console.log(
        'chromatics_client_static|main|getChromaticProfileFromImage64WithPromise|response:', response.getHslpList()
      )
    }
  ).catch(
    error => {
      console.log(
        'chromatics_client_static|main|getChromaticProfileFromImage64WithPromise|error:', error
      )
    }
  )

}

main()

