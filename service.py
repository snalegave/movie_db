import http.client
import json
import csv
import time

conn = http.client.HTTPSConnection("streaming-availability.p.rapidapi.com")

for i in range(1, 2):
    print(i)
    headers = {
        'x-rapidapi-key': "afa7abe2d0msh8153d4fb7333358p1cf552jsnbdac977b18ae",
        'x-rapidapi-host': "streaming-availability.p.rapidapi.com"
        }
    
    conn.request("GET", "/search/pro?country=us&service=netflix&type=movie&order_by=original_title&page={0}&desc=true".format(i), headers=headers)
    
    

    res = conn.getresponse()
    data = json.loads(res.read())['results']
    
    with open('movie_service.csv', 'a', newline='') as f:
        writer = csv.writer(f)
        for movie in data:
            writer.writerow([movie['tmdbID'], 'netflix'])
    
