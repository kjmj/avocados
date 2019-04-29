import plotly
import plotly.graph_objs as go
import pandas as pd

df = pd.read_csv('avocado-with-regions.csv')
df = df[~df['region'].str.contains("TotalUS")] # drop total us
df = pd.DataFrame(df, columns=['region', 'Small Bags', 'Large Bags', 'XLarge Bags'])
df = df.groupby(['region']).mean().reset_index()
print(df.head)
data = [
    go.Bar(
        x=df['region'],
        y=df['Small Bags'],
        name='Small Bags',
        marker=dict(color='#006600')
    ),
    go.Bar(
        x=df['region'],
        y=df['Large Bags'],
        name='Large Bags',
        marker=dict(color='#339933')
    ),
    go.Bar(
        x=df['region'],
        y=df['XLarge Bags'],
        name='Extra Large Bags',
        marker=dict(color='#00cc00')
    )
]

layout = go.Layout(
    barmode='stack',
    title='Avocado Bag Size By Region'
)

fig = go.Figure(data=data, layout=layout)

plotly.offline.plot(fig, filename='generated/stacked-bar.html')

