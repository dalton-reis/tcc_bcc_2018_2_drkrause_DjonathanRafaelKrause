import numpy as np
import random
import matplotlib.pyplot as plt

class MovingAverage(object):
    def __init__(self, window):
        self.window = window
        self.filtered_data = []
        self.data = []

    def step(self, measurement):
        self.filtered_data.append(measurement)
        self.data.append(measurement)
        if len(self.filtered_data) > self.window:
            self.filtered_data.pop(0)

    def current_state(self):
        return sum(self.filtered_data) / len(self.filtered_data)

filter = MovingAverage(50)
for x in range(100):
  filter.step(random.randint(75, 92))

plt.plot(filter.filtered_data)
plt.plot(filter.data)
plt.ylabel('RSSI')
plt.xlabel('Tempo')
plt.show()

