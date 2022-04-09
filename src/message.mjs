import { TopicCreateTransaction ,Client}from '@hashgraph/sdk'
import 'dotenv/config'
async function message() {
    const client = Client.forTestnet()
    const myAccountId = process.env.MY_ACCOUNT_ID;
    const myPrivateKey = process.env.MY_PRIVATE_KEY;
    client.setOperator(myAccountId, myPrivateKey);

    //Create a new topic
    let txResponse = await new TopicCreateTransaction().execute(client);

    //Get the receipt of the transaction
    let receipt = await txResponse.getReceipt(client);

    //Grab the new topic ID from the receipt
    let topicId = receipt.topicId;

    //Log the topic ID
    console.log(`Your topic ID is: ${topicId}`);

    // Wait 5 seconds between consensus topic creation and subscription 
    await new Promise((resolve) => setTimeout(resolve, 5000));
}
export default message