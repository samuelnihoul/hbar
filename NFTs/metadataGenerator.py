with open ('data.json', 'w') as d:
    name=input('name')
    description=input('description')
    image=input('image')
    edition=input('edition')
    d.write('{{"name":"{}","description":"{}","image":"{}","properties": { "edition":"{}"}}}'.format(name,description,image,edition))
d.close()