import numpy as np
import matplotlib.pyplot as plt
from filterpy.kalman import KalmanFilter
from filterpy.common import Q_discrete_white_noise

rssi01 = [-70,-67,-69,-67,-68,-68,-68,-69,-68,-67,-68,-69,-68,-67,-68,-69,-68,-67,-69,-68]
rssi02 = [-73,-73,-73,-77,-76,-76,-76,-77,-76,-75,-77,-75,-77,-73,-76,-76,-75,-75,-75,-76,-76,-75,-75,-76,-76,-76]

plt.plot(rssi01)
plt.plot(rssi02)
plt.ylabel('RSSI')
plt.xlabel('Tempo')
plt.show()

