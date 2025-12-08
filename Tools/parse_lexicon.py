import re

with open('lexique_magique.md', 'r', encoding='utf-8') as f:
    content = f.read()

matches = re.findall(r'\|\s*\*\*(.*?)\*\*\s*\|\s*`(.*?)`', content)

print('const INITIAL_LEXIQUE = [')
for fr, rune in matches:
    print(f'    {{ fr: "{fr}", rune: "{rune}" }},')
print('];')
