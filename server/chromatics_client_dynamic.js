const PROTO_PATH = __dirname + '/../proto/chromatics.proto'

// const PROTO_PATH = '/yg/technism/gits/chromatics/proto/chromatics.proto'
let axios = require('axios')

const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,{
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
)

const chromatics_proto = grpc.loadPackageDefinition(packageDefinition).chromatics

const chromatics_client_common = require('./chromatics_client_common')


async function main () {

  let client = new chromatics_proto.Profiler(
    '127.0.0.1:50051', grpc.credentials.createInsecure()
  )

  let imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Thonet_chair_no.18.jpg/180px-Thonet_chair_no.18.jpg'

  // getChromaticProfileFromImage64WithCallback
  let imageBase64 = await chromatics_client_common.getImageb64FromImageURL(imageURL)
  
  let response = await chromatics_client_common.getChromaticProfileFromImage64WithCallback(
    {'b64': imageBase64}, client
  )
  
  console.log(
    'chromatics_client_dynamic|main|getChromaticProfileFromImage64WithCallback|response:', response
  )

  // getChromaticProfileFromImage64WithPromise
  chromatics_client_common.getImageb64FromImageURL(
    imageURL
  ).then(
    response => {
      return chromatics_client_common.getChromaticProfileFromImage64WithPromise(
        {'b64': response}, client
      )
    }
  ).then(
    response => {
      console.log(
        'chromatics_client_dynamic|main|getChromaticProfileFromImage64WithPromise|response:', response
      )
    }
  ).catch(
    error => {
      console.log(
        'chrochromatics_client_dynamicmatics|main|getChromaticProfileFromImage64WithPromise|error:', error
      )
    }
  )
    

}

main()