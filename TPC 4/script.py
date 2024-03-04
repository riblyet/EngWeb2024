import json

def read_json(file):
    try:
        with open(file, 'r') as f:
            data = json.load(f)
    except FileNotFoundError:
        print('Erro: ficheiro não encontrado')
    except Exception as e:
        print('Erro:', e)
    
    return data

def write_json(data, file):
    try:
        with open(file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print('Erro:', e)

def get_periodos(data):
    periodos = []
    for i in data['compositores']:
        if 'periodo' in i:
            periodo = i['periodo']
            existing_periodo = next((p for p in periodos if p['periodo'] == periodo), None)
            if existing_periodo:
                existing_periodo['compositores'].append({
                    "id": i['id'],
                    "nome": i['nome']
                })
            else:
                periodos.append({
                    "periodo": periodo,
                    "compositores": [{
                        "id": i['id'],
                        "nome": i['nome'],
                    }]
                })
    return periodos

bd = read_json('compositores.json')
periodo = get_periodos(bd)

novaDB = ({
    "compositores": bd['compositores'],
    "periodos": periodo
    })

write_json(novaDB, 'compositores2.json')