const GenerateBadge = artifacts.require('GenerateBadge')

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(GenerateBadge)
    let badge = await GenerateBadge.deployed()
}