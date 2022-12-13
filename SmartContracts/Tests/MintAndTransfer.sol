//SPDX-Identifier: MIT
pragma solidity 0.8.17;
import '../Auction2/hts-precompile/HederaTokenService.sol';
import '../Auction2/hts-precompile/TokenCreateContract.sol';

contract MintTransfer is HederaTokenService{
    address public  tokenAddress;
    address public  payer;
    TokenCreateContract public tokenCreateContract;
    HederaTokenService public hederaTokenService;
function inti (address _payer)external payable{
    tokenCreateContract= new TokenCreateContract();
    payer=_payer;
    tokenAddress=tokenCreateContract.createFungible('AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1',"AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1" ,msg.sender,11111111);
mintToken(tokenAddress,1,new bytes[](0));
transferToken(tokenAddress,address(this),payer,1);
}
}