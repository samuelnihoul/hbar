// a script to convert HBAR address to EVM address

package main

import (
	"fmt"
	"github.com/hashgraph/hedera-sdk-go/v2"
)

func ToEVMAddress() {
	addess := hedera.AccountID{Realm: 0, Shard: 0, Account: 1113578}
	evmAddress := addess.ToSolidityAddress()
	fmt.Printf("The EVM address is = %v\n", evmAddress)
}
