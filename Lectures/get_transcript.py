import urllib.request
import re
from bs4 import BeautifulSoup
import sys

url = "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/threat-actors-sy0-701/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    soup = BeautifulSoup(html, 'html.parser')
    
    # The transcript is usually under a specific div or heading
    # Let's just find the text after "Transcript:" or extract all text inside the main content
    content = soup.find('div', class_='entry-content')
    if content:
        texts = content.find_all('p')
        transcript = "\n\n".join([p.get_text() for p in texts])
        with open('sample_transcript.txt', 'w') as f:
            f.write(transcript)
        print("Transcript saved successfully.")
    else:
        print("entry-content not found.")

except Exception as e:
    print(f"Error: {e}")
