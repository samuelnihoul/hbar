from bs4 import BeautifulSoup
import requests
site=requests.get('https://bafybeicn2tcyzvy4udcj2hfxwn2juimcqvwo7a2irla7lhyurhqij44mae.ipfs.dweb.link/')
soup=BeautifulSoup(site.,'html.parser')
print(soup.text)

