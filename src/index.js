import { } from 'dotenv/config'
import * as fs from 'fs'
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } from '@hashgraph/sdk'
import myjson from './NFTs.json' assert {type: 'json'}

const KBID = '0.0.3276256'
const treasuryId = AccountId.fromString(process.env.S)
const treasuryKey = PrivateKey.fromString(process.env.SP)
const supplyKey = PrivateKey.fromString(process.env.SP)
const operatorId = AccountId.fromString(process.env.S)
const operatorKey = PrivateKey.fromString(process.env.SP)
const client = Client.forMainnet().setOperator(operatorId, operatorKey).setMaxAttempts(1000);

await mint()
console.log('a')

async function mint() {

  // let nftCreate = new TokenCreateTransaction()
  //   .setTokenName("Karbon Basar")
  //   .setTokenSymbol("KB")
  //   .setTokenType(TokenType.NonFungibleUnique)
  //   .setDecimals(0)
  //   .setInitialSupply(0)
  //   .setTreasuryAccountId(treasuryId)
  //   .setSupplyKey(supplyKey)
  //   .freezeWith(client)
  // let nftCreateTxSign = await nftCreate.sign(treasuryKey);
  // let nftCreateSubmit = await nftCreateTxSign.execute(client);
  // let nftCreateRx = await nftCreateSubmit.getReceipt(client);
  // let tokenId = nftCreateRx.tokenId;
  // console.log(`- Created NFT with Token ID: ${tokenId} \n`);

  // for (let i = 0; i < 40; i++) {
  //   const link = myjson[i]['metadata']
  //   let mintTx = new TokenMintTransaction()
  //     .setTokenId(tokenId)
  //     .setMetadata([Buffer.from(link)])
  //     .freezeWith(client);
  //   let mintTxSign = await mintTx.sign(supplyKey);
  //   let mintTxSubmit = await mintTxSign.execute(client);
  //   let mintRx = await mintTxSubmit.getReceipt(client);
  //   console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
  // }
  const link = 'https://ipfs.io/ipfs/QmXCP2eaVLPSuQVfnx6SL2zA2fAuiqRYcLNNJTVRm7B3Xr'
  let mintTx = new TokenMintTransaction()
    .setTokenId(KBID)
    .setMetadata([Buffer.from(link)])
    .freezeWith(client);
  let mintTxSign = await mintTx.sign(supplyKey);
  let mintTxSubmit = await mintTxSign.execute(client);
  let mintRx = await mintTxSubmit.getReceipt(client);
  console.log(`- Created NFT ${KBID} with serial: ${mintRx.serials[0].low} \n`);
}

async function metadata() {

  for (let i = 0; i < 40; i++) {
    fs.writeFileSync(`/home/nuhutuh25/hbar/src/metadata/${Math.floor(i / 5) + 1}.${i % 5}.json`, JSON.stringify(
      {
        "name": `${Math.floor(i / 5) + 1}.${i % 5}`,
        "image": `https://ipfs.io/ipfs/QmQZCMyqKQtKV4JE9pMJ1F9TngaG7C6cRkYh5kS9xRZLuD/FullCollection/${Math.floor(i / 5) + 1}.${i % 5}.png`
      }
    ))
  }
}
import { dagCbor } from '@helia/dag-cbor'
async function helia() {

}
import dag from './DAG.json' assert {type: 'json'}
async function dagger() {
  for (let i = 0; i < 40; i++) {
    myjson[i]['name'] = myjson[i]['name'].slice(0, -4)
    myjson[i]['metadata'] = `https://ipfs.io/ipfs/QmTcziDveVGf6NzosGZ17GSSEkbCEHiq3p1LUhfjzHd8Y2/metadata/${Math.floor(i / 5) + 1}.${i % 5}.json`
  }
  fs.writeFileSync('/home/nuhutuh25/hbar/src/NFTs.json', JSON.stringify(myjson))
}




