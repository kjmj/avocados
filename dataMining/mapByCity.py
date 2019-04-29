import plotly
import plotly.graph_objs as go
import numpy as np
import pandas as pd
import dataUtilities

# BaltimoreWashington, BuffaloRochester, CincinnatiDayton, DallasFfWorth, HarrisburgScranton, HartfordSpringfield, MiamiFtLauderdale, NewOrleansMobile, PhoenixTucson, Portland, RaleighGreensboro, RichmondNorfolk
avocados = pd.read_csv('avocado-without-regions.csv')
df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_us_cities.csv')

# clean data
avocados[['region']] = avocados[['region']].apply(dataUtilities.removeExcessWhitespace)
df[['name']] = df[['name']].apply(dataUtilities.removeExcessWhitespace)

# Replace name to match the US city dataset
df['name'] = np.where(df['name'] == 'Boise City', 'Boise', df['name'])
df['name'] = np.where(df['name'] == 'Las Vegas', 'LasVegas', df['name'])
df['name'] = np.where(df['name'] == 'Los Angeles', 'LosAngeles', df['name'])
df['name'] = np.where(df['name'] == 'Nashville-Davidson', 'Nashville', df['name'])
df['name'] = np.where(df['name'] == 'New York', 'NewYork', df['name'])
df['name'] = np.where(df['name'] == 'San Diego', 'SanDiego', df['name'])
df['name'] = np.where(df['name'] == 'San Francisco', 'SanFrancisco', df['name'])
df['name'] = np.where(df['name'] == 'St. Louis', 'StLouis', df['name'])

# join data frames, group and calculate avg total bags, then sort
df = pd.merge(avocados, df, how='inner', left_on='region', right_on='name')
df = df.groupby(['region', 'lon', 'lat'])['Total Bags'].mean().reset_index(name='avgTotalBags')
df = df.sort_values(by='avgTotalBags', ascending=False)


df['text'] = df['region'] + '<br> ' + (df['avgTotalBags']).astype(int).astype(str) +' total bags'
limits = [(0,2),(3,10),(11,20),(21,50),(50,3000)]
colors = ["#003300","#009933","#33cc33","#66ff66","lightgrey"]
cities = []
scale = 300

for i in range(len(limits)):
    lim = limits[i]
    df_sub = df[lim[0]:lim[1]]
    city = go.Scattergeo(
        locationmode = 'USA-states',
        lon = df_sub['lon'],
        lat = df_sub['lat'],
        text = df_sub['text'],
        marker = go.scattergeo.Marker(
            size = df_sub['avgTotalBags']/scale,
            color = colors[i],
            line = go.scattergeo.marker.Line(
                width=0.5, color='rgb(40,40,40)'
            ),
            sizemode = 'area'
        ),
        name = '{0} - {1}'.format(lim[0],lim[1]) )
    cities.append(city)

layout = go.Layout(
        title = go.layout.Title(
            text = 'Total Number of Avocado Bags (2015-2018)<br>(Click legend to toggle traces)'
        ),
        showlegend = True,
        geo = go.layout.Geo(
            scope = 'usa',
            projection = go.layout.geo.Projection(
                type='albers usa'
            ),
            showland = True,
            landcolor = 'rgb(217, 217, 217)',
            subunitwidth=1,
            countrywidth=1,
            subunitcolor="rgb(255, 255, 255)",
            countrycolor="rgb(255, 255, 255)"
        )
    )

fig = go.Figure(data=cities, layout=layout)
plotly.offline.plot(fig, filename='generated/map-by-total-bags.html')