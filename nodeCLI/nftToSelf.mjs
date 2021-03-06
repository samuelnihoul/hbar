
import { AccountId, PrivateKey, Client, TokenMintTransaction, TokenCreateTransaction,TokenType, TokenSupplyType } from '@hashgraph/sdk'
import 'dotenv/config'

const treasuryId=AccountId.fromString(process.env.NL2||"")
const treasuryKey=PrivateKey.fromString(process.env.NL2P)
const supplyKey=PrivateKey.fromString(process.env.NL2P)
const operatorId=AccountId.fromString(process.env.NL2||"")
const operatorKey=PrivateKey.fromString(process.env.NL2P)
const client=Client.forMainnet().setOperator(operatorId, operatorKey);
	
//Create the NFT
async function mint(){
let nftCreate = await new TokenCreateTransaction()
	.setTokenName("July 2022")
	.setTokenSymbol("KB.2022.7")
  
	.setTokenType(TokenType.NonFungibleUnique)
	.setDecimals(0)
	.setInitialSupply(0)
	.setTreasuryAccountId(treasuryId)
	.setSupplyType(TokenSupplyType.Finite)
	.setMaxSupply(1)
	.setSupplyKey(supplyKey)
	.freezeWith(client)

//Sign the transaction with the treasury key
let nftCreateTxSign = await nftCreate.sign(treasuryKey);

//Submit the transaction to a Hedera network
let nftCreateSubmit = await nftCreateTxSign.execute(client);

//Get the transaction receipt
let nftCreateRx = await nftCreateSubmit.getReceipt(client);

//Get the token ID
let tokenId = await nftCreateRx.tokenId;

//Log the token ID
console.log(`- Created NFT with Token ID: ${tokenId} \n`);
/////////////////////////////////////////////////////////////////////
// Mint new NFT
//IPFS content identifiers for which we will create a NFT
const CID = "QmNjC1zaLnvM7TkQoEZixwM1jL8VY5aS8NM3b6nn5ENfLu";

// Mint new NFT
let mintTx = await new TokenMintTransaction()
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
mint()

export default mint