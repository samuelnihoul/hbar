// mint a Token with initial supply 100

import 'dotenv/config'
import {
	AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	
} from '@hashgraph/sdk'
const treasuryId=AccountId.fromString(process.env.TESTNET)
const treasuryKey=PrivateKey.fromString(process.env.TESTNETP)
const supplyKey=PrivateKey.generate()
const client=Client.forTestnet().setOperator(treasuryId,treasuryKey)
export default async function token(){
// CREATE FUNGIBLE TOKEN (STABLECOIN)
let tokenCreateTx = await new TokenCreateTransaction()
	.setTokenName("Karbon Moneta")
	.setTokenSymbol("KM")
	.setTokenType(TokenType.FungibleCommon)
	.setDecimals(10)
	.setInitialSupply(1)
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