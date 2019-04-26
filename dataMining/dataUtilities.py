import pandas as pd
import numpy as np

# Parse and clean the avocado data
def parseData():
    invalidRegions = ['GreatLakes', 'Midsouth', 'Northeast', 'NorthernNewEngland', 'Plains', 'SouthCentral',
                      'Southeast', 'TotalUS', 'West']
    data = pd.read_csv("avocado.csv")
    return data[~data.region.str.contains('|'.join(invalidRegions))]

# Normalize data from [0, 1]
def normalizeData(data_array):
    return (data_array - np.min(data_array)) / (np.max(data_array) - np.min(data_array))

