import math 

from flask import Flask
import pandas as pd 

colorsdb = pd.read_csv("colordb.csv")

app = Flask(__name__)

@app.route("/color/<int:r>/<int:g>/<int:b>")
def calculate_match(r, g, b):
    print(type(r), type(g), type(b))
    target_rgb = (r, g, b)
    color_name = _calculate_match(target_rgb)
    return color_name


def _calculate_match(trgb):
    cdists = []
    for cidx, crow in colorsdb.iterrows():
        dbrgb = (crow.r, crow.g, crow.b)
        cdist = _euclidean_distance(trgb, dbrgb)
        cdists.append(cdist)    
    colorsdb['cdists'] = cdists

    cdb_sorted = colorsdb.sort_values('cdists', ascending=True)
    color_name = cdb_sorted.iloc[0].color_name
    
    return color_name


def _euclidean_distance(dbrgb, trgb):
    dbx, dby, dbz = dbrgb
    tx, ty, tz = trgb

    o0 = (dbx - tx)**2 
    o1 = (dby - ty)**2
    o2 = (dbz - tz)**2

    return math.sqrt(o0 + o1 + o2)
 

