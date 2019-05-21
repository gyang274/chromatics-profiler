import grpc

import chromatics_pb2
import chromatics_pb2_grpc

import base64
from urllib.request import urlopen

from google.protobuf.json_format import MessageToJson


def run():

  channel = grpc.insecure_channel('127.0.0.1:50051')

  stub = chromatics_pb2_grpc.ProfilerStub(channel=channel)

  imageURL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Thonet_chair_no.18.jpg/180px-Thonet_chair_no.18.jpg'

  imageBase64 = base64.b64encode(
    urlopen(
      imageURL
    ).read()
  )

  # print(f'chormatics|send to server: { imageBase64 }')

  response = stub.GetChromaticProfile(chromatics_pb2.Image(b64=imageBase64))

  print(f'chormatics|receive from server: { MessageToJson(response) }')


if __name__ == '__main__':
  run()

