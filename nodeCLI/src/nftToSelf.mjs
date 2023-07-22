import { } from 'dotenv/config'
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction, TokenType, TokenSupplyType } from '@hashgraph/sdk'
import * as csv from 'csv'
console.log(process.env.T5, process.env.T5P)
const treasuryId = AccountId.fromString(process.env.T5)
const treasuryKey = PrivateKey.fromString(process.env.T5P)
const supplyKey = PrivateKey.fromString(process.env.T5P)
const operatorId = AccountId.fromString(process.env.T5)
const operatorKey = PrivateKey.fromString(process.env.T5P)
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

//Create the NFT
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

	//Sign the transaction with the treasury key
	let nftCreateTxSign = await nftCreate.sign(treasuryKey);

	//Submit the transaction to a Hedera network
	let nftCreateSubmit = await nftCreateTxSign.execute(client);

	//Get the transaction receipt
	let nftCreateRx = await nftCreateSubmit.getReceipt(client);

	//Get the token ID
	let tokenId = nftCreateRx.tokenId;

	//Log the token ID
	console.log(`- Created NFT with Token ID: ${tokenId} \n`);
	/////////////////////////////////////////////////////////////////////
	// Mint new NFT
	df = DataFrame.from_csv('../../NFTMetadata/metadata.csv')
	for (i = 0; i < 40; i++) {

		const CID = df['met'][i];

		// Mint new NFT
		let mintTx = new TokenMintTransaction()
			.setTokenId(tokenId)
			.setMetadata([Buffer.from(CID)])
			.freezeWith(client);

		//Sign the transaction with the supply key
		let mintTxSign = await mintTx.sign(supplyKey);

		//Submit the transaction to a Hedera network
		let mintTxSubmit = await mintTxSign.execute(client);

		//Get the transaction receipt
		let mintRx = await mintTxSubmit.getReceipt(client);

		//Log the serial number
		console.log(`- Created NFT ${tokenId} with serial: ${mintRx.serials[0].low} \n`);
	}
	//IPFS content identifiers for which we will create a NFT
}

export default mint
