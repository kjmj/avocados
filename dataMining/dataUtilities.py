import numpy as np


# Normalize data from [0, 1]
def normalizeData(data_array):
    return (data_array - np.min(data_array)) / (np.max(data_array) - np.min(data_array))

