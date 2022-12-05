// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "./hts-precompile/HederaTokenService.sol";
import "./hts-precompile/IHederaTokenService.sol";

interface Token {
    function transferFrom(address, address, uint256) external;

    function safeTransferFrom(address, address, uint256) external;
}

contract WeeklyAuction {
    event Start(uint64 auctionNumber);
    event Bid(address indexed sender, uint256 amount);
    event End(mapping(address => uint256) bids);
    Token tokenToBeMinted;
    address public seller;
    uint256 public endAt;
    bool public started;
    bool public ended;
    string tokenID;
    address[] biderList;
    address harmonia_eko;
    mapping(address => uint256) public bids;
    uint256 public totalBiddedAmount;
    uint256 public auctionNumber;

    constructor(
        address _tokenToBeAttributed,
        string memory _tokenID,
        address _harmonia_eko
    ) {
        tokenToBeMinted = Token(_tokenToBeAttributed);
        tokenID = _tokenID;
        seller = msg.sender;
        harmonia_eko = _harmonia_eko;
    }

    function start() external {
        require(!started, "started");
        require(msg.sender == seller, "not seller");
        HederaTokenService.mintToken(tokenToBeMinted, 1);
        tokenToBeMinted.transferFrom(tokenToBeMinted, address(this), 1);
        auctionNumber += 1;
        started = true;
        endAt = block.timestamp + 30 seconds;

        emit Start(auctionNumber);
    }

    function bid() external payable {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        bids[msg.sender] += msg.value;
        totalBiddedAmount += msg.value;
        biderList[biderList.length + 1] = msg.sender;
        emit Bid(msg.sender, msg.value);
    }

    function end() external {
        require(started, "not started");
        require(block.timestamp >= endAt, "not ended");
        require(!ended, "ended");
        ended = true;
        if (highestBidders.length != 0) {
            for (uint64 i = 0; i < biderList.length; i++) {
                tokenToBeAttributed.safeTransferFrom(
                    address(this),
                    biderList[i],
                    (0.99 * bids[biderList[i]]) / totalBiddedAmount
                );
            }
            tokenToBeAttributed.safeTransferFrom(address.this, harmonia_eko);
        }
        emit End(bids);
        start();
    }
}
