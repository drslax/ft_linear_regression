import pandas as pd
import json

df = pd.read_csv("../Data/data.csv")
df.columns = ['x', 'y']
jfile = df.to_json(orient='table', index=False)

with open('data.json', 'w') as json_file:
    json_file.write(jfile)
