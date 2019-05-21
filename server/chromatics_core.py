""" chromatics_core.py
author: yg <gyang274@gmail.com>

python3.6.6, opencv4.0.0

- inputs:
  img: an image

- output:
  hslp: a set of hsl code and proportion ((h, s, l, p), ...)
"""

import cv2

import base64

import numpy as np

from urllib.request import urlopen

from sklearn.cluster import KMeans

# from matplotlib import pyplot as plt


def get_image_decode(imageHandle):
  """get image read using cv2 imdecode.
  """
  if imageHandle.startswith('http'):
    response = urlopen(imageHandle)
  else:
    response = open(imageHandle, 'rb')
  image = np.asanyarray(bytearray(response.read()), dtype=np.uint8)
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)
  return image


def get_image_b64_decode(imageBase64):
  image = np.asanyarray(bytearray(base64.b64decode(imageBase64)), dtype=np.uint8)
  image = cv2.imdecode(image, cv2.IMREAD_COLOR)
  return image


def get_image_nw_mask(image):
  """get image contour and mask out white background
  """
  maskMin = np.array([  0,   0,   0], dtype=np.uint8)
  maskMax = np.array([250, 250, 250], dtype=np.uint8)

  imageHSV = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
  mask = cv2.inRange(imageHSV, maskMin, maskMax)

  return mask


def get_image_nw_bounding_box(image):
  """get image bounding box via remove whit background
  """

  xx = np.shape(image)[1]
  yy = np.shape(image)[0]
  zz = 0
  ww = 0

  mask = get_image_nw_mask(image)

  _, contours, hierarchy = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

  for cnt in contours:
    x, y, w, h = cv2.boundingRect(cnt)
    xx = min(x, xx)
    yy = min(y, yy)
    zz = max(zz, x + w)
    ww = max(ww, y + h)

  return xx, yy, zz - xx, ww - yy


def get_image_histogram(image, mask, ccodec='hsv'):
  """get histogram w.r.t rgb or hsv
  """
  if ccodec == 'rgb':
    imageX = image
    channels = ('b', 'g', 'r')
  elif ccodec == 'hsv':
    imageX = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    channels = ('h', 's', 'v')
  else:
    raise ValueError('ccodec must be rgb or hsv')

  hist = [
    cv2.calcHist([imageX], [i], mask, [256], [0, 256]) for i, channel in enumerate(channels)
  ]

  return channels, hist


# def plot_image_histogram_rgb(image, mask):
#   # https://docs.opencv.org/3.1.0/d1/db7/tutorial_py_histogram_begins.html
#   channels, hist = get_image_histogram(image, mask, ccodec='rgb')
#   for i, channel in enumerate(channels):
#     plt.plot(hist[i], color=channel)
#     plt.xlim([0, 256])
#   plt.show()
#   return channels, hist
#
#
# def plot_image_histogram_hsv(image, mask, segment):
#
#   channels, hist = get_image_histogram(image, mask, ccodec='hsv')
#
#   # H: Hue Channel
#   plt.title('H: Hue Channel')
#
#   plt.xlim(0, 256)
#   for i in range(0, 255, segment):
#     hsv = [i, 255, 255]
#     rgb = cv2.cvtColor(np.asarray([[hsv]], dtype=np.uint8), cv2.COLOR_HSV2RGB)[0][0]
#     rgb = rgb / 256.0
#     plt.axvspan(i, i + segment, facecolor=rgb, alpha=0.6)
#
#   plt.plot(hist[0], color='w')
#
#   plt.show()
#
#   # S: Saturation Channel
#   plt.title('S: Saturation Channel')
#
#   plt.xlim(0, 256)
#   for i in range(0, 255, segment):
#     hsv = [0, i, 255]
#     rgb = cv2.cvtColor(np.asarray([[hsv]], dtype=np.uint8), cv2.COLOR_HSV2RGB)[0][0]
#     rgb = rgb / 256.0
#     plt.axvspan(i, i + segment, facecolor=rgb, alpha=1.0)
#
#   plt.plot(hist[1], color='w')
#
#   plt.show()
#
#   # V: Value Channel
#   plt.title('V: Value Channel')
#
#   plt.xlim(0, 256)
#   for i in range(0, 255, segment):
#     hsv = [0, 0, i]
#     rgb = cv2.cvtColor(np.asarray([[hsv]], dtype=np.uint8), cv2.COLOR_HSV2RGB)[0][0]
#     rgb = rgb / 256.0
#     plt.axvspan(i, i + segment, facecolor=rgb, alpha=1.0)
#
#   plt.plot(hist[2], color='w')
#
#   plt.show()
#
#   return channels, hist


def get_image_ccodec_num_clusters_from_histogram_hsv(hist):
  """get number of clusters from hsv histogram.
  k = num_h_local_maxima
  if v_local_maxima < 20: +1
  if no v_local_maxima > 20, but s_local_maxima < 20: +1
  """

  histH, histS, histV = hist

  # kH
  histH = histH / sum(histH)
  histHMax = histH.max()
  histHThreshold = [h > histHMax * 0.70 for h in histH]
  kH = 0
  kT = True
  for h in histHThreshold:
    if h and kT:
      kH += 1
      kT = False
    elif not h and not kT:
      kT = True
  # print(f'kH: {kH}')

  # kV
  histV = histV / sum(histV)
  histVMax = histV.max()
  histVThreshold = [h > histVMax * 0.70 for h in histV[:20]]
  kV = int(sum(histVThreshold) > 0)
  # print(f'kV: {kV}')

  # kS
  kS = 0
  if kV == 0:
    histS = histS / sum(histS)
    histSMax = histS.max()
    histSThreshold = [h > histSMax * 0.70 for h in histS[:20]]
    kS = int(sum(histSThreshold) > 0)
  # print(f'kS: {kS}')

  return kH + kV + kS


def get_image_primary_ccodec_with_kmeans(image, n_clusters, color_space=cv2.COLOR_BGR2HSV):

  # check image.shape[0:2] == mask.shape
  mask = get_image_nw_mask(image)

  if color_space is not None:
    image = cv2.cvtColor(image, color_space)

  # make image flatten
  imageFlatten = image.reshape(
    image.shape[0] * image.shape[1], image.shape[2]
  )

  maskFlatten = mask.reshape(
    mask.shape[0] * mask.shape[1]
  )

  imageFlatten = imageFlatten[maskFlatten > 0, :]

  # get kmeans clusters
  clt = KMeans(n_clusters=n_clusters)
  clt.fit(imageFlatten)

  # get histogram by assigning each point to cluster mean
  numLabels = np.arange(0, len(np.unique(clt.labels_)) + 1)
  (hist, _) = np.histogram(clt.labels_, bins=numLabels)

  hist = hist.astype("float")
  hist /= hist.sum()

  # get (h, s, l, p)
  # // chromatics.py use opencv HSV system, which has H: (0, 180), S: (0, 255), V (0, 255)
  # // chromatics.py use opencv HLS system, which has H: (0, 180), L: (0, 255), S (0, 255)
  # // frontend/site in html use HSL system, which has H: (0, 360), S: (0, 100), L: (0 -> 50 -> 100)
  ccodecHSV = np.expand_dims(
    clt.cluster_centers_.astype(dtype=np.uint8), axis=0
  )
  ccodecBGR = cv2.cvtColor(
    ccodecHSV, cv2.COLOR_HSV2BGR
  )
  ccodecHLS = cv2.cvtColor(
    ccodecBGR, cv2.COLOR_BGR2HLS
  )

  hslp = list()
  for hls, p in zip(ccodecHLS[0], hist):
    hslp.append(
      {
        'h': round(hls[0] * 2.0),
        's': round(hls[2] / 255 * 100),
        'l': round(hls[1] / 255 * 100),
        'p': round(p * 100),
      }
    )

  return hslp


def get_image_primary_ccodec(imageSource, source = 'handle'):

  if source == 'handle':
    image = get_image_decode(imageSource)
  elif source == 'base64':
    image = get_image_b64_decode(imageSource)
  else:
    raise ValueError(
      'get_image_primary_ccodec: source must be either handle or base64.'
    )

  mask = get_image_nw_mask(image)

  channels, hist = get_image_histogram(image, mask, ccodec='hsv')

  n_clusters = get_image_ccodec_num_clusters_from_histogram_hsv(hist)

  hslp = get_image_primary_ccodec_with_kmeans(image, n_clusters,color_space=cv2.COLOR_BGR2HSV)

  return hslp


if __name__ == '__main__':

  print(f'Load opencv: {cv2.__version__}')

  imageURLs = [
    # single object
    'https://images.jet.com/md5/f5d15685ed691d3fc9530eff1f16b960.500',
    # multiple objects
    'https://images.jet.com/md5/5ab62b22a85d8a66ee8e2bff68290d9a.500',
    # mixed objects
    'https://images.jet.com/md5/bf726844f6c733a8a216027f62b86573.500',
    'https://images.jet.com/md5/fbe9cbc2c208b072e797f716150b3fb2.500',
    # mixed objects with background
    'https://jetimages.jetcdn.net/md5/f1de8a97f1f575e85bf83ce8760a65ad.500',
    'https://jetimages.jetcdn.net/md5/7c18b2d5bc9b8d100c4e1567f756723a.500',
    'https://jetimages.jetcdn.net/md5/35fbcf8a86eeb51157d342dc44e42fd4.500',
  ]

  imageFnList = [
    './images/..'
  ]

  imageHandle = imageURLs[5]
  # imageHandle = imageFnList[0]

  hslp = get_image_primary_ccodec(imageHandle)

  print(f'Image: {imageHandle} | HSLP: {hslp}')

