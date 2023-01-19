//SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "../Auction2/hts-precompile/HederaTokenService.sol";
import "../Auction2/hts-precompile/TokenCreateContract.sol";

contract MintTransfer is HederaTokenService {
    address public tokenAddress;
    address public payer;
    TokenCreateContract public tokenCreateContract;
    event Create(address);
    event Mint(int, uint64, int64[]);
    event Transfer(int);

    function init() external payable {
        tokenCreateContract = new TokenCreateContract();
        payer = address(this);
        tokenAddress = tokenCreateContract.createFungible(
            "AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1",
            "AAAAC3NzaC1lZDI1NTE5AAAAIOpUhraATD0hPqcdbJ94CCneiJob9piAawt6fPYgRqg1",
            payer,
            11111111
        );
        emit Create(tokenAddress);
        (int code, uint64 codee, int64[] memory met) = mintToken(
            tokenAddress,
            1,
            new bytes[](0)
        );
        emit Mint(code, codee, met);
        int r = transferToken(tokenAddress, address(this), msg.sender, 1);
        emit Transfer(r);
    }
}
