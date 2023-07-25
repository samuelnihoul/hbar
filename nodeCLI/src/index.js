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
a();
