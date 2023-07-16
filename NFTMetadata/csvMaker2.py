import pandas as a
b = a.read_csv('metadata.csv')
l = []
c = open('a', 'r').readlines()
for i in range(0, 8):
    for k in range(0, 5):
        l.append(c[i*8+(k+1) % 5])
b['json'] = l
b.to_csv('metadata2.csv')
