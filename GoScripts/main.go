package main

import (
	"fmt"
	"github.com/hashgraph/hedera-sdk-go/v2"
)

func main() {
	// generates a new private key
	privateKey, err := hedera.PrivateKeyGenerateEd25519()
	if err != nil {
		fmt.Println(err)
	}
	// prints the generated private key
	fmt.Printf("the private key is %v", privateKey)
}
