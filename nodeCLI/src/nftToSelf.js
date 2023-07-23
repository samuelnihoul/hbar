import { } from 'dotenv/config'
import { CID } from 'multiformats/cid'
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } from '@hashgraph/sdk'
import dfd from 'danfojs-node'
import path from 'path'
const filePath = path.join(process.cwd(), "metadata.csv")
const treasuryId = AccountId.fromString(process.env.T5)
const treasuryKey = PrivateKey.fromString(process.env.T5P)
const supplyKey = PrivateKey.fromString(process.env.T5P)
const operatorId = AccountId.fromString(process.env.T5)
const operatorKey = PrivateKey.fromString(process.env.T5P)
const client = Client.forTestnet().setOperator(operatorId, operatorKey);
import myjson from './metadata.json' assert {type: 'json'}
async function mint() {
	// let nftCreate = new TokenCreateTransaction()
	// 	.setTokenName("Karbon Basar")
	// 	.setTokenSymbol("KB")
	// 	.setTokenType(TokenType.NonFungibleUnique)
	// 	.setDecimals(0)
	// 	.setInitialSupply(0)
	// 	.setTreasuryAccountId(treasuryId)
	// 	.setSupplyKey(supplyKey)
	// 	.freezeWith(client)
	// let nftCreateTxSign = await nftCreate.sign(treasuryKey);
	// let nftCreateSubmit = await nftCreateTxSign.execute(client);
	// let nftCreateRx = await nftCreateSubmit.getReceipt(client);
	// let tokenId = nftCreateRx.tokenId;
	const tokenId = ('0.0.15562100')
	console.log(`- Created NFT with Token ID: ${tokenId} \n`);
	for (let i = 0; i < 40; i++) {
		const cid = myjson[i]['met'];
		const v0 = CID.parse(cid)
		const v1 = v0.toV1().toString()
		const name = myjson[i]['imagename'].toString() + '.json'
		const link = 'ipfs://' + v1 + '/' + name
		let mintTx = new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(link)])
			// .setMetadata(new ArrayBuffer(CID))
			.freezeWith(client);
		let mintTxSign = await mintTx.sign(supplyKey);
		let mintTxSubmit = await mintTxSign.execute(client);
		let mintRx = await mintTxSubmit.getReceipt(client);
		console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
		console.log(link)
	}
}
export default mint
