import { } from 'dotenv/config'
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } from '@hashgraph/sdk'
import path from 'path'
const filePath = path.join(process.cwd(), "metadata.csv")
const treasuryId = AccountId.fromString(process.env.T5)
const treasuryKey = PrivateKey.fromString(process.env.T5P)
const supplyKey = PrivateKey.fromString(process.env.T5P)
const operatorId = AccountId.fromString(process.env.T5)
const operatorKey = PrivateKey.fromString(process.env.T5P)
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
import myjson from './NFTs.json' assert {type: 'json'}

async function a() {
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
    const link = myjson[i]['metadata']
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
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
mint()
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

