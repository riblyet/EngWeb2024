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
                    html = f"""<!DOCTYPE html>
                    <html>
                    <head>
                        <title>{cidade['nome']}</title>
                    </head>

                    <body>

                        <h1>{cidade['nome']}</h1>
                        <p>ID: {cidade['id']}</p>
                        <p>Descrição: {cidade['descrição']}</p>
                        <p>População: {cidade['população']}</p>
                        
                        <h2>Ligações</h2>
                        
                        
                        """
                    
                    f.write(html)
                    f.close()
                    
        if entry == "ligacoes":
            for ligacoes in data[entry]:
                destino_index = int(ligacoes['destino'][1:])
                if destino_index < len(data['cidades']):
                    with open('html/' + ligacoes['origem'] + '.html', 'a', encoding='utf-8') as f:
                        html = f"""
                            <a href="{str(ligacoes['destino'])}.html">{data['cidades'][destino_index]['nome']}</a>
                            <i>{ligacoes['distância']} km</i>
                            <br>
                            """
                        f.write(html)
                        f.close()
        for cidade in data['cidades']:
            with open('html/' + cidade['id'] + '.html', 'a', encoding='utf-8') as f:
                html = f"""
                </body>
                </html>
                """
                f.write(html)
                f.close()
                    
                    
                    
