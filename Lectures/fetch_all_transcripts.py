import urllib.request
import re
import json
import os
import time

with open('missing_lessons_with_urls.json', 'r') as f:
    lessons = json.load(f)

if not os.path.exists('transcripts'):
    os.makedirs('transcripts')

for i, lesson in enumerate(lessons):
    url = lesson['url']
    file_path = f"transcripts/{i}.txt"
    if os.path.exists(file_path):
        continue
        
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
        
        # Less strict regex to find entry-content
        match = re.search(r'class="entry-content[^>]*>(.*?)<div\s+class="entry-footer', html, re.DOTALL | re.IGNORECASE)
        if not match:
            # Fallback
            match = re.search(r'class="entry-content[^>]*>(.*?)</article>', html, re.DOTALL | re.IGNORECASE)
            
        if match:
            content = match.group(1)
            # Find all <p> tags
            paragraphs = re.findall(r'<p.*?>(.*?)</p>', content, re.DOTALL | re.IGNORECASE)
            text = "\n\n".join(paragraphs)
            text = re.sub(r'<[^>]+>', '', text) # clean inner tags
            
            with open(file_path, 'w') as f:
                f.write(text.strip())
            print(f"[{i+1}/{len(lessons)}] Saved {lesson['lesson']}")
        else:
            print(f"[{i+1}/{len(lessons)}] Could not find content for {url}")
            
    except Exception as e:
        print(f"[{i+1}/{len(lessons)}] Error fetching {url}: {e}")
    time.sleep(1)
