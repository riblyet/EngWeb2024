import os
import json

html = """
<!DOCTYPE html>
<html>
    <head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        
        .header {
            background-color: SlateBlue;
            padding: 10px;
            text-align: center;
        }
        
        .bigFont {
            font-size: 24px;
            margin: 0;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th {
            background-color: lightgrey;
            padding: 10px;
            text-align: left;
        }
        
        td {
            padding: 10px;
            border-bottom: 1px solid lightgrey;
        }
    </style>
    </head>
    <body>
        <div class="header">
            <h1 class="bigFont">Mapa Virtual</h1>
        </div>
        <br>
        <br>
        <table>
            <tr>
                <th>Nome das Cidades</th>
            </tr>
        </table>
        
"""

cidades = []
with open('mapa-virtual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for entry in data:
        if entry == 'cidades' : 
            for cidade in data[entry]:
                cidades.append((cidade['id'], cidade['nome']))
            print(cidades)
            
cidades.sort(key=lambda x: x[1])
                
for cidade in cidades:
    html += f"""
    <tr>
        <td>
            <a href="{cidade[0]}.html">{cidade[1]}</a><br>
        </td>
    </tr>
    """
    
html += """
    </body>
</html>
"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    f.close()


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
    <title>{id}</title>
</head>
                    """
                    
                    f.write(html)
                    f.close()