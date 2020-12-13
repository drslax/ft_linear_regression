import pandas as pd
import numpy as np
import os.path
import matplotlib.pyplot as plt

df = pd.read_csv('../Data/data.csv')

def graph(data_set, x, y):
	plt.plot(data_set['km'], data_set['price'], 'o')
	plt.plot(x, y)
	plt.ylabel("Price")
	plt.xlabel("Km")
	plt.title('Value of cars per mileage')
	plt.show()

if (os.path.exists("theta.save")):
	theta = np.loadtxt("theta.save", dtype = np.longdouble, delimiter = ',')
else:
	theta = [0.0,0.0]
try:
	x = np.longdouble(input("What's the mileage of your car: "))
except:
	print ("Error, please fill in a correct number")
	exit()

estimate = theta[0] + theta[1] * x
if (x >= 0 and estimate >= 0):
    print (f'This car worth {int(estimate)} Euro.')
elif x < 0:
    print ("I wasn't meant to do this. ¯\_(ツ)_/¯")
else:
    print (f"You better leave a {int(estimate * -1)} Euro under a seat.")