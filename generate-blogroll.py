# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "dotenv",
#     "requests",
# ]
# ///

import requests
import json
from dotenv import load_dotenv
import os
load_dotenv()

base_url = "https://api.raindrop.io/rest/v1/raindrops/"
collection_id = os.getenv("RAINDROP_MAKERS_ID")
token = os.getenv("RAINDROP_TEST_TOKEN")
url = base_url + collection_id
blogroll_path = "./src/content/garden/blogroll.md"

headers = {'Authorization': f'Bearer {token}'}
response = requests.get(url, headers=headers)
data = json.loads(response.text)
names = [(a['title'], a['link'], a['note']) for a in data['items'] if a['tags'] == ['website']]

frontmatter = '''---
title: Essential People
author: Adithya Nair
category: fiction
type: note
---\n
'''

out = ""
out += frontmatter
for count, item in enumerate(names):
    if item[2] == '':
        out += f"{count+1}. [{item[0]}]({item[1]})\n\n"
    else:
        out += f"{count+1}. [{item[0]}]({item[1]}) - {item[2]}\n\n"

with open(blogroll_path, 'w', encoding='utf_8') as f:
    f.write(out)
