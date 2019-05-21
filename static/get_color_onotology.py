# get_color_onotology.py
# author: yg <gyang274@github.com>

import json
import requests

from bs4 import BeautifulSoup


REQUEST_URL = 'https://htmlcolorcodes.com/color-names/'

REQUEST_HEADER = {
  'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:52.0) Gecko/20100101 Firefox/52.0'
}


try:
  response = requests.get(REQUEST_URL, headers=REQUEST_HEADER)
except requests.exceptions.RequestException as e:
  print(e)
  exit()

soup = BeautifulSoup(
  response.text, "html.parser"
)

article = soup.find("article")

# co: color ontology
co = [
  {
    "name": "Color",
    "hex": "#000000",
    "rgb": "rgb(0, 0, 0)",
    "children": []
  }
]

for section in article.findAll("section"):
  co_section = dict()
  section_name = section.get('id').capitalize()
  print('section:', section_name)
  co_section["name"] = section_name
  co_section["hex"] = ""
  co_section["rgb"] = ""
  co_section["children"] = []
  for row in section.findAll('tr', class_='color'):
    name = row.find("td", class_='color-name').h4.getText()
    print('color:', name)
    chex = row.find("td", class_='color-hex').h4.getText()
    crgb = row.find("td", class_='color-rgb').h4.getText()
    if name == section_name:
      co_section["hex"] = chex
      co_section["rgb"] = crgb
    co_section["children"].append(
      {
        "name": name,
        "hex": chex,
        "rgb": crgb
      }
    )
  co[0]["children"].append(
    co_section
  )
  
with open('ontology.json', 'w') as fp:
  json.dump(co, fp, indent=2)




