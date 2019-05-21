import grpc
import time

from concurrent import futures

import chromatics_pb2
import chromatics_pb2_grpc

from chromatics_core import get_image_primary_ccodec

_ONE_DAY_IN_SECONDS = 60 * 60 *24


class Profiler(chromatics_pb2_grpc.ProfilerServicer):

  def GetChromaticProfile(self, request, context):
    print(len(request.b64))
    hslp = get_image_primary_ccodec(request.b64, source = 'base64')
    print(hslp)
    chromaticProfile = chromatics_pb2.ChromaticProfile(hslp = hslp)
    return chromaticProfile


def serve():
  server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
  chromatics_pb2_grpc.add_ProfilerServicer_to_server(Profiler(), server)
  server.add_insecure_port('[::]:50051')
  server.start()
  try:
    while True:
      time.sleep(_ONE_DAY_IN_SECONDS)
  except KeyboardInterrupt:
    server.stop(0)


if __name__ == '__main__':
  serve()
