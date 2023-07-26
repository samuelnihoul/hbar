import * as fs from "fs";
import { createLibp2p } from 'libp2p'
import { identifyService } from 'libp2p/identify'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { webSockets } from '@libp2p/websockets'
import { tcp } from '@libp2p/tcp'
import { bootstrap } from '@libp2p/bootstrap'
import { MemoryDatastore } from 'datastore-core'
import b from './NFTs.json' assert {type: 'json'}
import { MemoryBlockstore } from 'blockstore-core'
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
} async function createNode() {
  // the blockstore is where we store the blocks that make up files
  const blockstore = new MemoryBlockstore()

  // application-specific data lives in the datastore
  const datastore = new MemoryDatastore()

  // libp2p is the networking layer that underpins Helia
  const libp2p = await createLibp2p({
    datastore,
    addresses: {
      listen: [
        '/ip4/127.0.0.1/tcp/0'
      ]
    },
    transports: [
      tcp()
    ],
    connectionEncryption: [
      noise()
    ],
    streamMuxers: [
      yamux()
    ],
    peerDiscovery: [
      bootstrap({
        list: [
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb',
          '/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt'
        ]
      })
    ],
    services: {
      identify: identifyService()
    }
  })

  return await createHelia({
    datastore,
    blockstore,
    libp2p
  })
}
import { createHelia } from 'helia'
import { json } from '@helia/json'

const helia = await createNode()
const j = json(helia)


async function c() {
  for (let i = 0; i < 40; i++) {
    let d = fs.readdirSync('/home/nuhutuh25/hbar/nodeCLI/src/metadata/')
    let myImmutableAddress = await j.add(fs.readFileSync(`/home/nuhutuh25/hbar/nodeCLI/src/metadata/${d[i]}`))
    b[i]['metadata'] = myImmutableAddress
    console.log(`success @${i}`)
  }
  fs.writeFileSync('/home/nuhutuh25/hbar/nodeCLI/src/NFTs.json', JSON.stringify(b))
  console.log(`do`)

}
async function d() {


}
await c();
