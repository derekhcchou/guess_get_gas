const AddGameInfo = artifacts.require('AddGameInfo')

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(AddGameInfo)
    let addGameInfo = await AddGameInfo.deployed()
}