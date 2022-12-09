//SPDX-Identifier: MIT
pragma solidity : 0.8.17;
import '../Auction2/hts-precompile/HederaTokenService.sol';
import '../Auction2/hts-precompile/TokenCreateContract.sol';

contract MintTransfer{
    public address tokenAddress
    public address payer
constructor  (address _payer){
    payer=_payer;
    HederaTokenService.t
    tokenAddress=TokenCreateContract.createFungible('AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1',11111111 ,"AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1" );
HederaTokenService.mint(tokenAddress,1);
HederaTokenService.transferToken(tokenAddress,this.address,payer,1);
}
}