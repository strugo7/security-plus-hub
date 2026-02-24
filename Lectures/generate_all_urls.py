import json

base_url = "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/"

with open('missing_lessons.json', 'r') as f:
    missing_lessons = json.load(f)

for lesson in missing_lessons:
    # convert "Hardening Techniques" -> "hardening-techniques-sy0-701"
    slug = lesson['lesson'].lower().replace(' ', '-').replace(',', '').replace('(', '').replace(')', '')
    url = f"{base_url}{slug}-sy0-701/"
    lesson['url'] = url

with open('missing_lessons_with_urls.json', 'w') as f:
    json.dump(missing_lessons, f, indent=2)

print(f"Generated URLs for {len(missing_lessons)} lessons.")
