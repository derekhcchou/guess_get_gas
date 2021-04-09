const GenerateBadge = artifacts.require('GenerateBadge')

module.exports = async (deployer, network, [defaultAccount]) => {
    await deployer.deploy(GenerateBadge)
    console.log(process.env.MNEMONIC)
    let badge = await GenerateBadge.deployed()
}