import urllib.request
import re

url = "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
    
    # regex to find href links
    links = re.findall(r'href=[\'"]([^\'"]*\/sy0-701\/sy0-701-video\/[^\'"]+)[\'"]', html)
    unique_links = []
    for l in links:
        if l not in unique_links:
            unique_links.append(l)
            
    with open('pm_links.txt', 'w') as f:
        for l in unique_links:
            f.write(l + '\n')
    print(f"Found {len(unique_links)} links. Saved to pm_links.txt")
except Exception as e:
    print(f"Error: {e}")
