import os
import xml.etree.ElementTree as ET 


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
                background-color: purple;
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
            <h1 class="bigFont">Mapa de Ruas</h1>
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
        ruas.append((numero, nome,file[:-3]))


ruas.sort(key=lambda x: int(x[0]))

for rua in ruas:
    html += f"""
        <tr class="row">
            <td>
                <a href="htmls/{rua[2]}html">
                    {rua[0] + "." + rua[1]}</a>
                </a>
            </td>
        </tr>
    """




with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
    
# Recebe um ficheiro xml e muda o formato para html
def get_description(file) : 
    tree = ET.parse("texto/"+file)
    root = tree.getroot()
    for child in root:
        if child.tag == "corpo":
            for corpo in child:
                if corpo.tag == "para":
                    para = ""
                    for text in corpo.itertext():
                        para += text
                    for lugar in corpo:
                        if lugar.tag == "lugar":
                            para = para.replace(lugar.text, f"<b>{lugar.text}</b>")
                    for data in corpo:
                        if data.tag == "data":
                            para = para.replace(data.text, f"<i>{data.text}</i>")
                    for entidade in corpo:
                        if entidade.tag == "entidade":
                            para = para.replace(entidade.text, f"<u>{entidade.text}</u>")
    
    return "<p>" + para + "</p>"
                        
# get photos that are pngs from atual folder
def get_atuais(numero):
    fotos = []
    numero_real = numero + "-"  
    for file in os.listdir("atual"):
        if file.endswith(".JPG"):
            if file.startswith(numero_real):
                fotos.append(file)
    return fotos

lista = []

for file in os.listdir("texto"):
    if file.endswith(".xml"):
        fotos = []
        lista_casas = []
        descricao = get_description(file)
        tree = ET.parse("texto/"+file)
        root = tree.getroot()
        for child in root:
            if child.tag == "meta":
                for meta in child:
                    if meta.tag == "número":
                        numero = meta.text
                        atuais = get_atuais(numero)
                    if meta.tag == "nome":
                        nome = meta.text
            if child.tag == "corpo":
                for corpo in child:
                    if corpo.tag == "figura":
                        for fig in corpo:
                            if fig.tag == "imagem":
                                imagem = fig.attrib["path"]
                            if fig.tag == "legenda":
                                legenda = fig.text
                        fotos.append((imagem, legenda))
                    if corpo.tag == "lista-casas":
                        for casas in corpo:
                            if casas.tag == "casa":
                                for casa in casas:
                                    if casa.tag == "número":
                                        numero_casa = casa.text
                                    if casa.tag == "enfiteuta":
                                        enfiteuta = casa.text
                                    if casa.tag == "foro":
                                        foro = casa.text
                                    if casa.tag == "desc":
                                        para_tf = casa.find("para")
                                        if para_tf is not None:
                                            desc_para = ""
                                            for text in para_tf.itertext():
                                                desc_para += text
                                            for lugar in para_tf:
                                                if lugar.tag == "lugar":
                                                    desc_para = desc_para.replace(lugar.text, f"<b>{lugar.text}</b>")
                                            for data in para_tf:
                                                if data.tag == "data":
                                                    desc_para = desc_para.replace(data.text, f"<i>{data.text}</i>")
                                            for entidade in para_tf:
                                                if entidade.tag == "entidade":
                                                    desc_para = desc_para.replace(entidade.text, f"<b>{entidade.text}</b>")
                                            desc_para = "<p>" + desc_para + "</p>"
                                        lista_casas.append((numero_casa, enfiteuta, foro, desc_para))
        lista.append((file[:-3], numero, nome, descricao, atuais, fotos, lista_casas))

        
#organize the list by number
lista.sort(key=lambda x: int(x[1]))

#create a folder if there is none to save the htmls and start creating the htmls

if not os.path.exists("htmls"):
    os.makedirs("htmls")

for rua in lista:
    f = open('htmls/' + rua[0] + 'html', 'w', encoding='utf-8')
    html = f"""
    <!DOCTYPE html>
    <html>
        <head>
            <title>{rua[2]}</title>
            <meta charset="utf-8">
            <style>
                .container {{
                    background-color: white;
                }}
                .header {{
                    background-color: purple;
                    color: white;
                    padding: 20px;
                    text-align: center;
                }}
                .photos-title {{
                    text-align: center;
                }}
                .photo-container {{
                    display: flex;
                    justify-content: center;
                    margin-bottom: 20px;
                }}
                .photo-card {{
                    width: 50%;
                    padding: 10px;
                }}
                .photo-card img {{
                    width: 100%;
                }}
                .description {{
                    margin-top: 20px;
                }}
                .casas-table {{
                    margin-top: 20px;
                    width: 100%;
                    border-collapse: collapse;
                }}
                .casas-table th, .casas-table td {{
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <header class="header">
                    <h1>{rua[2]}</h1>
                </header>
                
                <div class="photos-title">
                    <h3>Fotos atuais</h3>
                </div>
    """
    
    for atual in rua[4]:
        html += f"""
        <div class="photo-container">
            <div class="photo-card">
                <img src="../atual/{atual}">
            </div>
        </div>     
        """
        
    html += f"""
        <div class="photos-title">
            <h3>Fotos antigas</h3>
        </div>
    """
    
    for foto in rua[5]:
        html += f"""
        <div class="photo-container">
            <div class="photo-card">
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <img src="{foto[0]}" style="margin-bottom: 10px;">
                    <h4 style="text-align: center;">{foto[1]}</h4>  
                </div>
            </div>
        </div>
        """
        
    html += f"""
        <div class="description">
            <h3>Descrição</h3>
            {rua[3]}
        </div>
    
        <div class="description">
            <h3>Casas</h3>
        </div>
    
        <table class="casas-table">
            <tr>
                <th>Número</th>
                <th>Dono</th>
                <th>Preço</th>
                <th>Descrição</th>
            </tr>
    """
    
    for casa in rua[6]:
        html += f"""
        <tr>
            <td>{casa[0]}</td>
            <td>{casa[1]}</td>
            <td>{casa[2]}</td>
            <td>{casa[3]}</td>
        </tr>
        """
        
    html += f"""
        </table>
    </div>
    
    <div class="header" style="background-color: white;">
        <a href="../index.html">Voltar ao índice</a>
    </div>
    
    </body>
    </html>
    """
    
    #change all "None" to "N/A"
    html = html.replace("None", "N/A")
    
    f.write(html)
    f.close()
    