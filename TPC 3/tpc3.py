import os 
import json
import re

filmes = []

id_original = r'{"_id":{"\$oid":"(\w+)"}'

with open('filmes.json', 'r', encoding='utf-8') as f:
    for line in f.readlines():

        formatted_line = re.sub(id_original, r'{"id":"\1"', line)
        filmes.append(json.loads(formatted_line))

        
format = {'filmes': filmes}
        
with open('filmes2.json', 'w', encoding='utf-8') as f:
    json.dump(format, f, indent=4, ensure_ascii=False)
    





    

    
