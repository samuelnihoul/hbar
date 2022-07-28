const ICO = artifacts.require('./ICO.sol');
const KM = artifacts.require('./KM.sol');
const Web3=require('web3');
 function initWeb3() {
  
      
      web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    
    web3 = new Web3(web3Provider);

    return web3;
  }
const web3 = initWeb3();
module.exports = function(deployer, network, accounts) {
    const openingTime = web3.eth.getBlock('latest').timestamp + 2; // two secs in the future
    const closingTime = openingTime + 86400 * 20; // 20 days
    const rate = new web3.BigNumber(1000);
    const wallet = accounts[1];

    return deployer
        .then(() => {
            return deployer.deploy(KM);
        })
        .then(() => {
            return deployer.deploy(
                ICO,
                openingTime,
                closingTime,
                rate,
                wallet,
                KM.address
            );
        });
};