import * as functions from "firebase-functions";
import { config } from 'dotenv'
import { Client, TokenId, TokenAssociateTransaction } from "@hashgraph/sdk";

config();
//dotenv().config();

console.log('process==>>', process.env);

//Grab your Hedera testnet account ID and private key from your .env file
const myAccountId = process.env.TESTNET;
const myPrivateKey = process.env.TESTNETP;
// If we weren't able to grab it, we should throw a new error
if (myAccountId == null ||
    myPrivateKey == null) {
    
    throw new Error("Environment variables myAccountId and myPrivateKey must be present" );
}
// Create our connection to the Hedera network
// The Hedera JS SDK makes this really easy!
const client = Client.forTestnet();
client.setOperator(myAccountId, myPrivateKey);



// create the hedera ICO transaction

export const ICOTx = functions.https.onRequest(async (request, response) => {
    const body = JSON.parse(request.body)

    // TOKEN ASSOCIATION WITH ALICE's ACCOUNT
    let associateAliceTx = await new TokenAssociateTransaction()
        .setAccountId(body.account)
        .setTokenIds([TokenId.fromString('0.0.47712619')])
        .freezeWith(client)

    //SUBMIT THE TRANSACTION
    let associateAliceTxSubmit = await associateAliceTx.execute(client);

    //GET THE RECEIPT OF THE TRANSACTION
    let associateAliceRx = await associateAliceTxSubmit.getReceipt(client);

    //LOG THE TRANSACTION STATUS
    console.log(`- Token association with Alice's account: ${associateAliceRx.status} \n`);
})

// payer function

export const purchase = functions.https.onRequest((request, response) => {
    const body = JSON.parse(request.body)
}
)
