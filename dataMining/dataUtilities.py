import numpy as np


# Normalize data from [0, 1]
def normalizeData(data_array):
    return (data_array - np.min(data_array)) / (np.max(data_array) - np.min(data_array))

# Replace any number of spaces with just a single space
def refineSpaces(x):
    return x.replace('\s+', ' ', regex=True)

# Remove leading and trailing white space
def removeExcessWhitespace(x):
    return x.str.strip()

# Convert the string to uppercase
def toUpper(x):
    return x.str.upper()
