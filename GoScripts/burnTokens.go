package main

import (
	"fmt"
	"os"

	"github.com/hashgraph/hedera-sdk-go/v2"
	"github.com/joho/godotenv"
)

func BurnTokens() {
	//Loads the .env file and throws an error if it cannot load the variables from that file correctly
	err := godotenv.Load("../.env")
	if err != nil {
		panic(fmt.Errorf("unable to load environment variables from .env file. error:\n%v", err))
	}

	//Grab your testnet account ID and private key from the .env file
	myAccountId, err := hedera.AccountIDFromString(os.Getenv("NL3"))
	if err != nil {
		panic(err)
	}

	myPrivateKey, err := hedera.PrivateKeyFromString(os.Getenv("NL3P"))
	if err != nil {
		panic(err)
	}

	//Print your testnet account ID and private key to the console to make sure there was no error
	fmt.Printf("The account ID is = %v\n", myAccountId)
	fmt.Printf("The private key is = %v\n", myPrivateKey)
	//Create your testnet client
	client := hedera.ClientForMainnet()
	client.SetOperator(myAccountId, myPrivateKey)
	//Burn 1,000 tokens and freeze the unsigned transaction for manual signing
	transaction, err := hedera.NewTokenBurnTransaction().
		SetTokenID(hedera.TokenID{Shard: 0, Realm: 0, Token: 1113578}).
		SetAmount(99899001).
		FreezeWith(client)

	if err != nil {
		panic(err)
	}

	//Sign with the supply private key of the token, submit the transaction to a Hedera network
	txResponse, err := transaction.Sign(myPrivateKey).Execute(client)

	if err != nil {
		panic(err)
	}

	//Request the receipt of the transaction
	receipt, err := txResponse.GetReceipt(client)

	if err != nil {
		panic(err)
	}

	//Get the transaction consensus status
	status := receipt.Status

	fmt.Printf("The transaction consensus status is %v\n", status)

	//v2.1.0
}
