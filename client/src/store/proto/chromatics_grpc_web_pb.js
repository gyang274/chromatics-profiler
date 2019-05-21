/**
 * @fileoverview gRPC-Web generated client stub for chromatics
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!

/* eslint-disable */

const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.chromatics = require('./chromatics_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.chromatics.ProfilerClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.chromatics.ProfilerPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

  /**
   * @private @const {?Object} The credentials to be used to connect
   *    to the server
   */
  this.credentials_ = credentials;

  /**
   * @private @const {?Object} Options for the client
   */
  this.options_ = options;
};


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.chromatics.Image,
 *   !proto.chromatics.ChromaticProfile>}
 */
const methodInfo_Profiler_GetChromaticProfile = new grpc.web.AbstractClientBase.MethodInfo(
  proto.chromatics.ChromaticProfile,
  /** @param {!proto.chromatics.Image} request */
  function(request) {
    return request.serializeBinary();
  },
  proto.chromatics.ChromaticProfile.deserializeBinary
);


/**
 * @param {!proto.chromatics.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.chromatics.ChromaticProfile)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.chromatics.ChromaticProfile>|undefined}
 *     The XHR Node Readable Stream
 */
proto.chromatics.ProfilerClient.prototype.getChromaticProfile =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/chromatics.Profiler/GetChromaticProfile',
      request,
      metadata || {},
      methodInfo_Profiler_GetChromaticProfile,
      callback);
};


/**
 * @param {!proto.chromatics.Image} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.chromatics.ChromaticProfile>}
 *     A native promise that resolves to the response
 */
proto.chromatics.ProfilerPromiseClient.prototype.getChromaticProfile =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/chromatics.Profiler/GetChromaticProfile',
      request,
      metadata || {},
      methodInfo_Profiler_GetChromaticProfile);
};


module.exports = proto.chromatics;

