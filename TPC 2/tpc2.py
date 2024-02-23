import os
import json

# Create a html folder if it does not exist
if not os.path.exists('html'):
    os.makedirs('html')
    
# analyze the mapa-virtual.json and create html files based on the entries
with open('mapa-virtual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for entry in data:
        if entry == 'cidades' : 
            for cidade in data[entry]:
                with open('html/' + cidade['id'] + '.html', 'w', encoding='utf-8') as f:
                    html = """<!DOCTYPE html>
<html>
<head>
    <title>""" + cidade['nome'] + """</title>
</head>
                        """
                    
                    f.write(html)
                    f.close()