import json
import os

def read_json(file):
    with open(file, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    return data

def write_json(data, file, encoding='utf-8'):
    try:
        with open(file, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
    except Exception as e:
        print('Erro:', e)

def get_periodos(data):
    periodos = []
    idP = 1
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
                    "id": "P" + str(idP),
                    "periodo": periodo,
                    "compositores": [{
                        "id": i['id'],
                        "nome": i['nome'],
                    }]
                })
                idP += 1
    return periodos


if os.path.exists('db.json'):
    bd = read_json('db.json')
else:
    bd = read_json('compositores.json')

periodo = get_periodos(bd)

novaDB = ({
    "compositores": bd['compositores'],
    "periodos": periodo
    })

write_json(novaDB, 'db.json')