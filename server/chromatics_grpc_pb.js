// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var chromatics_pb = require('./chromatics_pb.js');

function serialize_chromatics_ChromaticProfile(arg) {
  if (!(arg instanceof chromatics_pb.ChromaticProfile)) {
    throw new Error('Expected argument of type chromatics.ChromaticProfile');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chromatics_ChromaticProfile(buffer_arg) {
  return chromatics_pb.ChromaticProfile.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_chromatics_Image(arg) {
  if (!(arg instanceof chromatics_pb.Image)) {
    throw new Error('Expected argument of type chromatics.Image');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_chromatics_Image(buffer_arg) {
  return chromatics_pb.Image.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProfilerService = exports.ProfilerService = {
  getChromaticProfile: {
    path: '/chromatics.Profiler/GetChromaticProfile',
    requestStream: false,
    responseStream: false,
    requestType: chromatics_pb.Image,
    responseType: chromatics_pb.ChromaticProfile,
    requestSerialize: serialize_chromatics_Image,
    requestDeserialize: deserialize_chromatics_Image,
    responseSerialize: serialize_chromatics_ChromaticProfile,
    responseDeserialize: deserialize_chromatics_ChromaticProfile,
  },
};

exports.ProfilerClient = grpc.makeGenericClientConstructor(ProfilerService);
