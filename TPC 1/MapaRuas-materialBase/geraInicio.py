import os
import xml.etree.ElementTree as ET 
from xmldt import XmlDt


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
                <a href="htmls/{rua[2]}.html">
                    {rua[1]}
                </a>
            </td>
        </tr>
    """




with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)



class proc (XmlDt):
    def número(s, e): 
        e.tag = "h3" 
        e.c = "Nº " + e.c 
        return e.xml
    def nome(s, e)  :      
        e.tag = "h1" 
        return e.xml
    def corpo(s, e):       
        e.tag = "body"
        return e.xml
    def para(s, e):       
        e.tag = "p"   
        return e.xml
    def lugar(s, e):      
        e.tag = "b"   
        return e.xml
    def lista_casas(s, e): 
        e.tag = "ul" 
        return e.xml 
    def imagem(s, e):     
        e.tag = "img" 
        e['src'] = e['path'] 
        return e.xml
    def legenda(s, e): 
        e.tag = "h4"  
        e.c = "Fig. : "    + e.c 
        return e.xml
    def enfiteuta(s, e):  
        e.tag = "li"  
        e.c = "Inquilino: " + e.c
        return e.xml 
    def foro(s, e):     
        e.tag = "li"  
        e.c = "Pensao: "    + e.c
        return e.xml
    def desc(s, e):      
        e.tag = "li" 
        e.c = "Descrição: " + e.c
        return e.xml

for file in os.listdir("texto"):

    conteudo = proc(filename = f"texto/{file}")   
    novo_nome = file[:-3] + "html"
    with open(f"htmls/{novo_nome}", "w", encoding="utf-8") as f:
        f.write(conteudo)
        