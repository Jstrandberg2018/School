import math
import numpy as np

def f(x):
    return x**2 # Funktion som ska roteras

def berakna_volym(funktion, a, b, n):
    """
    Beräknar volymen av rotationskroppen som skapas när funktionen 
    roteras runt x-axeln från a till b med n staplar.
    """
    delta_x = (b - a) / n
    volym = 0
    
    for i in range(n):
        x_i = a + (i + 0.5) * delta_x # Mittpunkt i intervallet
        y_i = funktion(x_i)
        cylinder_volym = math.pi * y_i**2 * delta_x
        volym += cylinder_volym
        
    return volym

# Testa med olika antal staplar
a, b = 0, 1 # Intervall [0,1]
for n in [10, 100, 1000]:
    volym = berakna_volym(f, a, b, n)
    print(f"Volym med {n} staplar: {volym:.6f}")

# Exakt volym för f(x) = x² roterad runt x-axeln från 0 till 1
exakt_volym = math.pi / 5
print(f"Exakt volym: {exakt_volym:.6f}")