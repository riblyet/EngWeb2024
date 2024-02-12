import os
import xml.etree.ElementTree as ET 


html = """
<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="style.css">
        <meta charset="utf-8">
    </head>
    <body>
        <div style="background-color:red">
            <h class="bigFont">Mapa de Ruas</h>
        </div>
        <br>
        <br>
        <table>
            <tr>
              <th>Nome da Rua</th>
            </tr>
""" 


ruas=[]
for file in os.listdir("texto"):
    if file.endswith(".xml"):
        tree = ET.parse("texto/"+file)
        root = tree.getroot()
        for child in root:
            if child.tag == "meta":
                for meta in child:
                    if meta.tag == "número":
                        numero = meta.text
                    if meta.tag == "nome":
                        nome = meta.text
        ruas.append((numero, nome,file[:-4]))


ruas.sort(key=lambda x: int(x[0]))

for rua in ruas:
    html += f"""
        <tr>
            <td>
                <a href="texto/{rua[2]}.html">
                    {rua[1]}
                </a>
            </td>
        </tr>
    """




with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    