import { Client, AccountId, ContractId, ContractFunctionParameters, ContractExecuteTransaction } from "@hashgraph/sdk";
// Create NFT from precompile
const createToken = new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(300000) // Increase if revert
    .setPayableAmount(20) // Increase if revert
    .setFunction("createNft",
        new ContractFunctionParameters()
            .addString("Fall Collection") // NFT name
            .addString("LEAF") // NFT symbol
            .addString("Just a memo") // NFT memo
            .addInt64(250) // NFT max supply
            .addUint32(7000000) // Expiration: Needs to be between 6999999 and 8000001
    );
const createTokenTx = await createToken.execute(client);
const createTokenRx = await createTokenTx.getRecord(client);
const tokenIdSolidityAddr = createTokenRx.contractFunctionResult.getAddress(0);
const tokenId = AccountId.fromSolidityAddress(tokenIdSolidityAddr);

console.log(`Token created with ID: ${tokenId} \n`);