require('dotenv').config();
const { AccountId } = require('@hashgraph/sdk')
const { PrivateKey } = require('@hashgraph/sdk')
const { Client } = require('@hashgraph/sdk')
const { TokenCreateTransaction } = require('@hashgraph/sdk')
const { TokenType } = require('@hashgraph/sdk')
const { TokenSupplyType } = require('@hashgraph/sdk')

const treasuryId = AccountId.fromString(process.env.T2)
const treasuryKey = PrivateKey.fromString(process.env.T2P)
const supplyKey = PrivateKey.fromString(process.env.T2P)
const client = Client.forTestnet().setOperator(treasuryId, treasuryKey)
async function token() {
	// CREATE FUNGIBLE TOKEN (STABLECOIN)
	let tokenCreateTx = await new TokenCreateTransaction()
		.setTokenName("Karbon Moneta")
		.setTokenSymbol("KM")
		.setTokenType(TokenType.FungibleCommon)
		.setDecimals(2)
		.setInitialSupply(10000000)
		.setTreasuryAccountId(treasuryId)
		.setSupplyType(TokenSupplyType.Infinite)
		.setSupplyKey(supplyKey)
		.freezeWith(client);

	//SIGN WITH TREASURY KEY
	let tokenCreateSign = await tokenCreateTx.sign(treasuryKey);

	//SUBMIT THE TRANSACTION
	let tokenCreateSubmit = await tokenCreateSign.execute(client);

	//GET THE TRANSACTION RECEIPT
	let tokenCreateRx = await tokenCreateSubmit.getReceipt(client);

	//GET THE TOKEN ID
	let tokenId = tokenCreateRx.tokenId;

	//LOG THE TOKEN ID TO THE CONSOLE
	console.log(`- Created token with ID: ${tokenId} \n`);

}
token()