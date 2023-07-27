import { } from 'dotenv/config'
import * as fs from 'fs'
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } from '@hashgraph/sdk'
const treasuryId = AccountId.fromString(process.env.T5)
const treasuryKey = PrivateKey.fromString(process.env.T5P)
const supplyKey = PrivateKey.fromString(process.env.T5P)
const operatorId = AccountId.fromString(process.env.T5)
const operatorKey = PrivateKey.fromString(process.env.T5P)
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
import myjson from './NFTs.json' assert {type: 'json'}

async function mint() {
  let nftCreate = new TokenCreateTransaction()
    .setTokenName("Karbon Basar")
    .setTokenSymbol("KB")
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(treasuryId)
    .setSupplyKey(supplyKey)
    .freezeWith(client)
  let nftCreateTxSign = await nftCreate.sign(treasuryKey);
  let nftCreateSubmit = await nftCreateTxSign.execute(client);
  let nftCreateRx = await nftCreateSubmit.getReceipt(client);
  let tokenId = nftCreateRx.tokenId;
  console.log(`- Created NFT with Token ID: ${tokenId} \n`);
  for (let i = 0; i < 40; i++) {
    const link = `https://firebasestorage.googleapis.com/v0/b/hypnotic-trees-328016.appspot.com/o/Metadata%2F${Math.floor((i / 5) + 1)}.${i % 5}.json?alt=media&token=ecf56d52-6685-4fc2-b9b3-a9ee3cffef38`
    let mintTx = new TokenMintTransaction()
      .setTokenId(tokenId)
      .setMetadata([Buffer.from(link)])
      // .setMetadata(new ArrayBuffer(CID))
      .freezeWith(client);
    let mintTxSign = await mintTx.sign(supplyKey);
    let mintTxSubmit = await mintTxSign.execute(client);
    let mintRx = await mintTxSubmit.getReceipt(client);
    console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
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
async function metadata() {
  for (let i = 0; i < 40; i++) {
    fs.writeFileSync(`/home/nuhutuh25/hbar/nodeCLI/src/metadata/${Math.floor(i / 5) + 1}.${i % 5}.json`, JSON.stringify(
      {
        "name": `${Math.floor(i / 5) + 1}.${i % 5}`,
        "image": `https://firebasestorage.googleapis.com/v0/b/hypnotic-trees-328016.appspot.com/o/FullCollection%2F${Math.floor((i / 5)) + 1}.${i % 5}.png?alt=media&token=ecf56d52-6685-4fc2-b9b3-a9ee3cffef3`
      }
    ))
  }
}
mint()
console.log('hone')

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
