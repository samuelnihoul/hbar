console.log('Deploying...');
require('dotenv').config();

//Import the compiled contract from the HelloHedera.json file
let helloHedera = require("./Auction2/artifacts/EnglishAuction.json");
const Client = require('@hashgraph/sdk').Client;
const FileCreateTransaction = require('@hashgraph/sdk').FileCreateTransaction;
const client = Client.forTestnet();

client.setOperator(process.env.T2, process.env.T2P);
const bytecode = helloHedera.data.bytecode.object;

//Create a file on Hedera and store the hex-encoded bytecode
const fileCreateTx = new FileCreateTransaction()
    //Set the bytecode of the contract
    .setContents(bytecode);
async function e() {
    //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await fileCreateTx.execute(client);

    //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);

    //Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;//Log the file ID
    console.log("The smart contract byte code file ID is " + bytecodeFileId)
}
e();
