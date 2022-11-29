console.log('Deploying...');
require('dotenv').config();

const { ContractCreateFlow } = require('@hashgraph/sdk');
//Import the compiled contract from the HelloHedera.json file
let helloHedera = require("./Auction2/auction2.json");
const Client = require('@hashgraph/sdk').Client;
const FileCreateTransaction = require('@hashgraph/sdk').FileCreateTransaction;
const client = Client.forTestnet();
client.setOperator(process.env.T2, process.env.T2P);
const bytecode = helloHedera.data.bytecode.object;
//Create a file on Hedera and store the hex-encoded bytecode
const contractCreate = new ContractCreateFlow().setGas(100000)
    //Set the bytecode of the contract
    .setBytecode(bytecode);
async function e() {
    //Submit the file to the Hedera test network signing with the transaction fee payer key specified with the client
    const submitTx = await contractCreate.execute(client);

    //Get the receipt of the file create transaction
    const fileReceipt = await submitTx.getReceipt(client);

    //Get the file ID from the receipt
    const bytecodeFileId = fileReceipt.fileId;//Log the file ID
    console.log("The smart contract byte code file ID is " + bytecodeFileId)
}
e();
