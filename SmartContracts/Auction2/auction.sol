// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;
import {IHederaTokenService} from "./hedera-smart-contracts/hts-precompile/IHederaTokenService.sol";

interface KarbonMoneta {
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    function transferFrom(
        address,
        address,
        uint256
    ) external;
}

contract EnglishAuction {
    event Start();
    event Bid(address indexed sender, uint256 amount);
    event End(address[] winners, uint256[] amount);

    KarbonMoneta public tokenToBeAttributed;
    uint64 public auctionID;
    address payable public seller;
    uint256 public endAt;
    bool public started;
    bool public ended;

    address[] public highestBidders;
    uint256[] public highestBids;
    mapping(address => uint256) public bids;

    constructor(address _tokenAddress, uint64 _auctionNumber) {
        tokenToBeAttributed = KarbonMoneta(_tokenAddress);
        auctionID = _auctionNumber;

        seller = payable(msg.sender);
        highestBids = [0];
    }

    function start() external {
        require(!started, "started");
        require(msg.sender == seller, "not seller");

        tokenToBeAttributed.transferFrom(msg.sender, address(this), 1);

        started = true;
        endAt = block.timestamp + 7 days;

        emit Start();
    }

    function bid() external payable {
        require(started, "not started");
        require(block.timestamp < endAt, "ended");
        bids[msg.sender] += msg.value;

        emit Bid(msg.sender, msg.value);
    }

    function end() external {
        require(started, "not started");
        require(block.timestamp >= endAt, "not ended");
        require(!ended, "ended");

        ended = true;
        //calculate the total bidded amount
        uint256 totalBiddedAmount = 0;
        for (uint64 i = 0; i < highestBidders.length; i++) {
            totalBiddedAmount += bids[highestBidders[i]];
        }
        if (highestBidders.length != 0) {
            for (uint64 i = 0; i < highestBidders.length; i++) {
                tokenToBeAttributed.safeTransferFrom(
                    address(this),
                    highestBidders[i],
                    1 / totalBiddedAmount
                );
            }
        }

        emit End(highestBidders, highestBids);
    }
}
