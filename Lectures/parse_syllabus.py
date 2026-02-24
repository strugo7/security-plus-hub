import json
import os
import re

syllabus_file = '/Users/ofekstrogo/.gemini/antigravity/brain/1b8b6eca-84ba-4e12-a7cf-f4caa9671bae/.system_generated/steps/579/output.txt'
base_dir = '/Users/ofekstrogo/Library/Mobile Documents/com~apple~CloudDocs/CyberGuard Project/security-plus-hub/Lectures'

with open(syllabus_file, 'r') as f:
    data = json.load(f)

text = data['data']['answer']

# Split text into lines, handling the inline lessons by replacing space-number-dot with newline-number-dot
text = re.sub(r'(?<!^)(?<!\n)\s(\d{1,3})\.\s', r'\n\1. ', text)

lines = text.split('\n')

module_name = ""
submodule_name = ""
lessons = []

for line in lines:
    line = line.strip()
    if not line:
        continue
    if line.startswith('Module '):
        module_name = line.split(': ', 1)[-1].strip() if ':' in line else line
        # Format the module name to match directory structure: "Module 1 – General Security Concepts"
        mod_num = line.split(' ')[1].replace(':', '')
        module_name = f"Module {mod_num} – {module_name}"
    elif re.match(r'^\d\.\d\s', line):
        sub_desc = line.split(' ', 1)[1]
        sub_num = line.split(' ')[0]
        submodule_name = f"Module {sub_num} – {sub_desc}"
    elif re.match(r'^\d{1,3}\.\s', line):
        lesson_name = re.sub(r'^\d{1,3}\.\s', '', line).strip()
        # Remove trailing footnote numbers, e.g. "Security Controls1" -> "Security Controls"
        lesson_name = re.sub(r'\d+$', '', lesson_name).strip()
        lessons.append({
            'module': module_name,
            'submodule': submodule_name,
            'lesson': lesson_name
        })

print(f"Total parsed lessons: {len(lessons)}")

missing_lessons = []
for l in lessons:
    # Some files might have slightly different names, e.g. "Authentication, Authorization, and Accounting" vs AAA
    # We will do a simple check.
    # sanitize lesson name for filename
    safe_name = l['lesson'].replace('/', '-').replace(':', '')
    expected_path = os.path.join(base_dir, l['module'], l['submodule'], f"{safe_name}.md")
    
    # Check if exact file exists
    if not os.path.exists(expected_path):
        # Maybe check if any file in all subdirs loosely matches
        found = False
        for root, dirs, files in os.walk(base_dir):
            for f in files:
                if f.endswith('.md'):
                    name_without_ext = f[:-3]
                    # Simple heuristic: if the first 10 characters match and it's long enough
                    if safe_name.lower()[:15] in name_without_ext.lower() or name_without_ext.lower()[:15] in safe_name.lower():
                        found = True
                        break
            if found: break
            
        if not found:
            missing_lessons.append(l)

print(f"Total missing lessons: {len(missing_lessons)}")
with open('missing_lessons.json', 'w') as f:
    json.dump(missing_lessons, f, indent=2)

for ml in missing_lessons[:5]:
    print(ml)
