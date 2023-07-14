import pandas as pd
df = pd.read_csv('metadata.csv')
for i in range(0, 8):
    for j in range(0, 5):
        with open(f'metadata/{i}.{j}.json', 'w') as f:
            id = i*5+j
            name = df['imagename'][id]
            cid = df['cid'][id]
            f.write(
                f"{{ \"name\":\"{i}.{j}\".\"image\":\"https://ipfs.io/ipfs/{cid}\"}}")
