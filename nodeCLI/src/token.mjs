import 'dotenv/config'
import {
	AccountId,
	PrivateKey,
	Client,
	TokenCreateTransaction,
	TokenType,
	TokenSupplyType,
	
} from '@hashgraph/sdk'
const treasuryId=AccountId.fromString(process.env.NL2)
const treasuryKey=PrivateKey.fromString(process.env.NL2P)
const supplyKey=PrivateKey.fromString(process.env.NL2P)
const client=Client.forMainnet().setOperator(treasuryId,treasuryKey)
export default async function token(){
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