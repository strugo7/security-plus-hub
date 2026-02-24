import json
import sys

with open('missing_lessons.json', 'r') as f:
    lessons = json.load(f)

start = int(sys.argv[1])
end = int(sys.argv[2]) + 1

for i, lesson in enumerate(lessons[start:end], start=start):
    print(f"{i}: {lesson['module']}.{lesson['submodule']} - {lesson['lesson']}")
