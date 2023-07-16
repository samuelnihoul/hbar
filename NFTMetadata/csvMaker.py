
with open('a', 'a') as a:
    with open('metadata.csv', 'w') as x:
        with open('metadata.txt') as b:
            l = [i for i in b.readlines() if str(i)[0] == 'Q']
            print(l)
            a.writelines(l)
