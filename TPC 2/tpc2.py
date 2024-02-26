import os
import json

main_html = """
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
            <h1 class="bigFont">Lista de Cidades</h1>
        </div>
        <br>
        <br>
        <table>
            <tr>
              <th>Nome da Cidade</th>
            </tr>
""" 

# Create a html folder if it does not exist
if not os.path.exists('html'):
    os.makedirs('html')
    
# analyze the mapa-virtual.json and create html files based on the entries
with open('mapa-virtual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    cidades = sorted(data['cidades'], key=lambda x: x['nome'])  # Sort cities by name
    for cidade in cidades:
        main_html += f"""
        <tr>
            <td><a href="{cidade['id']}">{cidade['nome']}</a></td>
        </tr>
        """
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
            
    for ligacoes in data['ligacoes']:
            destino_index = int(ligacoes['destino'][1:])
            if destino_index < len(data['cidades']):
                with open('html/' + ligacoes['origem'] + '.html', 'a', encoding='utf-8') as f:
                    html = f"""
                        <a href="{str(ligacoes['destino'])}">{data['cidades'][destino_index-1]['nome']}< /a>
                        <i>{ligacoes['distância']} km</i>
                        <br>
                        """
                    f.write(html)
                    f.close()
    for cidade in cidades:
        with open('html/' + cidade['id'] + '.html', 'a', encoding='utf-8') as f:
            html = f"""
            </body>
            </html>
            """
            f.write(html)
            f.close()
    main_html += """
        </table>
    </body>
</html>
    """

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(main_html)
    f.close()
