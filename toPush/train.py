import pandas as pd
import matplotlib.pyplot as plt
import sys

###################################
########### import Data ###########
###################################

data_frame = pd.read_csv("../Data/data.csv")
df = data_frame.copy()

###################################
######### init  Variables #########
###################################

m = 0
b = 0
error = -100000
data_length = df.shape[0]

###################################
#### limit MaxPrice-MaxKm to 1 ####
###################################

maxKm = df["km"].max() + (df["km"].max() / 5)
maxPrice = df["price"].max() + (df["price"].max() / 5)
df["km"] = df["km"].apply(lambda x: x / maxKm)
df["price"] = df["price"].apply(lambda x: x / maxPrice)

###################################
# Gradient Descent implementation #
###################################

# b : Theta0 | m : Theta1

while (1):
    learning_rate = 0.01
    tmp_m = 0
    tmp_b = 0
    err_diff = error
    for data in df.itertuples():
        x = data.km
        y = data.price
        h = m * x + b
        error = h - y
        tmp_b += error
        tmp_m += error * x
    b -= learning_rate * (1 / data_length) * tmp_b
    m -= learning_rate * (1 / data_length) * tmp_m
    if error - err_diff < 0.00000069:
        break

m *= maxPrice / maxKm
b *= maxPrice

###################################
####### Save m&b in a file ########
###################################

with open('theta.save', 'w') as theta:
    theta.write(f'{b},{m}')

###################################
########## Visualization ##########
###################################

if (len(sys.argv) == 2 and sys.argv[1] == '-v'):
    ax = data_frame.plot.scatter(x='km', y='price', c='DarkBlue')
    x_plot = data_frame['km']
    y_plot = x_plot * m + b
    plt.grid()
    plt.plot(x_plot, y_plot, '-r')
    plt.show()
