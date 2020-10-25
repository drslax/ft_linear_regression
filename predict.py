import pandas as pd
import matplotlib.pyplot as plt

m = 0
b = 0
error = -100000
test = input('Enter a mileage: ')
df = pd.read_csv("Data/data.csv")
data_length = df.shape[0]
maxKm = df["km"].max() + (df["km"].max() / 5)
maxPrice = df["price"].max() + (df["price"].max() / 5)
test = int(test) / maxKm
df["km"] = df["km"].apply(lambda x: x / maxKm)
df["price"] = df["price"].apply(lambda x: x / maxPrice)
while (1):
    learning_rate = 0.01
    tmp_m = 0
    tmp_b = 0
    err_diff = error
    for data in df.itertuples(index=True, name='Pandas'):
        x = data.km
        y = data.price
        h = m * x + b
        error = h - y
        tmp_b += learning_rate * error
        tmp_m += learning_rate * error * x
    b -= (1 / data_length) * tmp_b
    m -= (1 / data_length) * tmp_m
    if error - err_diff < 0.000001:
        break
print("This car worth ", int((test * m + b) * maxPrice), "euro")
