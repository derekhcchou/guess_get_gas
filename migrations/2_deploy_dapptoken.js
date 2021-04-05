const DappToken = artifacts.require('DappToken');

module.exports = async function(deployer, network, accounts){
    await deployer.deploy(DappToken);
    const dappToken = await DappToken.deployed();
    console.log(dappToken.address);
}