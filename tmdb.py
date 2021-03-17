import pandas as pd
import requests
import os

csv_filepath = os.path.join(os.path.dirname(__file__), 'movie_data.csv')
data = pd.read_csv("movie_service.csv")
movies = []
for id in data.tmdbID.unique():
    response = requests.get("https://api.themoviedb.org/3/movie/{0}?api_key=354ccc92dc2bcd9f6309c9902aaeb0f4".format(id))
    json_data = response.json()
    genres = []
    for genre in json_data['genres']:
        genres.append(genre['name'])
    genres = ",".join(genres)
    
    countries = []
    for country in json_data['production_countries']:
        countries.append(country['name'])
    countries = ",".join(countries)
    
    original_language = json_data['original_language']
    title = json_data['title']
    release_date = json_data['release_date']
    runtime = json_data['runtime']
    poster_path = json_data['poster_path']
    overview = json_data['overview']
    homepage = json_data['homepage']
    
    
    print(id, title, release_date, countries, original_language, runtime, poster_path, overview, homepage)
    movies.append([id, title, release_date, countries, original_language, runtime, poster_path, overview, homepage])
columns = ["tmdbID", "title", "release_date", "countries,", "original_language", "runtime", "poster_path", "overview", "homepage"]
df = pd.DataFrame(movies, columns=columns)
df.to_csv(csv_filepath, index = False)