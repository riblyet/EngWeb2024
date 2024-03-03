import os 
import json
import re

filmes = []
genres = []
actors = []

id_original = r'{"_id":{"\$oid":"(\w+)"}'

with open('filmes.json', 'r', encoding='utf-8') as f:
    for line in f.readlines():

        formatted_line = re.sub(id_original, r'{"id":"\1"', line)
        filmes.append(json.loads(formatted_line))
    
    idG = 1
    for filme in filmes:
        if 'genres' in filme:
            for genre in filme['genres']:
                existing_genre = next((g for g in genres if g['genero'] == genre), None)
                if existing_genre:
                    existing_genre['filmes'].append({
                        "id": filme['id'],
                        "titulo": filme['title']
                    })
                else:
                    genres.append({
                        "id": idG,
                        "genero": genre,
                        "filmes": [{
                            "id": filme['id'],
                            "titulo": filme['title']
                        }]
                    })
                    idG += 1
        
    idA = 1
    for filme in filmes:
        if'cast' in filme:
            for actor in filme['cast']:
                existing_actor = next((a for a in actors if a['actor'] == actor), None)
                if existing_actor:
                    existing_actor['filmes'].append({
                        "id": filme['id'],
                        "titulo": filme['title']
                    })
                else:
                    actors.append({
                        "actor": actor,
                        "id": idA,
                        "filmes": [{
                            "id": filme['id'],
                            "titulo": filme['title']
                        }]
                    })
                    idA += 1

format = {'filmes': filmes, 'generos': genres, 'actors' : actors}
        
with open('filmes2.json', 'w', encoding='utf-8') as f:
    json.dump(format, f, indent=4, ensure_ascii=False)
    
    





