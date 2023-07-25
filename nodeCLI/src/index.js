import * as fs from "fs";
import b from './NFTs.json' assert {type: 'json'}
function a() {
  console.log(b)
  for (let i = 0; i < 40; i++) {
    fs.writeFileSync(
      `/home/nuhutuh25/hbar/nodeCLI/src/metadata/${b[i]['name']}.json`, JSON.stringify(
        {
          name: b[i]['name']
          ,
          image: `https://ipfs.io/ipfs/${b[i]['image']}?filename=${b[i]['name']}`
        }
      )
    )
  }
}
import { createHelia } from 'helia'
import { json } from '@helia/json'



async function c() {
  const helia = await createHelia()
  const j = json(helia)
  for (let i = 0; i < 40; i++) {
    let d = fs.readdirSync('/home/nuhutuh25/hbar/nodeCLI/src/metadata/')
    let myImmutableAddress = await j.add(fs.readFileSync(`/home/nuhutuh25/hbar/nodeCLI/src/metadata/${d[i]}`))
    b[i]['metadata'] = myImmutableAddress["/"]
  }
  fs.writeFileSync('/home/nuhutuh25/hbar/nodeCLI/src/NFTs.json', JSON.stringify(b))

}
c();
